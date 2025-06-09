import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import Sidebar from './_components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="px-5 py-6">
          {/* Header with Dashboard title */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-6xl font-bold tracking-tight gradient-title">
              Dashboard
            </h1>
          </div>

          {/* Content with Suspense wrapper */}
          <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
            {children || <DashboardPage />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
