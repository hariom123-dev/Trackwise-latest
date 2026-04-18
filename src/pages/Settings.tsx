import React, { useState } from 'react';
import { User, Lock, Bell, Globe, Shield, Key, Save, Trash2, Camera, Mail, Phone, CreditCard, Copy, Check, Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: 'Alex Sterling',
    email: 'alex@kinetic.com',
    phone: '+1 (555) 000-0000',
    timezone: 'Pacific Time (PT)'
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: true,
    predictive: false
  });

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 'ga', name: 'Google Analytics', status: 'Connected', icon: Globe },
    { id: 'stripe', name: 'Stripe', status: 'Connected', icon: CreditCard },
    { id: 'slack', name: 'Slack', status: 'Not Connected', icon: Bell },
    { id: 'salesforce', name: 'Salesforce', status: 'Not Connected', icon: Shield },
  ]);

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile updated successfully');
    }, 1500);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newVal = !prev[key];
      const label = String(key);
      toast.info(`${label.charAt(0).toUpperCase() + label.slice(1)} notifications ${newVal ? 'enabled' : 'disabled'}`);
      return { ...prev, [key]: newVal };
    });
  };

  const handleIntegrationToggle = (id: string, currentStatus: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const newStatus = currentStatus === 'Connected' ? 'Not Connected' : 'Connected';
        toast.success(`${item.name} ${newStatus === 'Connected' ? 'connected' : 'disconnected'}`);
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setApiKeyCopied(true);
    toast.success('API Key copied to clipboard');
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

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
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-50 transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => toast.success('Profile photo upload triggered')}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    <Camera size={24} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900">{profileData.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">Lead Strategist at Kinetic Global</p>
                  <button 
                    onClick={() => toast.success('Profile photo upload triggered')}
                    className="mt-2 text-xs font-bold text-indigo-700 hover:underline"
                  >
                    Change Photo
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="tel" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timezone</label>
                    <select 
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all"
                    >
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => {
                      setProfileData({
                        name: 'Alex Sterling',
                        email: 'alex@kinetic.com',
                        phone: '+1 (555) 000-0000',
                        timezone: 'Pacific Time (PT)'
                      });
                      toast.info('Changes discarded');
                    }}
                    className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 text-sm font-bold bg-indigo-900 text-white rounded-xl shadow-lg shadow-indigo-900/10 hover:bg-indigo-800 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                    <button 
                      onClick={() => setShow2FAModal(true)}
                      className="mt-4 px-4 py-2 bg-indigo-900 text-white text-xs font-bold rounded-lg hover:bg-indigo-800 transition-all"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-indigo-900">Change Password</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success('Password changed successfully');
                  }} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
                      <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all" />
                      </div>
                    </div>
                    <button type="submit" className="px-6 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-all">
                      Update Password
                    </button>
                  </form>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-bold text-rose-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-slate-500 font-medium mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="px-6 py-3 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {[
                { key: 'email', title: 'Email Notifications', desc: 'Receive daily summaries and critical alerts via email.' },
                { key: 'push', title: 'Push Notifications', desc: 'Get real-time updates on your desktop or mobile device.' },
                { key: 'weekly', title: 'Weekly Reports', desc: 'Get a comprehensive PDF report of your business performance every Monday.' },
                { key: 'predictive', title: 'Predictive Alerts', desc: 'Be notified when our ML engine detects significant market shifts.' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all">
                  <div className="max-w-md">
                    <h4 className="font-bold text-indigo-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                    className={`w-12 h-6 rounded-full transition-colors relative duration-300 ${notifications[item.key as keyof typeof notifications] ? 'bg-indigo-900' : 'bg-slate-200'}`}
                  >
                    <div 
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'}`}
                    />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((item) => (
                  <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between transition-all hover:border-indigo-100 hover:shadow-sm">
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
                    <button 
                      onClick={() => handleIntegrationToggle(item.id, item.status)}
                      className={`text-xs font-bold transition-colors ${item.status === 'Connected' ? 'text-rose-600 hover:text-rose-700' : 'text-indigo-700 hover:text-indigo-800'}`}
                    >
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
                  <div className="relative flex-1">
                    <input 
                      type={apiKeyVisible ? "text" : "password"} 
                      value="tw_live_51P2k9X2eY3z4w5v6b7n8m9" 
                      readOnly 
                      className="w-full bg-white border border-indigo-200 rounded-xl pl-4 pr-10 py-2 text-xs font-mono text-indigo-900 outline-none" 
                    />
                    <button 
                      onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600"
                    >
                      {apiKeyVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button 
                    onClick={() => copyApiKey('tw_live_51P2k9X2eY3z4w5v6b7n8m9')}
                    className="px-4 py-2 bg-indigo-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-800 transition-all flex items-center gap-2"
                  >
                    {apiKeyCopied ? <Check size={14} /> : <Copy size={14} />}
                    {apiKeyCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Modals Simulation */}
          <AnimatePresence>
            {show2FAModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShow2FAModal(false)}
                  className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl"
                >
                  <button onClick={() => setShow2FAModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-indigo-900"><X size={20} /></button>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-indigo-900 mb-2">Enable 2FA</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">Secure your account with two-factor authentication. Scan the QR code in your authenticator app to get started.</p>
                  <div className="bg-slate-100 aspect-square rounded-2xl mb-8 flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center">QR Code Simulation</div>
                  </div>
                  <button 
                    onClick={() => {
                      toast.success('2FA configured successfully');
                      setShow2FAModal(false);
                    }}
                    className="w-full py-4 bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-800 transition-all"
                  >
                    Verify & Activate
                  </button>
                </motion.div>
              </div>
            )}

            {showDeleteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="absolute inset-0 bg-rose-900/20 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6">
                    <Trash2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-rose-900 mb-2">Delete Account?</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">This action is permanent. All your business data, models, and historical analysis will be deleted from TrackWise servers forever.</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                      Nevermind
                    </button>
                    <button 
                      onClick={() => {
                        toast.error('Account deletion requested');
                        setShowDeleteModal(false);
                      }}
                      className="flex-1 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
