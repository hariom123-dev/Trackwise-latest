import React, { useState, useMemo } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, ArrowRight, MessageSquare, Share2, Bookmark, Maximize2, FileText, Heart, X, Search, Filter, Calendar, TrendingUp, Download, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Insight {
  id: string;
  title: string;
  desc: string;
  fullContent?: string;
  tag: string;
  image: string;
  author: string;
  avatar: string;
  confidence: number;
  date: string;
  likes: number;
  comments: number;
}

const INSIGHTS_DATA: Insight[] = [
  {
    id: '1',
    title: 'EMEA Expansion Opportunity',
    desc: 'Unsaturated demand in DACH region for enterprise analytics tools.',
    fullContent: 'Our multi-vector analysis indicates a significant gap in localized enterprise analytics within the DACH region (Germany, Austria, Switzerland). Competitors currently lack GDPR-compliant private cloud deployments which are highly valued in this sector. Recommended entry strategy: Strategic partnership with local MSPs.',
    tag: 'Market Entry',
    image: IMAGES.INSIGHTS_VISUAL,
    author: 'Sarah Chen',
    avatar: IMAGES.INSIGHTS_PROFILE,
    confidence: 89,
    date: 'Oct 24, 2024',
    likes: 124,
    comments: 18
  },
  {
    id: '2',
    title: 'Retention Optimization',
    desc: 'Personalized onboarding flows could reduce early-stage churn by 22%.',
    fullContent: 'By analyzing user drop-off points in the first 7 days, we have identified that the technical setup phase is the primary friction point. Implementing an "Automated Configuration Wizard" could bridge this gap. Expected impact is a 22% reduction in Day-30 churn.',
    tag: 'Product',
    image: IMAGES.FEATURE_CHARTS,
    author: 'Alex Sterling',
    avatar: IMAGES.USER_PROFILE,
    confidence: 94,
    date: 'Oct 22, 2024',
    likes: 256,
    comments: 42
  },
  {
    id: '3',
    title: 'Infrastructure Efficiency',
    desc: 'Cloud compute costs projected to rise. Optimization recommended.',
    fullContent: 'Global server costs are trending upwards by 8% quarterly. Our analysis suggests that migrating non-critical legacy workloads to ARM-based instances could reduce compute overhead by $12k/month without impacting SLA benchmarks.',
    tag: 'Operations',
    image: IMAGES.FEATURE_ML,
    author: 'System AI',
    avatar: IMAGES.INSIGHTS_PROFILE,
    confidence: 97,
    date: 'Oct 20, 2024',
    likes: 89,
    comments: 5
  },
  {
    id: '4',
    title: 'AI Feature Prioritization',
    desc: 'Users are searching for predictive resource allocation tool.',
    fullContent: 'Search query analysis within the product dashboard shows a 300% spike in users looking for "Resource Forecasting." Building this as a high-tier feature could drive a 12% expansion in ARPU.',
    tag: 'Product',
    image: IMAGES.INSIGHTS_VISUAL,
    author: 'David Park',
    avatar: IMAGES.USER_PROFILE,
    confidence: 82,
    date: 'Oct 18, 2024',
    likes: 167,
    comments: 24
  }
];

