import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bolt, UploadCloud, BrainCircuit, BarChart3, ShieldCheck, CheckCircle2, Globe, Share2, MessageSquare, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { IMAGES } from '../constants';

export default function Landing() {
  return (
    <div className="bg-[#f6fafe] font-sans text-[#171c1f] antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 z-50 bg-white/70 backdrop-blur-xl flex items-center px-8 md:px-16 justify-between border-b border-slate-100/50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#161c54] tracking-tighter">TrackWise</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <Link to="/dashboard" className="text-[#161c54] font-bold text-sm">Dashboard</Link>
          <a href="#" className="text-[#46464f] font-medium text-sm hover:text-[#161c54] transition-colors">Data</a>
          <Link to="/insights" className="text-[#46464f] font-medium text-sm hover:text-[#161c54] transition-colors">Insights</Link>
          <a href="#" className="text-[#46464f] font-medium text-sm hover:text-[#161c54] transition-colors">Subscription</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#46464f] hover:text-[#161c54] transition-colors">
            <Search size={20} />
          </button>
          <Link to="/login" className="bg-gradient-to-br from-[#161c54] to-[#2d336b] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-[#161c54]/10 transition-transform active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-24 px-8 md:px-16 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#161c54] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#006c49] rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-start gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[10px] font-bold tracking-widest uppercase"
          >
            <Bolt size={14} fill="currentColor" />
            Next-Gen ML Forecasting
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-[#161c54] leading-[1.1] tracking-tight max-w-4xl"
          >
            Turn Your Data Into Your <span className="text-[#006c49] italic">Competitive Edge</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#46464f] text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Experience high-stakes decision making powered by predictive intelligence. TrackWise transforms raw business metrics into an editorial-grade strategy dashboard.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link to="/login" className="bg-gradient-to-br from-[#161c54] to-[#2d336b] text-white px-8 py-4 rounded-lg font-bold text-base shadow-xl shadow-[#161c54]/20 flex items-center gap-3 group">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="bg-[#e4e9ed] text-[#161c54] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#dfe3e7] transition-colors">
              View Demo
            </button>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full mt-20 relative"
          >
            <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 relative overflow-hidden border border-slate-100">
              <img 
                src={IMAGES.HERO_DASHBOARD} 
                alt="Dashboard Preview" 
                className="w-full h-auto rounded-lg shadow-sm border border-slate-100"
                referrerPolicy="no-referrer"
              />
              {/* Floating Data Chip */}
              <div className="absolute bottom-16 right-16 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-slate-200/50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6cf8bb] flex items-center justify-center text-[#00714d]">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#46464f] uppercase tracking-wider">Revenue Forecast</p>
                    <p className="text-2xl font-extrabold text-[#161c54]">+24.8% YoY</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Client Logos */}
      <section className="py-12 bg-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[10px] font-bold text-[#46464f] uppercase tracking-[0.2em] mb-10">Trusted by Global Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-black">VOLTA</span>
            <span className="text-2xl font-black">KINETIC</span>
            <span className="text-2xl font-black">AETHER</span>
            <span className="text-2xl font-black">NEXUS</span>
            <span className="text-2xl font-black">ORBIT</span>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#161c54] mb-4">Precision Tools for Modern Analysts</h2>
          <p className="text-[#46464f] max-w-xl">Move beyond spreadsheets. Our engine provides the intellectual space needed for complex problem-solving.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature 1 */}
          <div className="md:col-span-4 bg-[#f0f4f8] p-8 rounded-xl flex flex-col justify-between group hover:shadow-lg transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#2d336b] text-white flex items-center justify-center mb-6">
                <UploadCloud size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#161c54] mb-3">Seamless Data Ingestion</h3>
              <p className="text-sm text-[#46464f] leading-relaxed">Drag and drop CSV or Excel files. Our AI automatically maps your schema and cleans outliers in milliseconds.</p>
            </div>
            <div className="mt-8 overflow-hidden rounded-lg shadow-sm border border-slate-200/50">
              <img 
                src={IMAGES.FEATURE_CSV} 
                alt="Data Ingestion" 
                className="w-full object-cover h-32 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="md:col-span-8 bg-gradient-to-br from-[#161c54] to-[#2d336b] p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center text-white overflow-hidden relative group">
            <div className="z-10 md:w-1/2">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                <BrainCircuit size={24} className="text-[#6ffbbe]" />
              </div>
              <h3 className="text-3xl font-extrabold mb-4">ML-Powered Predictive Intelligence</h3>
              <p className="text-[#979ddd] text-base leading-relaxed mb-8">Stop looking at what happened. Start seeing what will. Our proprietary algorithms identify seasonal trends and market shifts before they occur.</p>
              <button className="text-[#6ffbbe] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Explore Forecasting Models <ArrowRight size={18} />
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src={IMAGES.FEATURE_ML} 
                alt="ML Intelligence" 
                className="w-full h-64 object-cover rounded-lg shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-7 bg-[#f0f4f8] p-8 rounded-xl flex items-center gap-8 group hover:shadow-lg transition-shadow">
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-[#161c54] mb-3">Interactive Narratives</h3>
              <p className="text-sm text-[#46464f] leading-relaxed">Charts aren't just static images. Drill down into every data point, filter by segment, and export editorial-grade reports with one click.</p>
            </div>
            <div className="w-1/2 h-full bg-white rounded-lg p-4 shadow-sm border border-slate-200/5">
              <img 
                src={IMAGES.FEATURE_CHARTS} 
                alt="Interactive Charts" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-5 bg-[#6cf8bb]/10 p-8 rounded-xl border border-[#006c49]/10 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#006c49] text-white flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#161c54] mb-3">Enterprise-Grade Security</h3>
            <p className="text-sm text-[#46464f] leading-relaxed">SOC2 Type II compliant. Your proprietary data remains yours, encrypted at rest and in transit with bank-level protocols.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#161c54] mb-4">Investment in Insight</h2>
            <p className="text-[#46464f] max-w-xl mx-auto text-lg">Choose the tier that matches your firm's ambition. Flexible plans for high-growth teams.</p>
            
            <div className="flex items-center justify-center mt-10 gap-4">
              <span className="text-sm font-bold text-[#161c54]">Monthly</span>
              <button className="w-12 h-6 rounded-full bg-[#2d336b] relative p-1">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </button>
              <span className="text-sm font-medium text-[#46464f]">Yearly <span className="text-[#006c49] font-bold text-[10px] ml-1">SAVE 20%</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Professional Plan */}
            <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="text-sm font-bold text-[#46464f] uppercase tracking-widest mb-2">Professional</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-[#161c54]">$129</span>
                <span className="text-[#46464f] text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Up to 10M Data Rows",
                  "ML Trend Analysis",
                  "Custom Report Templates",
                  "API Access (10k calls)"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#46464f]">
                    <CheckCircle2 size={18} className="text-[#006c49]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-lg bg-[#e4e9ed] text-[#161c54] font-bold hover:bg-[#dfe3e7] transition-colors">
                Select Plan
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-[#161c54] to-[#2d336b] p-10 rounded-xl text-white shadow-2xl relative overflow-hidden flex flex-col hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 bg-[#006c49] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white rounded-bl-lg">Recommended</div>
              <h3 className="text-sm font-bold text-[#dfe0ff] uppercase tracking-widest mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold">$299</span>
                <span className="text-[#979ddd] text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited Data Ingestion",
                  "Real-time Forecasting",
                  "Priority Dedicated Analyst",
                  "White-label Dashboards",
                  "SSO & Advanced Security"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#dfe0ff]">
                    <CheckCircle2 size={18} className="text-[#6ffbbe]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-lg bg-[#006c49] text-white font-bold shadow-lg shadow-[#006c49]/20 hover:brightness-110 transition-all">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto bg-[#f0f4f8] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-slate-200/50">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#006c49]/5 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#161c54]/5 rounded-full blur-[80px]"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#161c54] mb-6 relative z-10">Ready to Master Your Market?</h2>
          <p className="text-[#46464f] text-lg max-w-2xl mx-auto mb-10 relative z-10">Join over 1,500 analytics-driven companies who rely on TrackWise to navigate their future.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/login" className="bg-gradient-to-br from-[#161c54] to-[#2d336b] text-white px-10 py-5 rounded-lg font-bold text-lg shadow-xl shadow-[#161c54]/20">
              Get Started Free
            </Link>
            <button className="bg-white text-[#161c54] px-10 py-5 rounded-lg font-bold text-lg border border-slate-200 hover:bg-[#f0f4f8] transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-8 md:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-black text-[#161c54] mb-6 block">TrackWise</span>
            <p className="text-sm text-[#46464f] leading-relaxed">Defining the standard for business intelligence through rigorous analysis and superior design.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#161c54] mb-6 text-sm">Platform</h4>
            <ul className="space-y-4 text-sm text-[#46464f]">
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Forecasting</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Data Engine</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#161c54] mb-6 text-sm">Resources</h4>
            <ul className="space-y-4 text-sm text-[#46464f]">
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Analyst Blog</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#161c54] mb-6 text-sm">Legal</h4>
            <ul className="space-y-4 text-sm text-[#46464f]">
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#161c54] transition-colors">Security Audit</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-[#46464f] tracking-widest uppercase">© 2024 TrackWise. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[#46464f] hover:text-[#161c54]"><Globe size={18} /></a>
            <a href="#" className="text-[#46464f] hover:text-[#161c54]"><Share2 size={18} /></a>
            <a href="#" className="text-[#46464f] hover:text-[#161c54]"><MessageSquare size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
