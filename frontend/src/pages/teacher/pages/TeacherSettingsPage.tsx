import { Helmet } from "react-helmet-async";
import React, { useState } from 'react';
import { User, Bell, Shield, Wallet, Save } from 'lucide-react';

export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <Helmet>
        <title>Instructor Settings | Ateion</title>
        <meta name="description" content="Manage your instructor profile, payout methods, and notification preferences on Ateion." />
      </Helmet>
    <div className="w-full max-w-4xl mx-auto animate-fade-in pb-20">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">Instructor Settings</h2>
        <p className="text-[var(--color-text-secondary)]">Manage your instructor profile, payout methods, and notification preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden flex flex-col">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'profile' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]'}`}
            >
              <User size={18} /> Public Profile
            </button>
            <button 
              onClick={() => setActiveTab('payout')}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-colors cursor-pointer text-left border-t border-[var(--color-border-light)] ${activeTab === 'payout' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]'}`}
            >
              <Wallet size={18} /> Payout Details
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-colors cursor-pointer text-left border-t border-[var(--color-border-light)] ${activeTab === 'notifications' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]'}`}
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-colors cursor-pointer text-left border-t border-[var(--color-border-light)] ${activeTab === 'security' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]'}`}
            >
              <Shield size={18} /> Account Security
            </button>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1">
          <div className="clay-card p-6 md:p-8 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)]">
            
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-[var(--color-border-light)] pb-4 mb-6">Public Profile</h3>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center border-2 border-blue-500 text-blue-500 font-bold text-3xl">
                    JD
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-xl text-sm font-semibold hover:border-[var(--color-primary)] transition-colors mb-2 cursor-pointer">
                      Upload Avatar
                    </button>
                    <p className="text-xs text-[var(--color-text-tertiary)]">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Display Name</label>
                    <input type="text" defaultValue="John Doe" className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Professional Title</label>
                    <input type="text" defaultValue="Senior Cloud Architect" className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Instructor Bio</label>
                  <textarea rows={4} defaultValue="Cloud architecture expert with 15 years of industry experience. Passionate about teaching scalable systems." className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]"></textarea>
                </div>
              </div>
            )}

            {activeTab === 'payout' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-[var(--color-border-light)] pb-4 mb-6">Payout Details</h3>
                
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm mb-6 flex items-start gap-3">
                  <Wallet size={20} className="shrink-0 mt-0.5" />
                  <p>Earnings are disbursed on the 1st of every month. Ensure your PayPal email is correct.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">PayPal Email Address</label>
                  <input type="email" defaultValue="instructor@example.com" className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]" />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-[var(--color-border-light)] pb-4 mb-6">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-[var(--color-border-light)] rounded-xl cursor-pointer hover:bg-[var(--color-background-tertiary)] transition-colors">
                    <div>
                      <span className="font-semibold text-sm">New Student Enrollments</span>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">Get an email when a student buys your course</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[var(--color-primary)]" />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-[var(--color-border-light)] rounded-xl cursor-pointer hover:bg-[var(--color-background-tertiary)] transition-colors">
                    <div>
                      <span className="font-semibold text-sm">Student Questions (Q&A)</span>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">Get notified when a student asks a question</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[var(--color-primary)]" />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-[var(--color-border-light)] rounded-xl cursor-pointer hover:bg-[var(--color-background-tertiary)] transition-colors">
                    <div>
                      <span className="font-semibold text-sm">Course Reviews</span>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">Get notified when a student leaves a review</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-[var(--color-primary)]" />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-[var(--color-border-light)] pb-4 mb-6">Account Security</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">New Password</label>
                  <input type="password" placeholder="Enter new password" className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] outline-none focus:border-[var(--color-primary)]" />
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[var(--color-border-light)] flex justify-end">
              <button className="clay-button bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 shadow-sm cursor-pointer">
                <Save size={18} />
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
