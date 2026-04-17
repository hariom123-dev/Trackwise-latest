import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Database, label: 'Data', path: '/data' },
    { icon: Lightbulb, label: 'Insights', path: '/insights' },
    { icon: CreditCard, label: 'Subscription', path: '/subscription' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const quickActions = [
    { icon: Database, label: 'Data Lab', desc: 'Manage datasets', color: 'bg-blue-500' },
    { icon: TrendingUp, label: 'ML Models', desc: 'Predictive tools', color: 'bg-indigo-500' },
    { icon: FileText, label: 'Reports', desc: 'Export analytics', color: 'bg-emerald-500' },
    { icon: BarChart, label: 'Visualizer', desc: 'Dynamic charts', color: 'bg-rose-500' },
    { icon: Briefcase, label: 'Portfolio', desc: 'Assets overview', color: 'bg-amber-500' },
    { icon: Search, label: 'Discovery', desc: 'Explore trends', color: 'bg-violet-500' },
  ];

  const notifications = [
    { title: 'Goal Reached', text: 'You hit your monthly revenue target.', time: '2m ago', icon: TrendingUp, color: 'text-emerald-500' },
    { title: 'New Insight', text: 'ML suggests optimizing churn rate.', time: '1h ago', icon: Lightbulb, color: 'text-indigo-500' },
    { title: 'System Update', text: 'TrackWise v3.4 is now live.', time: '3h ago', icon: Settings, color: 'text-slate-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6fafe] font-sans text-[#171c1f]">
      {/* Overlay for mobile sidebar */}
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

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-200/50 flex flex-col py-6 px-4 z-[70] transition-transform duration-300 transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 px-2 flex justify-between items-center">
          <div>
            <Link to="/" className="text-xl font-bold text-indigo-900 tracking-tight">TrackWise</Link>
            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Premium Analyst</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'text-indigo-900 font-bold border-r-4 border-indigo-900 bg-white shadow-sm' 
                    : 'text-slate-500 font-medium hover:bg-slate-200/50'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 px-2 flex items-center gap-3 border-t border-slate-200/50">
          <img 
            src={location.pathname === '/insights' ? IMAGES.INSIGHTS_PROFILE : IMAGES.USER_PROFILE} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-indigo-900 truncate">Alex Sterling</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Lead Strategist</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 w-full">
        {/* Top Header */}
        <header className="sticky top-0 h-16 bg-white/70 backdrop-blur-md flex justify-between items-center px-4 lg:px-8 z-40 border-b border-slate-100/50">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center flex-1 max-w-xl">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search analytics..." 
                  className="w-full bg-[#dfe3e7] border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 ring-indigo-500/20 transition-all outline-none"
                />
              </div>
            </div>
            {/* Mobile Title - only visible when search is hidden */}
            <span className="sm:hidden text-lg font-bold text-indigo-900">TrackWise</span>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6">
            {/* Notification Button */}
            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsGridOpen(false); }}
                className={`p-2 rounded-xl transition-all ${isNotifOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-20"
                    >
                      <h4 className="font-bold text-indigo-900 mb-4 px-2">Notifications</h4>
                      <div className="space-y-3">
                        {notifications.map((notif, i) => (
                          <div key={i} className="flex gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                            <div className={`mt-0.5 p-2 rounded-lg bg-indigo-50 ${notif.color}`}>
                              <notif.icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-indigo-900">{notif.title}</p>
                              <p className="text-xs text-slate-500 leading-tight">{notif.text}</p>
                              <p className="text-[10px] text-slate-400 mt-1 font-medium italic">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        View All Activity
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Grid Button (Quick Launch) */}
            <div className="relative">
              <button 
                onClick={() => { setIsGridOpen(!isGridOpen); setIsNotifOpen(false); }}
                className={`p-2 rounded-xl transition-all ${isGridOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Grid size={20} />
              </button>

              <AnimatePresence>
                {isGridOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGridOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-20"
                    >
                      <div className="mb-6">
                        <h4 className="text-lg font-black text-indigo-900 tracking-tight">Quick Launch</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Application Modules</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {quickActions.map((action, i) => (
                          <button 
                            key={i} 
                            onClick={() => setIsGridOpen(false)}
                            className="group flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-all text-center border border-transparent hover:border-slate-100"
                          >
                            <div className={`p-3 rounded-2xl ${action.color} text-white shadow-lg shadow-indigo-500/5 group-hover:scale-110 transition-transform`}>
                              <action.icon size={20} />
                            </div>
                            <span className="mt-3 text-[13px] font-bold text-indigo-900">{action.label}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{action.desc}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-500">
                        <span>Workspace V2.4.0</span>
                        <ArrowRight size={14} className="opacity-40" />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2" />
            <span className="hidden md:block text-2xl font-black text-indigo-900 tracking-tighter">TrackWise</span>
          </div>
        </header>

        <main className="p-4 lg:p-8 max-w-[1600px] mx-auto overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
