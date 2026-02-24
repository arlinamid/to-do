/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Todo, Category } from './types';
import { TodoItem } from './components/TodoItem';
import { CreateTaskModal } from './components/CreateTaskModal';
import { HeroCard } from './components/HeroCard';
import { BottomNav } from './components/BottomNav';
import { Sidebar, Notifications } from './components/Overlays';
import { CalendarView, ProfileView, ChatView } from './components/Views';
import { Search, Grid, Bell, ChevronRight } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'Összes'>('Összes');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addTodo = (text: string, deadline: string, category: Category) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      deadline: deadline || undefined,
      category,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'Összes' || todo.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const overdueTodos = todos.filter(
    t => t.deadline && new Date(t.deadline) < new Date() && !t.completed
  );

  const categories: (Category | 'Összes')[] = ['Összes', 'Munka', 'Személyes', 'Bevásárlás', 'Egyéb'];

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <CalendarView todos={todos} />;
      case 'profile':
        return <ProfileView todos={todos} />;
      case 'chat':
        return <ChatView />;
      default:
        return (
          <>
            {/* Hero Section */}
            <HeroCard total={todos.length} completed={todos.filter(t => t.completed).length} />

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Keresés a feladatok között..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Task List Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                {activeCategory === 'Összes' ? 'Mai feladatok' : activeCategory}
              </h2>
              <button 
                onClick={() => setActiveCategory('Összes')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Összes <ChevronRight size={16} />
              </button>
            </div>

            {/* Task List */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredTodos.map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                  
                  {filteredTodos.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-slate-400">
                        {search ? 'Nincs találat' : 'Nincs mára feladatod'}
                      </p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-32">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* App Bar */}
        <header className="flex items-center justify-between mb-8 relative">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Grid size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800">
            {activeTab === 'home' ? 'Kezdőlap' : 
             activeTab === 'calendar' ? 'Naptár' :
             activeTab === 'profile' ? 'Profil' : 'Chat'}
          </h1>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative"
          >
            <Bell size={24} />
            {overdueTodos.length > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          <Notifications 
            isOpen={isNotificationsOpen} 
            onClose={() => setIsNotificationsOpen(false)} 
            overdueTodos={overdueTodos}
          />
        </header>

        {renderContent()}
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addTodo} 
      />
      
      <BottomNav 
        onAddClick={() => setIsModalOpen(true)} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

