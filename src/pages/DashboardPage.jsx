// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllShops } from "../services/shopService";

const DashboardPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllShops();
      setShops(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load shops", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const totalProducts = shops.reduce(
    (sum, s) => sum + (s.products?.length || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Shop Overview
          </h1>
          <p className="text-sm text-slate-400">
            All Kautilya / Mali Naturals outlet entries in one place.
          </p>
        </div>
        <Link
          to="/shops/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-primary-500 hover:bg-primary-600 text-sm font-medium text-slate-900 shadow-lg shadow-primary-500/30"
        >
          <span>+ New shop</span>
        </Link>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Total shops</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {shops.length}
          </p>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Product lines</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {totalProducts}
          </p>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Active today</p>
          <p className="mt-2 text-2xl font-semibold text-white">—</p>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Pending updates</p>
          <p className="mt-2 text-2xl font-semibold text-white">—</p>
        </div>
      </div>

      {/* table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Registered shops</h2>
          <button
            onClick={load}
            className="text-xs px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100"
          >
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-900/70 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Shop</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Owner</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-400">
                    Loading...
                  </td>
                </tr>
              ) : shops.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-400">
                    No shops found. Create your first shop entry.
                  </td>
                </tr>
              ) : (
                shops.map((shop) => (
                  <tr
                    key={shop.id}
                    className="border-b border-slate-800/60 hover:bg-slate-900/60"
                  >
                    <td className="px-4 py-2 text-slate-400">#{shop.id}</td>
                    <td className="px-4 py-2">
                      {shop.shopDetails?.shopName || "—"}
                    </td>
                    <td className="px-4 py-2 text-slate-300">
                      {shop.shopDetails?.shopLocation || "—"}
                    </td>
                    <td className="px-4 py-2 text-slate-300">
                      {shop.shopDetails?.ownerName || "—"}
                    </td>
                    <td className="px-4 py-2 text-slate-300">
                      {shop.products?.length || 0}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        to={`/shops/${shop.id}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-100"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
