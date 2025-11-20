// src/components/layout/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "../Footer"; // 👉 make sure this path is correct

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Left sticky sidebar */}
      <Sidebar />

      {/* Right side: topbar + main content + footer */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
          <Outlet />
        </main>

        {/* 👉 Footer goes here, visible on all authenticated pages */}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
