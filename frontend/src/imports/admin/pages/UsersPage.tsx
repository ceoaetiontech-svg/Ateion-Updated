import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Edit2,
  ShieldAlert,
  Trash2,
  UserPlus,
  Filter,
} from "lucide-react";

const MOCK_USERS = [
  {
    id: "1",
    name: "Alice Chen",
    email: "alice.c@university.edu",
    role: "Student",
    status: "Active",
    joined: "2025-11-12",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "mjohnson@ateion.com",
    role: "Admin",
    status: "Active",
    joined: "2023-01-05",
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "swilliams@corporate.org",
    role: "Partner",
    status: "Active",
    joined: "2024-06-22",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david.lee@student.org",
    role: "Student",
    status: "Suspended",
    joined: "2026-02-14",
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    email: "erodriguez@ateion.com",
    role: "Instructor",
    status: "Active",
    joined: "2024-11-30",
  },
  {
    id: "6",
    name: "James Smith",
    email: "jsmith99@gmail.com",
    role: "Student",
    status: "Active",
    joined: "2026-04-01",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(MOCK_USERS);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAction = (action: string, user: string) => {
    alert(`${action} action triggered for ${user}`);
  };

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
            User Management
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Manage students, instructors, and administrative accounts.
          </p>
        </div>
        <button className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-[var(--shadow-button)] cursor-pointer">
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl overflow-hidden border border-[var(--color-border-light)] shadow-sm">
        {/* Toolbar */}
        <div className="p-6 border-b border-[var(--color-border-light)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--color-background-secondary)]">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] transition-colors w-full sm:w-auto justify-center cursor-pointer">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-background-tertiary)] border-b border-[var(--color-border-light)] text-[var(--color-text-secondary)] text-sm">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Joined Date</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary_light)] flex items-center justify-center font-bold text-[var(--color-primary)] border border-[var(--color-border-medium)]">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--color-text-primary)]">
                            {user.name}
                          </p>
                          <p className="text-sm text-[var(--color-text-tertiary)]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                            : user.role === "Instructor"
                              ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                              : "bg-gray-500/10 text-gray-600 border border-gray-500/20"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-600 border border-red-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`}
                        ></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)] text-sm">
                      {new Date(user.joined).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAction("Edit", user.name)}
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleAction("Suspend", user.name)}
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
                          title="Suspend User"
                        >
                          <ShieldAlert size={16} />
                        </button>
                        <button
                          onClick={() => handleAction("Delete", user.name)}
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-[var(--color-text-tertiary)]"
                  >
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-[var(--color-border-light)] flex justify-between items-center text-sm text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)]">
          <p>
            Showing 1 to {filteredUsers.length} of {users.length} entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-[var(--color-border-medium)] rounded-lg hover:bg-[var(--color-background-tertiary)] disabled:opacity-50 cursor-pointer">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-[var(--color-border-medium)] rounded-lg hover:bg-[var(--color-background-tertiary)] cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
