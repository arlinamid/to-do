import { Trash2, Check, Calendar, GripVertical, Clock } from 'lucide-react';
import { Todo } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'motion/react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Munka': 'bg-purple-100 text-purple-600',
  'Személyes': 'bg-blue-100 text-blue-600',
  'Bevásárlás': 'bg-green-100 text-green-600',
  'Egyéb': 'bg-orange-100 text-orange-600',
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date() && !todo.completed;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
        <GripVertical size={18} />
      </div>

      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${CATEGORY_COLORS[todo.category] || 'bg-gray-100 text-gray-500'}`}>
        <div className="w-2.5 h-2.5 rounded-full bg-current" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-base font-semibold truncate ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {todo.text}
        </h4>
        <div className="flex items-center gap-3 mt-1">
          {todo.deadline && (
            <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
              <Clock size={12} />
              <span>
                {new Date(todo.deadline).toLocaleDateString('hu-HU', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-blue-500 border-blue-500 text-white'
            : 'border-gray-300 text-transparent hover:border-blue-500'
        }`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all absolute right-2 top-2"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}
