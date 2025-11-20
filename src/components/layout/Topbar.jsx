// src/components/layout/Topbar.jsx
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();
  const name = user?.username || "User";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wide">
          Welcome back
        </p>
        <h2 className="text-sm md:text-base font-semibold text-white">
          {name} 👋
        </h2>
        <p className="text-[11px] text-slate-400">
          {dateStr} • {timeStr}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Mali Naturals • Kautilya
        </span>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-500 to-amber-400 flex items-center justify-center text-sm font-bold text-slate-900">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
