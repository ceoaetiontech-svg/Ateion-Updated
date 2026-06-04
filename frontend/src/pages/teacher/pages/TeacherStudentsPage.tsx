import { Helmet } from "react-helmet-async";
import React, { useState } from 'react';
import { Search, Filter, Mail, Award, BookOpen } from 'lucide-react';

const mockStudents = [
  { id: 1, name: 'Emma Thompson', email: 'emma.t@example.com', enrolled: 3, progress: 85, lastActive: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', enrolled: 1, progress: 42, lastActive: '1 day ago', status: 'Active' },
  { id: 3, name: 'Sarah Jenkins', email: 'sarah.j@example.com', enrolled: 2, progress: 100, lastActive: '3 days ago', status: 'Completed' },
  { id: 4, name: 'David Rodriguez', email: 'david.r@example.com', enrolled: 4, progress: 12, lastActive: '2 weeks ago', status: 'Inactive' },
  { id: 5, name: 'Lisa Wong', email: 'lisa.w@example.com', enrolled: 1, progress: 67, lastActive: '5 hours ago', status: 'Active' },
];

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>My Students | Ateion Teacher</title>
        <meta name="description" content="Monitor student progress and manage enrollments in your Ateion courses." />
      </Helmet>
    <div className="w-full max-w-6xl mx-auto animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">My Students</h2>
          <p className="text-[var(--color-text-secondary)]">Monitor progress and communicate with students enrolled in your courses.</p>
        </div>
      </div>

      <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-[var(--color-border-light)] flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--color-background-primary)]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={18} />
            <input 
              type="text" 
              placeholder="Search students by name or email..." 
              className="clay-input w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] transition-colors w-full md:w-auto justify-center cursor-pointer">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-light)] bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-sm">
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Enrolled Courses</th>
                <th className="p-4 font-semibold">Avg. Progress</th>
                <th className="p-4 font-semibold">Last Active</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center font-bold text-[var(--color-accent)] border border-[var(--color-border-medium)]">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-text-primary)]">{student.name}</div>
                        <div className="text-xs text-[var(--color-text-tertiary)]">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--color-text-secondary)] font-medium">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={16} className="text-blue-500" />
                      {student.enrolled}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[var(--color-border-medium)] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--color-text-secondary)] text-sm">
                    {student.lastActive}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer" title="Message Student">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer" title="View Certificates">
                        <Award size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--color-text-tertiary)] font-medium">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
