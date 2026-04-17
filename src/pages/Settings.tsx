import React, { useState } from 'react';
import { User, Lock, Bell, Globe, Shield, Key, Save, Trash2, Camera, Mail, Phone, CreditCard } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'integrations', icon: Globe, label: 'Integrations' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium">Manage your account preferences and system configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-900 text-white shadow-lg shadow-indigo-900/10' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-50"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <Camera size={24} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900">Alex Sterling</h3>
                  <p className="text-sm text-slate-500 font-medium">Lead Strategist at Kinetic Global</p>
                  <button className="mt-2 text-xs font-bold text-indigo-700 hover:underline">Change Photo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" defaultValue="Alex Sterling" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="email" defaultValue="alex@kinetic.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timezone</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-4">
                <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
                <button className="px-6 py-3 text-sm font-bold bg-indigo-900 text-white rounded-xl shadow-lg shadow-indigo-900/10 hover:bg-indigo-800 transition-all flex items-center gap-2">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                    <button className="mt-4 px-4 py-2 bg-indigo-900 text-white text-xs font-bold rounded-lg">Enable 2FA</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-indigo-900">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-bold text-rose-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-slate-500 font-medium mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-6 py-3 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all flex items-center gap-2">
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-6">
                {[
                  { title: 'Email Notifications', desc: 'Receive daily summaries and critical alerts via email.' },
                  { title: 'Push Notifications', desc: 'Get real-time updates on your desktop or mobile device.' },
                  { title: 'Weekly Reports', desc: 'Get a comprehensive PDF report of your business performance every Monday.' },
                  { title: 'Predictive Alerts', desc: 'Be notified when our ML engine detects significant market shifts.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all">
                    <div className="max-w-md">
                      <h4 className="font-bold text-indigo-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-indigo-900 relative p-1">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Google Analytics', status: 'Connected', icon: Globe },
                  { name: 'Stripe', status: 'Connected', icon: CreditCard },
                  { name: 'Slack', status: 'Not Connected', icon: Bell },
                  { name: 'Salesforce', status: 'Not Connected', icon: Shield },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white text-indigo-600 shadow-sm">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-indigo-900 text-sm">{item.name}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Connected' ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {item.status}
                        </p>
                      </div>
                    </div>
                    <button className={`text-xs font-bold ${item.status === 'Connected' ? 'text-rose-600' : 'text-indigo-700'}`}>
                      {item.status === 'Connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="text-indigo-600" size={20} />
                  <h4 className="font-bold text-indigo-900">API Access</h4>
                </div>
                <p className="text-sm text-slate-600 font-medium mb-4">Use your API key to integrate TrackWise with your own custom applications and workflows.</p>
                <div className="flex gap-2">
                  <input type="password" value="tw_live_51P2k9X2eY3z4w5v6b7n8m9" readOnly className="flex-1 bg-white border border-indigo-200 rounded-xl px-4 py-2 text-xs font-mono text-indigo-900 outline-none" />
                  <button className="px-4 py-2 bg-indigo-900 text-white text-xs font-bold rounded-xl">Copy Key</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
