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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="text-amber-500" size={16} />
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">AI Signal Processing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Market Intelligence & Signals</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Automated trend detection, risk signals, and competitive benchmarks.</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={handleExportPDF}
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs active:scale-95"
          >
            <FileText size={15} className="text-slate-500" />
            <span>Export Report</span>
          </button>
          <button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-950 transition-all shadow-xs active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? <BrainCircuit size={15} className="animate-spin" /> : <Sparkles size={15} />}
            <span>{isAnalyzing ? 'Scanning Signals...' : 'Run Intelligence Scan'}</span>
          </button>
        </div>
      </div>

      {/* Featured Insight */}
      <div id="insights-report" className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-6 md:p-10 text-white z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-[10px] font-bold tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Priority Signal #042
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                The Fatigue Shift: Strategic Pivot to Usage-Based Architecture
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed max-w-2xl font-normal">
                Analysis indicates a 15% increase in churn sensitivity across mid-market enterprise tiers. We recommend transitioning from flat-rate pricing to a tiered usage model by Q3 to optimize expansion revenue.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => toast.success('Opening implementation roadmap...')}
                  className="bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-300 active:scale-95 transition-all"
                >
                  <span>View Strategy Roadmap</span>
                  <ArrowRight size={15} />
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-700 transition-all active:scale-95"
                >
                  Download PDF Brief
                </button>
              </div>
            </div>
            
            <div className="lg:w-[400px] bg-slate-950/80 p-6 md:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-800 z-10">
              <div className="space-y-6">
                <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Signal Confidence Score</p>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-black text-emerald-400 tracking-tight">94%</span>
                    <div className="mb-1">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-3 h-1 rounded-full bg-emerald-400" />)}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Verified Model</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monitored Drivers</p>
                  {[
                    { label: 'Macro Volatility Index', trend: '+12%' },
                    { label: 'Competitor Price Parity', trend: 'Global' },
                    { label: 'Feature Engagement Decay', trend: 'High' }
                  ].map((driver, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-xs font-medium text-slate-200">{driver.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">{driver.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto invisible-scrollbar">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterTag === tag 
                    ? 'bg-indigo-900 text-white shadow-2xs' 
                    : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter signals..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((insight) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                key={insight.id} 
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col group hover:border-slate-300 transition-all hover:-translate-y-1"
              >
                <div className="h-48 relative overflow-hidden cursor-pointer" onClick={() => setSelectedInsight(insight)}>
                  <img 
                    src={insight.image} 
                    alt={insight.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-2xs">
                      {insight.tag}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(insight.id);
                    }}
                    className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg backdrop-blur-md transition-all ${
                      savedInsights.has(insight.id) 
                        ? 'bg-amber-500 text-white shadow-2xs' 
                        : 'bg-white/90 text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    <Bookmark size={15} fill={savedInsights.has(insight.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={12} className="text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-400">{insight.date}</span>
                  </div>
                  <h3 
                    onClick={() => setSelectedInsight(insight)}
                    className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {insight.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">{insight.desc}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={insight.avatar} alt={insight.author} className="w-7 h-7 rounded-lg object-cover border border-slate-200" referrerPolicy="no-referrer" />
                      <div>
                        <span className="block text-xs font-bold text-slate-800 leading-none">{insight.author}</span>
                        <span className="block text-[10px] font-semibold text-slate-400 mt-0.5">Analyst</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => toggleLike(insight.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs font-semibold ${likedInsights.has(insight.id) ? 'bg-rose-50 text-rose-600' : 'hover:bg-slate-50 text-slate-400'}`}
                      >
                        <Heart size={13} fill={likedInsights.has(insight.id) ? "currentColor" : "none"} />
                        <span>{likedInsights.has(insight.id) ? insight.likes + 1 : insight.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleShare(insight.title)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"
                      >
                        <Share2 size={13} />
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
