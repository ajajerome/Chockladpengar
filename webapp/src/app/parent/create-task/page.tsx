'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ChildIcon, ChocolateCoinIcon, ClockIcon } from '@/components/icons';
import type { Child, TaskFrequency } from '@/types';

export default function CreateTaskPage() {
  const router = useRouter();
  const { familyMembers, family } = useStore();
  const { createTask, isLoading, error } = useTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState<number>(10);
  const [assignedTo, setAssignedTo] = useState('');
  const [frequency, setFrequency] = useState<TaskFrequency>('once');
  
  const children = familyMembers.filter(m => m.role === 'child') as Child[];
  const chokladpengValue = family?.settings?.chokladpengValue || 1;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignedTo) {
      alert('Välj ett barn att tilldela uppgiften till');
      return;
    }
    
    try {
      await createTask(title, description, reward, assignedTo, frequency);
      router.push('/parent');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };
  
  if (children.length === 0) {
    return (
      <div className="min-h-screen p-4" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-md mx-auto pt-12">
          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FFB4A2 0%, #FF9999 100%)' }}>
              <ChildIcon size={48} />
            </div>
            <h2 className="text-xl font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Inga barn</h2>
            <p className="mb-4" style={{ color: '#A67C52' }}>Du måste lägga till barn innan du kan skapa uppgifter</p>
            <Button onClick={() => router.push('/add-child')} variant="primary" fullWidth>
              Lägg till barn
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 font-medium"
            style={{ color: '#A67C52' }}
          >
            ← Tillbaka
          </button>
          <h1 className="text-3xl font-extrabold" style={{ color: '#8B5A3C' }}>Skapa uppgift</h1>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Uppgiftens namn
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Diska"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Beskrivning (valfritt)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv vad som ska göras..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all resize-none"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
            </div>
            
            <div>
              <label htmlFor="reward" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Belöning (chokladpengar)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3">
                  <ChocolateCoinIcon size={24} />
                </div>
                <input
                  type="number"
                  id="reward"
                  value={reward}
                  onChange={(e) => setReward(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all pl-14"
                  style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
                />
              </div>
              <p className="text-xs font-medium mt-1" style={{ color: '#FFD700' }}>
                ≈ {(reward * chokladpengValue).toFixed(2)} kr
              </p>
            </div>
            
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Tilldela till
              </label>
              <select
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              >
                <option value="">Välj barn...</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
                Frekvens
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className="p-3 rounded-2xl border-2 transition-all"
                  style={{
                    borderColor: frequency === 'once' ? '#FFD700' : 'rgba(139, 90, 60, 0.2)',
                    backgroundColor: frequency === 'once' ? '#FFF8F0' : '#FFFFFF',
                  }}
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon size={24} color={frequency === 'once' ? '#FFD700' : '#8B6F47'} />
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#8B5A3C' }}>En gång</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className="p-3 rounded-2xl border-2 transition-all"
                  style={{
                    borderColor: frequency === 'daily' ? '#FFD700' : 'rgba(139, 90, 60, 0.2)',
                    backgroundColor: frequency === 'daily' ? '#FFF8F0' : '#FFFFFF',
                  }}
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon size={24} color={frequency === 'daily' ? '#FFD700' : '#8B6F47'} />
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#8B5A3C' }}>Dagligen</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className="p-3 rounded-2xl border-2 transition-all"
                  style={{
                    borderColor: frequency === 'weekly' ? '#FFD700' : 'rgba(139, 90, 60, 0.2)',
                    backgroundColor: frequency === 'weekly' ? '#FFF8F0' : '#FFFFFF',
                  }}
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon size={24} color={frequency === 'weekly' ? '#FFD700' : '#8B6F47'} />
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#8B5A3C' }}>Veckovis</div>
                </button>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Skapa uppgift
              </Button>
              
              <Button onClick={() => router.back()} variant="ghost" size="md" fullWidth disabled={isLoading}>
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
