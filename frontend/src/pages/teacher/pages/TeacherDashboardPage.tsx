import { Helmet } from "react-helmet-async";
import React from 'react';
import { TrendingUp, Users, DollarSign, Star, Activity, PlusCircle, MessageCircle, Megaphone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const RECENT_ACTIVITY = [
  { id: 1, type: 'enrollment', user: 'Emma Thompson', action: 'enrolled in', course: 'Advanced System Design', time: '10 mins ago' },
  { id: 2, type: 'review', user: 'Michael Chen', action: 'left a 5-star review on', course: 'React for Beginners', time: '1 hour ago' },
  { id: 3, type: 'question', user: 'Sarah Jenkins', action: 'asked a question in', course: 'UI/UX Fundamentals', time: '3 hours ago' },
  { id: 4, type: 'enrollment', user: 'David Rodriguez', action: 'enrolled in', course: 'React for Beginners', time: '5 hours ago' },
];

const TOP_COURSES = [
  { id: 1, title: 'Advanced System Design', students: 1245, rating: 4.9, revenue: '$24,900' },
  { id: 2, title: 'React for Beginners', students: 892, rating: 4.8, revenue: '$13,380' },
  { id: 3, title: 'UI/UX Fundamentals', students: 634, rating: 4.7, revenue: '$9,510' },
];

export default function TeacherDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Teacher Dashboard | Ateion</title>
        <meta name="description" content="Ateion instructor dashboard for managing courses, tracking student progress, and monitoring revenue." />
      </Helmet>
    <div className="animate-fade-in pb-20 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">Instructor Overview</h2>
          <p className="text-[var(--color-text-secondary)]">
            Welcome back! Here is a summary of your performance and recent student activity.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/teacher/upload" className="clay-button bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:brightness-110 transition-all shadow-[var(--shadow-button)]">
            <PlusCircle size={18} />
            Create Course
          </Link>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Users className="text-blue-500" size={24} />
            </div>
            <span className="flex items-center text-emerald-500 text-sm font-semibold">
              <TrendingUp size={16} className="mr-1" /> +12%
            </span>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Active Students</p>
          <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">2,771</h3>
        </div>

        <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <DollarSign className="text-emerald-500" size={24} />
            </div>
            <span className="flex items-center text-emerald-500 text-sm font-semibold">
              <TrendingUp size={16} className="mr-1" /> +8%
            </span>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Monthly Revenue</p>
          <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">$4,250</h3>
        </div>

        <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Star className="text-amber-500" size={24} />
            </div>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Average Rating</p>
          <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">4.8 <span className="text-lg text-[var(--color-text-tertiary)] font-normal">/ 5.0</span></h3>
        </div>

        <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <CheckCircle className="text-purple-500" size={24} />
            </div>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Published Courses</p>
          <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">8</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Top Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Star className="text-amber-500" size={20} />
              Top Performing Courses
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-sm">
                    <th className="pb-3 font-medium">Course Title</th>
                    <th className="pb-3 font-medium text-center">Students</th>
                    <th className="pb-3 font-medium text-center">Rating</th>
                    <th className="pb-3 font-medium text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_COURSES.map((course) => (
                    <tr key={course.id} className="border-b border-[var(--color-border-light)] last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Activity className="text-blue-500" size={18} />
                          </div>
                          <span className="font-semibold text-[var(--color-text-primary)]">{course.title}</span>
                        </div>
                      </td>
                      <td className="py-4 text-center font-medium text-[var(--color-text-secondary)]">{course.students}</td>
                      <td className="py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold">
                          <Star size={12} className="fill-amber-500" /> {course.rating}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold text-emerald-600">{course.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link to="/teacher/courses" className="text-sm font-medium text-blue-500 hover:underline">View All Courses</Link>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex gap-3 items-start border-b border-[var(--color-border-light)] last:border-0 pb-4 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    activity.type === 'enrollment' ? 'bg-emerald-500/10 text-emerald-500' :
                    activity.type === 'review' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {activity.type === 'enrollment' && <PlusCircle size={14} />}
                    {activity.type === 'review' && <Star size={14} />}
                    {activity.type === 'question' && <MessageCircle size={14} />}
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-[var(--color-text-secondary)]">{activity.course}</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="clay-card p-6 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--color-border-medium)] hover:bg-[var(--color-background-tertiary)] transition-colors group cursor-pointer">
                <span className="flex items-center gap-3 font-medium text-sm">
                  <MessageCircle className="text-blue-500" size={18} />
                  Answer Student Q&A
                </span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--color-border-medium)] hover:bg-[var(--color-background-tertiary)] transition-colors group cursor-pointer">
                <span className="flex items-center gap-3 font-medium text-sm">
                  <Megaphone className="text-purple-500" size={18} />
                  Post Announcement
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
    </>
  );
}
