import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onComplete?: () => void;
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export function TaskCard({ task, onComplete, showActions, onApprove, onReject }: TaskCardProps) {
  const getStatusColor = () => {
    switch (task.status) {
      case 'pending':
        return 'border-l-yellow-400';
      case 'completed':
        return 'border-l-blue-400';
      case 'approved':
        return 'border-l-green-500';
      case 'rejected':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-400';
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'pending':
        return 'Att göra';
      case 'completed':
        return 'Inväntar godkännande';
      case 'approved':
        return 'Godkänd';
      case 'rejected':
        return 'Ej godkänd';
      default:
        return 'Okänd status';
    }
  };

  const getStatusBgColor = () => {
    switch (task.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`card border-l-4 ${getStatusColor()} mb-4`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          {task.status === 'approved' && <span className="text-green-500">✓</span>}
          {task.title}
        </h3>
        <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
          <span className="text-2xl">🍫</span>
          <span className="font-bold text-accent">{task.points}</span>
        </div>
      </div>

      <p className="text-secondary mb-3">{task.description}</p>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor()}`}>
          {getStatusText()}
        </span>

        {task.deadline && (
          <span className="text-sm text-gray-500 flex items-center gap-1">
            🕐 {new Date(task.deadline).toLocaleDateString('sv-SE')}
          </span>
        )}
      </div>

      {onComplete && task.status === 'pending' && (
        <button
          onClick={onComplete}
          className="mt-4 w-full btn-primary"
        >
          Markera som klar ✓
        </button>
      )}

      {showActions && task.status === 'completed' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onReject}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
          >
            ✗ Neka
          </button>
          <button
            onClick={onApprove}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
          >
            ✓ Godkänn
          </button>
        </div>
      )}
    </div>
  );
}

