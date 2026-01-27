'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { FirebaseService } from '@/services/firebase.service';
import type { User, Family, Child, Parent } from '@/types';

export function useAuth() {
  const { mode, currentUser, family } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateFamilyCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  
  const createFamily = async (familyName: string, parentName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const code = generateFamilyCode();
      
      if (mode === 'firebase') {
        // Create family in Firebase
        const newFamily = await FirebaseService.createFamily({
          name: familyName,
          code,
          ownerId: '', // Will be updated after parent creation
        });
        
        // Create parent
        const parent = await FirebaseService.createParent({
          name: parentName,
          familyId: newFamily.id,
        });
        
        // Update family with owner
        await FirebaseService.updateFamily(newFamily.id, { ownerId: parent.id });
        
        // Set in store
        useStore.getState().setFamily({ ...newFamily, ownerId: parent.id });
        useStore.getState().login(parent);
        
        return { family: newFamily, user: parent };
      } else {
        // Local mode
        const newFamily: Family = {
          id: `family_${Date.now()}`,
          name: familyName,
          code,
          ownerId: '',
          createdAt: new Date().toISOString(),
        };
        
        const parent: Parent = {
          id: `user_${Date.now()}`,
          name: parentName,
          role: 'parent',
          familyId: newFamily.id,
          children: [],
          createdAt: new Date().toISOString(),
        };
        
        newFamily.ownerId = parent.id;
        
        useStore.getState().setFamily(newFamily);
        useStore.getState().login(parent);
        useStore.getState().setFamilyMembers([parent]);
        
        return { family: newFamily, user: parent };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create family';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const joinFamily = async (code: string, userName: string, role: 'parent' | 'child') => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'firebase') {
        // Find family by code
        const foundFamily = await FirebaseService.getFamilyByCode(code);
        
        if (!foundFamily) {
          throw new Error('Familj hittades inte. Kontrollera koden.');
        }
        
        let user: User;
        
        if (role === 'parent') {
          user = await FirebaseService.createParent({
            name: userName,
            familyId: foundFamily.id,
          });
        } else {
          // For child, we need to know the parent
          // In a real app, you might select from existing parents
          // For now, we'll use the family owner
          user = await FirebaseService.createChild({
            name: userName,
            familyId: foundFamily.id,
            parentId: foundFamily.ownerId,
          });
        }
        
        useStore.getState().setFamily(foundFamily);
        useStore.getState().login(user);
        
        return { family: foundFamily, user };
      } else {
        throw new Error('Local mode does not support joining existing families');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join family';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addChild = async (childName: string, parentId?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!family) {
        throw new Error('No family found');
      }
      
      const actualParentId = parentId || currentUser?.id;
      
      if (!actualParentId) {
        throw new Error('Parent ID required');
      }
      
      if (mode === 'firebase') {
        const child = await FirebaseService.createChild({
          name: childName,
          familyId: family.id,
          parentId: actualParentId,
        });
        
        return child;
      } else {
        // Local mode
        const child: Child = {
          id: `child_${Date.now()}`,
          name: childName,
          role: 'child',
          familyId: family.id,
          parentId: actualParentId,
          balance: 0,
          createdAt: new Date().toISOString(),
        };
        
        const members = [...useStore.getState().familyMembers, child];
        useStore.getState().setFamilyMembers(members);
        
        // Update parent's children array
        const parent = members.find(m => m.id === actualParentId) as Parent;
        if (parent) {
          const updatedParent: Parent = {
            ...parent,
            children: [...(parent.children || []), child.id],
          };
          
          const updatedMembers = members.map(m =>
            m.id === actualParentId ? updatedParent : m
          );
          
          useStore.getState().setFamilyMembers(updatedMembers);
        }
        
        return child;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add child';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    useStore.getState().logout();
  };
  
  return {
    currentUser,
    family,
    isLoading,
    error,
    createFamily,
    joinFamily,
    addChild,
    logout,
  };
}

