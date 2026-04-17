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
    <div className="min-h-screen bg-[#f6fafe] flex flex-col md:flex-row font-sans text-[#171c1f]">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-900 transition-colors mb-12 font-medium text-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <h1 className="text-4xl font-extrabold text-indigo-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mb-10 font-medium">Access your predictive intelligence dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 ring-indigo-500/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-700 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 ring-indigo-500/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-br from-[#161c54] to-[#2d336b] text-white py-4 rounded-xl font-bold shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-3 group active:scale-[0.98] transition-all"
            >
              Sign In to TrackWise
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-200">
            <p className="text-center text-sm text-slate-500 font-medium">
              Don't have an account? <Link to="#" className="text-indigo-700 font-bold hover:underline">Start 14-day free trial</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#161c54] to-[#2d336b] relative overflow-hidden items-center justify-center p-24">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6cf8bb] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl mb-12">
            <img 
              src={IMAGES.HERO_DASHBOARD} 
              alt="Dashboard Preview" 
              className="w-full rounded-xl shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">"TrackWise has fundamentally changed how we allocate capital."</h2>
          <p className="text-indigo-200 font-medium">— Sarah Chen, CFO at Kinetic Global</p>
        </div>
      </div>
    </div>
  );
}
