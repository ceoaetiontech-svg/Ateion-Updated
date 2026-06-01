import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
            Welcome to the Admin Portal
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            This is a fully functional frontend dashboard simulation. Select
            "Upload Course" to try the new course builder.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clay-card p-6 bg-[var(--color-background-secondary)]">
          <h3 className="font-semibold text-lg mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-[var(--color-primary)]">24</p>
        </div>
        <div className="clay-card p-6 bg-[var(--color-background-secondary)]">
          <h3 className="font-semibold text-lg mb-2">Active Students</h3>
          <p className="text-3xl font-bold text-[var(--color-primary)]">
            1,402
          </p>
        </div>
        <div className="clay-card p-6 bg-[var(--color-background-secondary)]">
          <h3 className="font-semibold text-lg mb-2">Platform Revenue</h3>
          <p className="text-3xl font-bold text-[var(--color-primary)]">
            $12,450
          </p>
        </div>
      </div>
    </div>
  );
}
