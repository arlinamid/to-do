import { Todo } from '../types';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  todos: Todo[];
}

export function CalendarView({ todos }: CalendarViewProps) {
  // Group todos by date
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!todo.deadline) return acc;
    const date = new Date(todo.deadline).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  const sortedDates = Object.keys(groupedTodos).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Naptár</h2>
      
      {sortedDates.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <CalendarIcon size={48} className="mx-auto mb-4 opacity-20" />
          <p>Nincs határidős feladatod</p>
        </div>
      ) : (
        sortedDates.map(date => (
          <div key={date}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 sticky top-0 bg-[#F8FAFC] py-2 z-10">
              {date}
            </h3>
            <div className="space-y-3">
              {groupedTodos[date].map(todo => (
                <div key={todo.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className={`w-1 h-10 rounded-full ${todo.completed ? 'bg-gray-200' : 'bg-blue-500'}`} />
                  <div>
                    <p className={`font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                      {todo.text}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Clock size={12} />
                      {new Date(todo.deadline!).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

interface ProfileViewProps {
  todos: Todo[];
}

export function ProfileView({ todos }: ProfileViewProps) {
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  const active = total - completed;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil</h2>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
          👤
        </div>
        <h3 className="text-xl font-bold text-gray-900">Felhasználó</h3>
        <p className="text-gray-500">Productive Member</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500 p-6 rounded-3xl text-white shadow-lg shadow-blue-500/20">
          <p className="text-blue-100 text-sm font-medium mb-1">Összes</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-emerald-500 p-6 rounded-3xl text-white shadow-lg shadow-emerald-500/20">
          <p className="text-emerald-100 text-sm font-medium mb-1">Kész</p>
          <p className="text-3xl font-bold">{completed}</p>
        </div>
        <div className="bg-orange-500 p-6 rounded-3xl text-white shadow-lg shadow-orange-500/20 col-span-2">
          <p className="text-orange-100 text-sm font-medium mb-1">Aktív feladatok</p>
          <p className="text-3xl font-bold">{active}</p>
        </div>
      </div>
    </div>
  );
}

export function ChatView() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">💬</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Hamarosan!</h2>
      <p className="text-gray-500">
        A csapatmunka funkció fejlesztés alatt áll. Hamarosan beszélgethetsz a csapattársaiddal itt.
      </p>
    </div>
  );
}
