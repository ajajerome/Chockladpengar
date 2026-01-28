'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { FirebaseService } from '@/services/firebase.service';
import { playSuccessSound } from '@/utils/sounds';
import type { Task, TaskFrequency } from '@/types';

export function useTasks() {
  const { mode, currentUser, family, tasks } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const myTasks = useMemo(() => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'child') {
      return tasks.filter(t => t.assignedTo === currentUser.id);
    }
    
    return tasks.filter(t => t.createdBy === currentUser.id);
  }, [tasks, currentUser]);
  
  const pendingTasks = useMemo(() => {
    return myTasks.filter(t => t.status === 'pending');
  }, [myTasks]);
  
  const reviewTasks = useMemo(() => {
    return tasks.filter(t => t.status === 'in_review');
  }, [tasks]);
  
  const createTask = async (
    title: string,
    description: string,
    reward: number,
    assignedTo: string,
    frequency: TaskFrequency = 'once'
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!currentUser || !family) {
        throw new Error('User or family not found');
      }
      
      if (mode === 'firebase') {
        const task = await FirebaseService.createTask({
          title,
          description,
          reward,
          assignedTo,
          frequency,
          createdBy: currentUser.id,
          familyId: family.id,
        });
        
        return task;
      } else {
        // Local mode
        const task: Task = {
          id: `task_${Date.now()}`,
          title,
          description,
          reward,
          assignedTo,
          frequency,
          createdBy: currentUser.id,
          familyId: family.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        
        useStore.getState().addTask(task);
        return task;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const submitForReview = async (taskId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await useStore.getState().submitTaskForReview(taskId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const approveTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await useStore.getState().approveTask(taskId);
      // Play cash register sound when task is approved
      playSuccessSound();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to approve task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const rejectTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await useStore.getState().rejectTask(taskId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reject task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'firebase') {
        await FirebaseService.deleteTask(taskId);
      } else {
        useStore.getState().deleteTask(taskId);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    tasks: myTasks,
    pendingTasks,
    reviewTasks,
    allTasks: tasks,
    isLoading,
    error,
    createTask,
    submitForReview,
    approveTask,
    rejectTask,
    deleteTask,
  };
}

