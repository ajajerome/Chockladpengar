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
            <h2 className="text-xl font-bold mb-2" style={{ color: '#8B5A3C' }}>Inga barn</h2>
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
          <h1 className="text-3xl font-bold" style={{ color: '#8B5A3C' }}>Skapa uppgift</h1>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-chocolate-dark mb-1">
                Uppgiftens namn
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Diska"
                required
                className="input-chocolate"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-chocolate-dark mb-1">
                Beskrivning (valfritt)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv vad som ska göras..."
                rows={3}
                className="input-chocolate resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="reward" className="block text-sm font-medium text-chocolate-dark mb-1">
                Belöning (chokladpengar)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3">
                  <ChocolateCoinIcon size={24} color="#D4AF37" />
                </div>
                <input
                  type="number"
                  id="reward"
                  value={reward}
                  onChange={(e) => setReward(Number(e.target.value))}
                  min={1}
                  required
                  className="input-chocolate pl-14"
                />
              </div>
              <p className="text-xs text-nougat-gold font-medium mt-1">
                ≈ {(reward * chokladpengValue).toFixed(2)} kr
              </p>
            </div>
            
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-chocolate-dark mb-1">
                Tilldela till
              </label>
              <select
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
                className="input-chocolate"
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
              <label className="block text-sm font-medium text-chocolate-dark mb-2">
                Frekvens
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    frequency === 'once'
                      ? 'border-nougat-gold bg-nougat-light/50'
                      : 'border-chocolate-light/30 hover:border-chocolate-light/50'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon size={24} color={frequency === 'once' ? '#D4AF37' : '#8B6F47'} />
                  </div>
                  <div className="text-xs font-medium text-chocolate-dark">En gång</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    frequency === 'daily'
                      ? 'border-nougat-gold bg-nougat-light/50'
                      : 'border-chocolate-light/30 hover:border-chocolate-light/50'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon size={24} color={frequency === 'daily' ? '#D4AF37' : '#8B6F47'} />
                  </div>
                  <div className="text-xs font-medium text-chocolate-dark">Dagligen</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    frequency === 'weekly'
                      ? 'border-nougat-gold bg-nougat-light/50'
                      : 'border-chocolate-light/30 hover:border-chocolate-light/50'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon size={24} color={frequency === 'weekly' ? '#D4AF37' : '#8B6F47'} />
                  </div>
                  <div className="text-xs font-medium text-chocolate-dark">Veckovis</div>
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
