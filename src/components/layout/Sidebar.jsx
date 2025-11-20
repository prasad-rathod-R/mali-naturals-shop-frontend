import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-slate-800/70";

  const activeClasses = "bg-primary-500 text-white";

  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed md:static z-30 h-full w-64 bg-slate-950/90 border-r border-slate-800
          flex flex-col transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div>
            <p className="text-xs tracking-widest text-primary-400 uppercase">
              Mali Naturals
            </p>
            <h1 className="text-lg font-semibold text-white">
              Shop Dashboard
            </h1>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "text-slate-200"}`
            }
            onClick={() => setOpen(false)}
          >
            <span className="text-lg">📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/shops/new"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "text-slate-200"}`
            }
            onClick={() => setOpen(false)}
          >
            <span className="text-lg">🛒</span>
            <span>New Shop Entry</span>
          </NavLink>
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl
             bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-100"
          >
            <span>Logout</span> 🚪
          </button>
        </div>
      </aside>

      <button
        className="fixed md:hidden top-4 left-4 z-10 inline-flex items-center justify-center
        w-10 h-10 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>
    </>
  );
};

export default Sidebar;