export default function Insights() {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [filterTag, setFilterTag] = useState('All');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedInsights, setSavedInsights] = useState<Set<string>>(new Set());
  const [likedInsights, setLikedInsights] = useState<Set<string>>(new Set());

  const tags = ['All', 'Market Entry', 'Product', 'Operations'];

  const filteredInsights = useMemo(() => {
    if (filterTag === 'All') return INSIGHTS_DATA;
    return INSIGHTS_DATA.filter(i => i.tag === filterTag);
  }, [filterTag]);

  const toggleSave = (id: string) => {
    setSavedInsights(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info('Removed from saved insights');
      } else {
        next.add(id);
        toast.success('Insight saved for later');
      }
      return next;
    });
  };

  const toggleLike = (id: string) => {
    setLikedInsights(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        toast.success('Thanks for the feedback!');
      }
      return next;
    });
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2500)),
      {
        loading: 'Scanning global market trends...',
        success: 'New strategy signals detected!',
        error: 'Engine timeout',
      }
    );
    setTimeout(() => setIsAnalyzing(false), 2600);
  };

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(`Check out this business insight from TrackWise: ${title}`);
    toast.success('Share link copied to clipboard');
  };

  const handleExportPDF = async () => {
    const loadingToast = toast.loading('Generating strategic PDF...');
    const element = document.getElementById('insights-report');
    if (!element) {
      toast.dismiss(loadingToast);
      return;
    }

    try {
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
      pdf.save(`TrackWise-Strategic-Report-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('Strategic report exported successfully', { id: loadingToast });
    } catch (err) {
      toast.error('Export failed. Please try again.', { id: loadingToast });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-amber-500 animate-pulse" size={20} />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">AI-Generated Strategy</span>
          </div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight">Market Intelligence</h1>
          <p className="text-slate-500 font-medium">Deep-dive analysis powered by TrackWise's ML engine.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={handleExportPDF}
            className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <FileText size={18} className="group-hover:rotate-6 transition-transform" />
            Export Report
          </button>
          <button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-900 text-white rounded-2xl text-sm font-bold hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/20 active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? <BrainCircuit size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {isAnalyzing ? 'Analyzing...' : 'Run New Scan'}
          </button>
        </div>
      </div>

      {/* Featured Insight */}
      <div id="insights-report" className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#161c54] to-[#2d336b] rounded-[3rem] overflow-hidden shadow-2xl relative group border border-indigo-950"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute top -10 right -10 w-96 h-96 bg-[#6cf8bb] rounded-full blur-[120px] animate-pulse"></div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-8 md:p-14 lg:p-16 text-white z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#6ffbbe] text-[10px] font-black tracking-[0.2em] uppercase mb-10 border border-white/5">
                Priority Signal #042
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
                The Fatigue Shift: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ffbbe] to-[#a0fce0] italic">Strategic Pivot Required</span>
              </h2>
              <p className="text-[#979ddd] text-xl mb-12 leading-relaxed max-w-2xl font-medium">
                Our analysis indicates a 15% increase in churn sensitivity across the mid-market segment. We recommend transitioning from flat-rate pricing to a usage-based architecture by Q3 to maximize lifetime value.
              </p>
              
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={() => toast.success('Opening implementation roadmap...')}
                  className="bg-[#6ffbbe] text-[#161c54] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-3 group border-b-4 border-[#4ec795] active:border-b-0 active:translate-y-1 transition-all"
                >
                  View Strategy
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95"
                >
                  Download Analysis
                </button>
              </div>
            </div>
            
            <div className="lg:w-[480px] bg-white/5 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center border-l border-white/10 relative z-10">
              <div className="space-y-10">
                <div className="bg-indigo-400/10 p-8 rounded-3xl border border-white/10 group-hover:border-[#6ffbbe]/30 transition-colors">
                  <p className="text-xs font-bold text-[#b4b9e9] uppercase tracking-[0.2em] mb-4">Signal Confidence</p>
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-black text-[#6ffbbe] tracking-tighter">94%</span>
                    <div className="mb-2">
                      <div className="flex gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-4 h-1 rounded-full bg-[#6ffbbe]" />)}
                      </div>
                      <span className="text-[10px] font-bold text-[#6ffbbe] uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <p className="text-xs font-bold text-[#b4b9e9] uppercase tracking-[0.2em]">Catalyst Monitoring</p>
                  {[
                    { label: 'Macro-economic Volatility', trend: '+12%' },
                    { label: 'Competitor Price Indexing', trend: 'Global' },
                    { label: 'User Engagement Decay', trend: 'Critical' }
                  ].map((driver, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#6ffbbe] shadow-[0_0_10px_#6ffbbe]" />
                        <span className="text-sm font-semibold text-white">{driver.label}</span>
                      </div>
                      <span className="text-[10px] font-black text-[#6ffbbe] bg-[#6ffbbe]/10 px-2 py-1 rounded-md">{driver.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto invisible-scrollbar">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filterTag === tag 
                    ? 'bg-indigo-900 text-white shadow-lg shadow-indigo-900/10' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-indigo-500/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((insight) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={insight.id} 
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="h-56 relative overflow-hidden cursor-pointer" onClick={() => setSelectedInsight(insight)}>
                  <img 
                    src={insight.image} 
                    alt={insight.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-white text-xs font-bold flex items-center gap-2">
                      <TrendingUp size={14} />
                      Read Full Analysis
                    </span>
                  </div>
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black text-indigo-900 uppercase tracking-widest shadow-lg">
                      {insight.tag}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(insight.id);
                    }}
                    className={`absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl backdrop-blur-md transition-all ${
                      savedInsights.has(insight.id) 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                        : 'bg-white/90 text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    <Bookmark size={18} fill={savedInsights.has(insight.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={12} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{insight.date}</span>
                  </div>
                  <h3 
                    onClick={() => setSelectedInsight(insight)}
                    className="text-2xl font-bold text-indigo-900 mb-4 group-hover:text-indigo-600 transition-colors cursor-pointer leading-tight h-14 line-clamp-2"
                  >
                    {insight.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 line-clamp-3">{insight.desc}</p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={insight.avatar} alt={insight.author} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-50" referrerPolicy="no-referrer" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                      </div>
                      <div>
                        <span className="block text-xs font-black text-indigo-900">{insight.author}</span>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Analyst</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleLike(insight.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${likedInsights.has(insight.id) ? 'bg-rose-50 text-rose-600' : 'hover:bg-slate-50 text-slate-400'}`}
                      >
                        <Heart size={14} fill={likedInsights.has(insight.id) ? "currentColor" : "none"} />
                        <span className="text-[10px] font-black">{likedInsights.has(insight.id) ? insight.likes + 1 : insight.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleShare(insight.title)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInsight(null)}
              className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedInsight(null)}
                className="absolute top-8 right-8 z-10 p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-2xl transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="h-64 relative">
                <img 
                  src={selectedInsight.image} 
                  alt={selectedInsight.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent p-12 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase mb-4 border border-white/10 w-fit">
                    {selectedInsight.tag}
                  </div>
                  <h2 className="text-4xl font-black text-white leading-tight">{selectedInsight.title}</h2>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-10">
                  <div className="flex items-center gap-4">
                    <img src={selectedInsight.avatar} alt={selectedInsight.author} className="w-14 h-14 rounded-3xl object-cover shadow-lg" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-sm font-black text-indigo-900">{selectedInsight.author}</p>
                      <p className="text-xs font-bold text-slate-400">Senior Market Analyst • {selectedInsight.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl flex items-center gap-3 border border-emerald-100">
                      <CheckCircle2 size={24} />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-tighter">Confidence Index</p>
                        <p className="text-xl font-black leading-none">{selectedInsight.confidence}%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-indigo-900 font-black uppercase tracking-widest text-xs mb-6">
                        <Lightbulb size={18} className="text-amber-500" />
                        Strategic Analysis
                      </h4>
                      <div className="text-slate-600 text-lg leading-relaxed font-medium">
                        {selectedInsight.fullContent}
                        <br /><br />
                        Our ML models have indexed over 4.2M relevant market signals to compile this recommendation. The DACH region represents a specific multi-trillion dollar market that is currently under-served by modern SaaS architectures.
                      </div>
                    </div>
                    
                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic font-medium text-slate-500">
                      "This insight represents a critical branching point for the Q4 roadmap. Implementation feasibility is rated at 8.2/10 based on current engineering capacity."
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-indigo-900 font-black uppercase tracking-widest text-xs">Action Items</h4>
                      {[
                        'Conduct user sentiment surveys',
                        'Audit current cost structure',
                        'Map DACH compliance reqs',
                        'Pilot V2 pricing engine'
                      ].map((action, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-colors">
                          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 flex items-center justify-center text-transparent hover:bg-indigo-900 hover:text-white transition-all cursor-pointer">
                            <CheckCircle2 size={12} />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{action}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => toast.success('Insight added to shared workspace')}
                      className="w-full flex items-center justify-center gap-3 p-5 bg-indigo-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/20"
                    >
                      <Share2 size={18} />
                      Share Analysis
                    </button>
                    <button 
                      onClick={handleExportPDF}
                      className="w-full flex items-center justify-center gap-3 p-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      <Download size={18} />
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
