interface AvatarProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export function Avatar({ name, size = 'medium', color }: AvatarProps) {
  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return '?';
    
    const trimmedName = name.trim();
    if (!trimmedName) return '?';
    
    const words = trimmedName.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return trimmedName.substring(0, 2).toUpperCase();
  };

  const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-xl',
  };

  const getColor = () => {
    if (color) return color;
    
    if (!name || typeof name !== 'string') return 'bg-gray-500';
    
    // Generate consistent color based on name
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div
      className={`${sizeClasses[size]} ${getColor()} rounded-full flex items-center justify-center text-white font-extrabold shadow-md`}
    >
      {getInitials(name)}
    </div>
  );
}

