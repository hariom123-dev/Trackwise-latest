import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12">
        <div className="max-w-sm w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10 font-bold text-xs">
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mb-8 text-xs font-medium">Access your enterprise predictive intelligence workspace.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-700 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-900 text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-indigo-900/15 flex items-center justify-center gap-2 hover:bg-indigo-950 active:scale-95 transition-all mt-2"
            >
              <span>Sign In to TrackWise</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200/80 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Don't have an enterprise account? <Link to="#" className="text-indigo-700 font-bold hover:underline">Start 14-day free trial</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden md:flex flex-1 bg-slate-900 relative overflow-hidden items-center justify-center p-16 border-l border-slate-800">
        <div className="relative z-10 text-center max-w-md">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shadow-xl mb-8">
            <img 
              src={IMAGES.HERO_DASHBOARD} 
              alt="Dashboard Preview" 
              className="w-full rounded-xl border border-slate-800"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-xl font-bold text-white mb-3 tracking-tight">"TrackWise has fundamentally changed how we forecast capital allocation."</h2>
          <p className="text-slate-400 text-xs font-semibold">— Sarah Chen, CFO at Kinetic Global</p>
        </div>
      </div>
    </div>
  );
}
