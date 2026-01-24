import React from 'react'
import { Task } from '@/types'
import { ChocolateCoinIcon, CheckIcon, ClockIcon } from './icons'

interface TaskCardProps {
  task: Task
  onClick?: () => void
  showActions?: boolean
  showStatus?: boolean
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  showActions = false,
  showStatus = true,
}) => {
  const getStatusBadgeClass = () => {
    switch (task.status) {
      case 'pending':
        return 'badge-pending'
      case 'completed':
        return 'badge-completed'
      case 'approved':
        return 'badge-approved'
      case 'rejected':
        return 'badge-rejected'
      default:
        return ''
    }
  }

  const getStatusText = () => {
    switch (task.status) {
      case 'pending':
        return 'Att göra'
      case 'completed':
        return 'Inväntar godkännande'
      case 'approved':
        return 'Godkänd'
      case 'rejected':
        return 'Ej godkänd'
      default:
        return 'Okänd status'
    }
  }

  const getCardBorderClass = () => {
    switch (task.status) {
      case 'pending':
        return 'border-l-status-pending'
      case 'completed':
        return 'border-l-status-completed'
      case 'approved':
        return 'border-l-status-approved'
      case 'rejected':
        return 'border-l-status-rejected'
      default:
        return 'border-l-gray-300'
    }
  }

  return (
    <div
      className={`card border-l-4 ${getCardBorderClass()} ${
        onClick ? 'cursor-pointer hover:scale-[1.01] hover:shadow-xl' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-2 flex-1">
          {task.status === 'approved' && (
            <div className="mt-0.5">
              <CheckIcon size={20} color="#4CAF50" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-text-primary font-display">
            {task.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-accent-light/20 px-3 py-1.5 rounded-full">
          <ChocolateCoinIcon size={18} color="#D4AF37" />
          <span className="font-bold text-accent-dark">{task.points}</span>
        </div>
      </div>

      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        {task.description}
      </p>

      {showStatus && (
        <div className="flex justify-between items-center">
          <span className={`badge ${getStatusBadgeClass()}`}>
            {getStatusText()}
          </span>

          {task.deadline && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <ClockIcon size={14} color="currentColor" />
              <span>{new Date(task.deadline).toLocaleDateString('sv-SE')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
