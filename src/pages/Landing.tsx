import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  UploadCloud, 
  BrainCircuit, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Share2, 
  MessageSquare, 
  Search,
  Zap,
  TrendingUp,
  Layers,
  Lock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { IMAGES } from '../constants';

export default function Landing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-indigo-500/10 selection:text-indigo-900">
      {/* Floating Navigation Bar */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-6xl mx-auto">
        <nav className="bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs rounded-2xl h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black shadow-xs">
              <Sparkles size={16} className="text-emerald-400" />
            </div>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">TrackWise</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors">Dashboard</Link>
            <Link to="/data" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Data Lab</Link>
            <Link to="/insights" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Insights</Link>
            <Link to="/subscription" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-indigo-900 font-bold">TrackWise v3.4</span>
            <span className="text-slate-300">•</span>
            <span>Next-Gen ML Forecasting Engine</span>
            <ChevronRight size={12} className="text-slate-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.08] tracking-tight"
          >
            Turn Your Business Data Into Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-950">Competitive Advantage</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
          >
            High-stakes decision making powered by predictive ML intelligence. TrackWise transforms raw financial and operational metrics into an editorial-grade strategy dashboard.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <Link 
              to="/dashboard" 
              className="bg-indigo-900 hover:bg-indigo-950 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-900/15 flex items-center justify-center gap-2.5 active:scale-95 transition-all"
            >
              Start Free 14-Day Trial
              <ArrowRight size={16} />
            </Link>
            <Link 
              to="/insights" 
              className="bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2"
            >
              Explore Live Insights
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Frame Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden">
            {/* Mock Window Controls */}
            <div className="bg-slate-100/80 border-b border-slate-200/60 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-semibold text-slate-500 shadow-2xs">
              </div>
              <div className="w-12" />
            </div>

            <div className="p-2 sm:p-4 bg-slate-50">
              <img 
                src={IMAGES.HERO_DASHBOARD} 
                alt="TrackWise Dashboard Preview" 
                className="w-full rounded-xl border border-slate-200/70 shadow-xs"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Floating Metric Callout */}
          <div className="absolute -bottom-6 right-6 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Revenue Forecast</p>
              <p className="text-lg font-black text-slate-900">+24.8% YoY Projected</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges Bar */}
      <section className="py-12 bg-white border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by 1,500+ High-Growth Finance & Strategy Teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 opacity-60 font-black text-slate-400 tracking-wider text-xl">
            <span>VOLTA</span>
            <span>KINETIC</span>
            <span>AETHER</span>
            <span>NEXUS</span>
            <span>ORBIT</span>
          </div>
        </div>
      </section>

      {/* Features Bento Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Layers size={14} /> Core Modules
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Precision & Clarity
          </h2>
          <p className="text-slate-600 text-sm font-medium leading-relaxed">
            Move beyond static spreadsheets. Our intelligent analytical workspace gives you the clarity required to execute complex financial strategies.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-5 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between group hover:border-indigo-200 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-6">
                <UploadCloud size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Data Ingestion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Drag & drop CSV or Excel files. TrackWise automatically parses schemas, cleans outliers, and normalizes time series data in milliseconds.
              </p>
            </div>
            <div className="mt-8 rounded-xl overflow-hidden border border-slate-100 shadow-2xs">
              <img 
                src={IMAGES.FEATURE_CSV} 
                alt="CSV Ingestion" 
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-7 bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group">
            <div className="z-10 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center mb-6 backdrop-blur-xs">
                <BrainCircuit size={20} />
              </div>
              <h3 className="text-2xl font-bold mb-3">ML-Powered Predictive Analytics</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                Proprietary predictive algorithms identify seasonal volatility, CAC trends, and market shifts before they impact your balance sheet.
              </p>
              <Link to="/data" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                Run Model Diagnostics <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 relative z-10">
              <img 
                src={IMAGES.FEATURE_ML} 
                alt="Predictive Graph" 
                className="w-full h-48 object-cover rounded-xl border border-slate-800 shadow-xl group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-800 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-extrabold text-emerald-400">$1.4M Projected Growth</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center gap-6 group hover:border-indigo-200 transition-all">
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dynamic Visual Narratives</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter by segment, drill down into granular KPIs, and export presentation-ready PDF reports with a single click.
              </p>
            </div>
            <div className="w-full sm:w-48 h-36 bg-slate-50 rounded-xl border border-slate-100 p-2 overflow-hidden shrink-0">
              <img 
                src={IMAGES.FEATURE_CHARTS} 
                alt="Interactive Charts" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-5 bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-6">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">SOC2 Type II Enterprise Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank-grade encryption in transit and at rest. Your proprietary dataset remains confidential and is never used to train public LLMs.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <Lock size={14} /> Encrypted & Compliant
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Transparent Pricing Plans</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Choose the tier that matches your organization's analytical scope.</p>

            <div className="inline-flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl mt-6 border border-slate-200/60">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isAnnual ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${isAnnual ? 'bg-indigo-900 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Annual <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Professional</span>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">{isAnnual ? '$99' : '$129'}</span>
                  <span className="text-slate-500 text-xs font-medium">/ month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Up to 10M Data Rows",
                    "ML Trend & Churn Analysis",
                    "Custom PDF Report Export",
                    "Standard API Access (10k calls/mo)",
                    "Email & Chat Support"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to="/subscription" 
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold text-center transition-colors block"
              >
                Select Professional
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block mb-2">Enterprise</span>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{isAnnual ? '$225' : '$299'}</span>
                  <span className="text-slate-400 text-xs font-medium">/ month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited Data Row Processing",
                    "Real-Time ML Forecasting Engine",
                    "White-Label Executive Dashboards",
                    "Dedicated Senior Analyst Support",
                    "SSO & SOC2 Enterprise Compliance",
                    "24/7 Priority SLA"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to="/subscription" 
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold text-center transition-colors block shadow-md"
              >
                Start Enterprise Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-xl border border-indigo-900/50">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Ready to Master Your Business Strategy?</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Join over 1,500 analytics-driven organizations who rely on TrackWise for reliable predictive foresight.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              to="/login" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Start Free 14-Day Trial
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-xs transition-colors"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 text-xs font-medium text-slate-500">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                <Sparkles size={12} className="text-emerald-400" />
              </div>
              <span className="text-base font-extrabold text-slate-900">TrackWise</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-4">
              Setting the standard for predictive business intelligence through rigorous algorithms and handcrafted interface design.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link></li>
              <li><Link to="/data" className="hover:text-slate-900 transition-colors">Data Lab</Link></li>
              <li><Link to="/insights" className="hover:text-slate-900 transition-colors">ML Insights</Link></li>
              <li><Link to="/subscription" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Security Whitepaper</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About TrackWise</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <p>© 2026 TrackWise Inc. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

