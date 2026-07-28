import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Lightbulb, 
  CreditCard, 
  Settings, 
  Bell, 
  Grid, 
  Search, 
  Menu, 
  X, 
  Briefcase, 
  BarChart, 
  TrendingUp, 
  FileText,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getStoredProfile, UserProfile } from '../utils/profileStorage';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredProfile);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setUserProfile(getStoredProfile());
    };
    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Database, label: 'Data Lab', path: '/data' },
    { icon: Lightbulb, label: 'Insights', path: '/insights' },
    { icon: CreditCard, label: 'Subscription', path: '/subscription' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const quickActions = [
    { icon: Database, label: 'Data Lab', desc: 'Manage datasets', color: 'bg-indigo-600' },
    { icon: TrendingUp, label: 'ML Models', desc: 'Predictive tools', color: 'bg-emerald-600' },
    { icon: FileText, label: 'Reports', desc: 'Export analytics', color: 'bg-blue-600' },
    { icon: BarChart, label: 'Visualizer', desc: 'Dynamic charts', color: 'bg-purple-600' },
    { icon: Briefcase, label: 'Portfolio', desc: 'Assets overview', color: 'bg-amber-600' },
    { icon: Search, label: 'Discovery', desc: 'Explore trends', color: 'bg-rose-600' },
  ];

  const notifications = [
    { title: 'Goal Reached', text: 'You hit your monthly revenue target.', time: '2m ago', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'New Insight', text: 'ML suggests optimizing churn rate.', time: '1h ago', icon: Lightbulb, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'System Update', text: 'TrackWise v3.4 is now live.', time: '3h ago', icon: Settings, color: 'text-slate-600 bg-slate-100' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col py-6 px-4 z-[70] transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand Header */}
        <div className="mb-8 px-2 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-900 flex items-center justify-center text-white font-black shadow-md shadow-indigo-900/20 group-hover:bg-indigo-800 transition-colors">
              <Sparkles size={18} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight block leading-tight">TrackWise</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Intelligence Suite</span>
            </div>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Main Nav Links */}
        <div className="px-2 mb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</span>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-indigo-950 font-bold bg-indigo-50/80 border-l-2 border-indigo-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-indigo-600" />}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade / Pro Banner */}
        <div className="mx-1 my-4 p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white relative overflow-hidden border border-indigo-900/50">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles size={12} /> Pro Plan Active
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium mb-3">
            ML engine running with 99.8% precision rate.
          </p>
          <Link 
            to="/subscription" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-xs transition-colors"
          >
            Manage Plan <ArrowRight size={12} />
          </Link>
        </div>

        {/* User Profile Footer */}
        <Link 
          to="/settings"
          className="pt-4 px-2 flex items-center gap-3 border-t border-slate-100 hover:bg-slate-50 transition-colors rounded-xl"
        >
          <img 
            src={userProfile.avatar} 
            alt={userProfile.name} 
            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">{userProfile.name}</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">{userProfile.role}</p>
          </div>
        </Link>
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 lg:ml-64 w-full flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-4 lg:px-8 z-40 border-b border-slate-200/60">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center flex-1">
              <div className="relative w-full group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search analytics, models, or datasets..." 
                  className="w-full bg-slate-100/80 hover:bg-slate-100 border border-transparent focus:border-indigo-300 focus:bg-white rounded-xl pl-10 pr-12 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs pointer-events-none hidden md:inline-block">
                  ⌘K
                </kbd>
              </div>
            </div>
            <span className="sm:hidden text-base font-extrabold text-slate-900">TrackWise</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Drawer Button */}
            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsGridOpen(false); }}
                className={`p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative ${isNotifOpen ? 'bg-slate-100 text-slate-900' : ''}`}
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 z-20"
                    >
                      <div className="flex items-center justify-between mb-3 px-1">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</h4>
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">3 New</span>
                      </div>
                      <div className="space-y-2">
                        {notifications.map((notif, i) => (
                          <div key={i} className="flex gap-3 p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                            <div className={`mt-0.5 p-2 rounded-lg ${notif.color} shrink-0`}>
                              <notif.icon size={15} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{notif.title}</p>
                              <p className="text-xs text-slate-500 leading-tight mt-0.5">{notif.text}</p>
                              <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-indigo-100">
                        View Activity Log
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Launch Module Grid */}
            <div className="relative">
              <button 
                onClick={() => { setIsGridOpen(!isGridOpen); setIsNotifOpen(false); }}
                className={`p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ${isGridOpen ? 'bg-slate-100 text-slate-900' : ''}`}
                aria-label="Quick Modules"
              >
                <Grid size={18} />
              </button>

              <AnimatePresence>
                {isGridOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGridOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 z-20"
                    >
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-slate-900">Quick Modules</h4>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Fast Access Tools</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2.5">
                        {quickActions.map((action, i) => (
                          <button 
                            key={i} 
                            onClick={() => setIsGridOpen(false)}
                            className="group flex flex-col items-center p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all text-center"
                          >
                            <div className={`p-2.5 rounded-xl ${action.color} text-white shadow-xs group-hover:scale-105 transition-transform`}>
                              <action.icon size={18} />
                            </div>
                            <span className="mt-2 text-xs font-bold text-slate-900">{action.label}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{action.desc}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                        <span>Workspace v3.4.0</span>
                        <span className="text-indigo-600 hover:underline cursor-pointer">Docs</span>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-5 w-px bg-slate-200 mx-1" />
            <Link 
              to="/settings" 
              className="flex items-center gap-2 hover:bg-slate-100 p-1.5 rounded-xl transition-colors"
              title="Profile Settings"
            >
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                referrerPolicy="no-referrer"
              />
              <span className="hidden md:inline-block text-xs font-bold text-slate-800">
                {userProfile.name.split(' ')[0] || 'User'}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

