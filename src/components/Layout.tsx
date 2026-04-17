import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Lightbulb, CreditCard, Settings, Bell, Grid, Search, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Database, label: 'Data', path: '/data' },
    { icon: Lightbulb, label: 'Insights', path: '/insights' },
    { icon: CreditCard, label: 'Subscription', path: '/subscription' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6fafe] font-sans text-[#171c1f]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-200/50 flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-2">
          <Link to="/" className="text-xl font-bold text-indigo-900 tracking-tight">TrackWise</Link>
          <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Premium Analyst</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'text-indigo-900 font-bold border-r-4 border-indigo-900 bg-white/50' 
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
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="sticky top-0 h-16 bg-white/70 backdrop-blur-md flex justify-between items-center px-8 z-40 border-b border-slate-100/50">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="w-full bg-[#dfe3e7] border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 ring-indigo-500/20 transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-500 hover:text-indigo-700 transition-colors">
              <Bell size={20} />
            </button>
            <button className="text-slate-500 hover:text-indigo-700 transition-colors">
              <Grid size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <span className="text-2xl font-black text-indigo-900 tracking-tighter">TrackWise</span>
          </div>
        </header>

        <main className="p-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
