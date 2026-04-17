import React from 'react';
import { Sparkles, BrainCircuit, Lightbulb, ArrowRight, MessageSquare, Share2, Bookmark, Maximize2, FileText } from 'lucide-react';
import { IMAGES } from '../constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Insights() {
  const handleExportPDF = async () => {
    const element = document.getElementById('insights-report');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#f6fafe'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`TrackWise-Insights-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-amber-500" size={20} />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">AI-Generated Strategy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Market Intelligence</h1>
          <p className="text-slate-500 font-medium">Deep-dive analysis powered by TrackWise's ML engine.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <FileText size={16} />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Bookmark size={16} />
            Saved
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-800 transition-colors shadow-lg shadow-indigo-900/10">
            <BrainCircuit size={16} />
            Run New Analysis
          </button>
        </div>
      </div>

      {/* Featured Insight */}
      <div id="insights-report" className="space-y-8">
        <div className="bg-gradient-to-br from-[#161c54] to-[#2d336b] rounded-[2rem] overflow-hidden shadow-2xl relative group">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-[#6cf8bb] rounded-full blur-[100px]"></div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-8 md:p-12 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#6ffbbe] text-[10px] font-bold tracking-widest uppercase mb-8">
                Priority Insight #042
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                The "Subscription Fatigue" Shift: <span className="text-[#6ffbbe] italic">Strategic Pivot Required</span>
              </h2>
              <p className="text-[#979ddd] text-lg mb-10 leading-relaxed max-w-2xl">
                Our models indicate a 15% increase in churn sensitivity across the mid-market segment. We recommend transitioning from flat-rate pricing to a usage-based architecture by Q3 to maintain LTV.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#6ffbbe] text-[#161c54] px-8 py-4 rounded-xl font-bold flex items-center gap-3 group">
                  View Implementation Plan
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                  Download Full Report
                </button>
              </div>
            </div>
            
            <div className="lg:w-[450px] bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-center border-l border-white/10">
              <div className="space-y-8">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-[#979ddd] uppercase tracking-widest mb-4">Confidence Score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-[#6ffbbe]">94%</span>
                    <span className="text-sm font-bold text-[#979ddd] mb-2">High Reliability</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs font-bold text-[#979ddd] uppercase tracking-widest">Key Drivers</p>
                  {[
                    'Macro-economic volatility',
                    'Competitor price indexing',
                    'User engagement decay'
                  ].map((driver, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6ffbbe]" />
                      {driver}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'EMEA Expansion Opportunity',
              desc: 'Unsaturated demand in DACH region for enterprise analytics tools.',
              tag: 'Market Entry',
              image: IMAGES.INSIGHTS_VISUAL,
              author: 'Sarah Chen',
              avatar: IMAGES.INSIGHTS_PROFILE
            },
            {
              title: 'Retention Optimization',
              desc: 'Personalized onboarding flows could reduce early-stage churn by 22%.',
              tag: 'Product',
              image: IMAGES.FEATURE_CHARTS,
              author: 'Alex Sterling',
              avatar: IMAGES.USER_PROFILE
            },
            {
              title: 'Infrastructure Efficiency',
              desc: 'Cloud compute costs projected to rise. Optimization recommended.',
              tag: 'Operations',
              image: IMAGES.FEATURE_ML,
              author: 'System AI',
              avatar: IMAGES.INSIGHTS_PROFILE
            }
          ].map((insight, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={insight.image} 
                  alt={insight.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-indigo-900 uppercase tracking-widest shadow-sm">
                  {insight.tag}
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-lg text-slate-600 hover:text-indigo-900 transition-colors shadow-sm">
                  <Maximize2 size={16} />
                </button>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-indigo-700 transition-colors">{insight.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">{insight.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={insight.avatar} alt={insight.author} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <span className="text-xs font-bold text-slate-600">{insight.author}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <button className="hover:text-indigo-600 transition-colors"><MessageSquare size={16} /></button>
                    <button className="hover:text-indigo-600 transition-colors"><Share2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
