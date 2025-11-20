import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-slate-100 px-4">
      <div className="text-7xl">🏬</div>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-slate-400 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist in the Mali Naturals
        dashboard. It might have been moved or deleted.
      </p>
      <Link
        to="/dashboard"
        className="mt-2 inline-flex items-center px-4 py-2 rounded-2xl bg-primary-500 hover:bg-primary-600 text-sm font-medium text-slate-900"
      >
        Go to dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;