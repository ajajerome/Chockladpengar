'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { Child, TaskFrequency } from '@/types';

export default function CreateTaskPage() {
  const router = useRouter();
  const { familyMembers } = useStore();
  const { createTask, isLoading, error } = useTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState<number>(10);
  const [assignedTo, setAssignedTo] = useState('');
  const [frequency, setFrequency] = useState<TaskFrequency>('once');
  
  const children = familyMembers.filter(m => m.role === 'child') as Child[];
  
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
        <div className="max-w-md mx-auto pt-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-6xl mb-4">👧👦</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Inga barn</h2>
            <p className="text-gray-600 mb-4">Du måste lägga till barn innan du kan skapa uppgifter</p>
            <Button onClick={() => router.push('/add-child')} variant="primary" fullWidth>
              Lägg till barn
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Tillbaka
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Skapa uppgift</h1>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Uppgiftens namn
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="t.ex. Diska"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Beskrivning (valfritt)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv vad som ska göras..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="reward" className="block text-sm font-medium text-gray-700 mb-1">
                Belöning (chokladpengar)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-2xl">🍫</span>
                <input
                  type="number"
                  id="reward"
                  value={reward}
                  onChange={(e) => setReward(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                Tilldela till
              </label>
              <select
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frekvens
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    frequency === 'once'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">1️⃣</div>
                  <div className="text-xs font-medium">En gång</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    frequency === 'daily'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">📅</div>
                  <div className="text-xs font-medium">Dagligen</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    frequency === 'weekly'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">📆</div>
                  <div className="text-xs font-medium">Veckovis</div>
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
