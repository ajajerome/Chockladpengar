import React from 'react';
import type { Task } from '@/types';
import { ChocolateCoinIcon, CheckIcon, ClockIcon } from './icons';

interface TaskCardProps {
  task: Task;
  onSubmit?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  userRole?: 'parent' | 'child';
  isSubmitting?: boolean;
}

export function TaskCard({
  task,
  onSubmit,
  onApprove,
  onReject,
  onDelete,
  showActions = true,
  userRole,
  isSubmitting = false,
}: TaskCardProps) {
  const statusColors = {
    pending: { bg: '#FFF8F0', border: '#FFE55C', text: '#8B5A3C' },
    in_review: { bg: '#E3F2FD', border: '#64B5F6', text: '#1976D2' },
    approved: { bg: '#E8F5E9', border: '#4CAF50', text: '#2E7D32' },
    rejected: { bg: '#FFEBEE', border: '#FF6B6B', text: '#C62828' },
  };
  
  const statusTexts = {
    pending: 'Väntar',
    in_review: 'Under granskning',
    approved: 'Godkänd',
    rejected: 'Avvisad',
  };
  
  const frequencyIcons = {
    once: '1x',
    daily: 'Daglig',
    weekly: 'Veckovis',
  };
  
  const colors = statusColors[task.status];
  
  return (
    <div 
      className="rounded-3xl border-2 p-5 shadow-md transition-all hover:shadow-lg bg-white"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="text-xs font-extrabold px-2 py-1 rounded-full"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {frequencyIcons[task.frequency]}
            </span>
            <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>{task.title}</h3>
          </div>
          {task.description && (
            <p className="text-sm mb-2" style={{ color: '#A67C52' }}>{task.description}</p>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: '#FFF8F0' }}>
            <ChocolateCoinIcon size={20} />
            <span className="font-extrabold" style={{ color: '#FFD700' }}>{task.reward}</span>
          </div>
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {statusTexts[task.status]}
          </span>
        </div>
      </div>
      
      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: '#F5E6D3' }}>
          {userRole === 'child' && task.status === 'pending' && onSubmit && (
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Skickar...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon size={22} />
                  <span>✨ Markera som klar!</span>
                </div>
              )}
            </button>
          )}
          
          {userRole === 'parent' && task.status === 'in_review' && (
            <>
              {onApprove && (
                <button
                  onClick={onApprove}
                  className="flex-1 py-2 px-4 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all text-white"
                  style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}
                >
                  Godkänn
                </button>
              )}
              {onReject && (
                <button
                  onClick={onReject}
                  className="flex-1 py-2 px-4 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#FF6B6B', color: '#FFFFFF' }}
                >
                  Neka
                </button>
              )}
            </>
          )}
          
          {userRole === 'parent' && task.status === 'pending' && onDelete && (
            <button
              onClick={onDelete}
              className="px-4 py-2 rounded-2xl text-sm font-medium transition-all hover:bg-red-50"
              style={{ color: '#FF6B6B' }}
            >
              Ta bort
            </button>
          )}
        </div>
      )}
    </div>
  );
}
