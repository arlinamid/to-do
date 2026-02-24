import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Category, Todo } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: (Category | 'Összes')[];
  activeCategory: Category | 'Összes';
  onSelectCategory: (category: Category | 'Összes') => void;
}

export function Sidebar({ isOpen, onClose, categories, activeCategory, onSelectCategory }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 bottom-0 left-0 w-3/4 max-w-xs bg-white z-50 shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Menü</h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Kategóriák</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        onClose();
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  overdueTodos: Todo[];
}

export function Notifications({ isOpen, onClose, overdueTodos }: NotificationsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-16 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Értesítések</h3>
              {overdueTodos.length > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {overdueTodos.length} új
                </span>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {overdueTodos.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nincs elmulasztott feladatod</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {overdueTodos.map(todo => (
                    <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={16} className="text-red-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{todo.text}</p>
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <Clock size={10} />
                            Lejárt: {new Date(todo.deadline!).toLocaleDateString('hu-HU')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
