import React from 'react';
import type { Task } from '@/types';
import { ChocolateCoin } from './ChocolateCoin';
import { Button } from './Button';

interface TaskCardProps {
  task: Task;
  onSubmit?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  userRole?: 'parent' | 'child';
}

export function TaskCard({
  task,
  onSubmit,
  onApprove,
  onReject,
  onDelete,
  showActions = true,
  userRole,
}: TaskCardProps) {
  const statusColors = {
    pending: 'bg-yellow-50 border-yellow-200',
    in_review: 'bg-blue-50 border-blue-200',
    approved: 'bg-green-50 border-green-200',
    rejected: 'bg-red-50 border-red-200',
  };
  
  const statusTexts = {
    pending: 'Väntar',
    in_review: 'Under granskning',
    approved: 'Godkänd ✓',
    rejected: 'Avvisad',
  };
  
  const frequencyIcons = {
    once: '1️⃣',
    daily: '📅',
    weekly: '📆',
  };
  
  return (
    <div className={`rounded-2xl border-2 p-4 shadow-md ${statusColors[task.status]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{frequencyIcons[task.frequency]}</span>
            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 ml-10">{task.description}</p>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <ChocolateCoin amount={task.reward} size="sm" />
          <span className="text-xs font-medium text-gray-500">
            {statusTexts[task.status]}
          </span>
        </div>
      </div>
      
      {showActions && (
        <div className="flex gap-2 mt-3 border-t pt-3">
          {userRole === 'child' && task.status === 'pending' && onSubmit && (
            <Button onClick={onSubmit} variant="success" size="sm" fullWidth>
              Markera som klar ✓
            </Button>
          )}
          
          {userRole === 'parent' && task.status === 'in_review' && (
            <>
              {onApprove && (
                <Button onClick={onApprove} variant="success" size="sm" fullWidth>
                  Godkänn
                </Button>
              )}
              {onReject && (
                <Button onClick={onReject} variant="danger" size="sm" fullWidth>
                  Neka
                </Button>
              )}
            </>
          )}
          
          {userRole === 'parent' && task.status === 'pending' && onDelete && (
            <Button onClick={onDelete} variant="ghost" size="sm">
              Ta bort
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
