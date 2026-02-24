import { Home, Calendar, MessageSquare, User, Plus } from 'lucide-react';

interface BottomNavProps {
  onAddClick: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ onAddClick, activeTab, onTabChange }: BottomNavProps) {
  const getIconColor = (tabName: string) => 
    activeTab === tabName ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-4 rounded-t-3xl flex items-center justify-between z-40">
      <button 
        onClick={() => onTabChange('home')}
        className={`p-2 transition-colors ${getIconColor('home')}`}
      >
        <Home size={24} />
      </button>
      <button 
        onClick={() => onTabChange('calendar')}
        className={`p-2 transition-colors ${getIconColor('calendar')}`}
      >
        <Calendar size={24} />
      </button>
      
      <div className="relative -top-8">
        <button 
          onClick={onAddClick}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 hover:scale-105 transition-transform"
        >
          <Plus size={28} />
        </button>
      </div>

      <button 
        onClick={() => onTabChange('chat')}
        className={`p-2 transition-colors ${getIconColor('chat')}`}
      >
        <MessageSquare size={24} />
      </button>
      <button 
        onClick={() => onTabChange('profile')}
        className={`p-2 transition-colors ${getIconColor('profile')}`}
      >
        <User size={24} />
      </button>
    </div>
  );
}
