import { motion } from 'motion/react';

interface HeroCardProps {
  total: number;
  completed: number;
}

export function HeroCard({ total, completed }: HeroCardProps) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 mb-8 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl" />

      <div className="relative z-10">
        <h2 className="text-lg font-medium opacity-90 mb-1">Mai előrehaladás</h2>
        <h3 className="text-3xl font-bold mb-6">{total} feladat</h3>

        <div className="flex items-end justify-between mb-2">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=${i}`}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 bg-white/20 flex items-center justify-center text-xs font-bold">
              +
            </div>
          </div>
          <span className="text-2xl font-bold">{progress}%</span>
        </div>

        <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
