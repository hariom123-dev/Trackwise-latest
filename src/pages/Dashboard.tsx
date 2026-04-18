import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  Filter, 
  Download, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  X,
  FileText,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
  Lightbulb,
  Check
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  parseISO 
} from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IMAGES } from '../constants';
import { getAnalysisHistory, AnalysisHistory } from '../services/history';

type TimeRange = '7d' | '30d' | '90d' | '12m';

export default function Dashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisHistory | null>(null);

  useEffect(() => {
    setHistory(getAnalysisHistory());
  }, []);

  const getStats = () => {
    // Generate modified stats based on timeRange
    const multiplier = timeRange === '7d' ? 0.8 : timeRange === '90d' ? 1.4 : timeRange === '12m' ? 3.2 : 1.0;
    
    return [
      { label: 'Total Revenue', value: `$${(4281940 * multiplier).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
      { label: 'Active Users', value: (84231 * multiplier).toLocaleString(undefined, { maximumFractionDigits: 0 }), change: '+8.2%', trend: 'up', icon: Users, color: 'bg-blue-50 text-blue-600' },
      { label: 'Conversion Rate', value: '3.42%', change: '-0.4%', trend: 'down', icon: Activity, color: 'bg-amber-50 text-amber-600' },
      { label: 'Avg. Session', value: '4m 32s', change: '+1.2%', trend: 'up', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
    ];
  };

  const handleExport = async () => {
    if (!dashboardRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f6fafe',
        // Exclude UI elements that shouldn't be in the PDF
        ignoreElements: (el) => el.classList.contains('no-export')
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`TrackWise-Dashboard-Export-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const stats = getStats();

  const timeRangeOptions = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 90 Days', value: '90d' },
    { label: 'Last 12 Months', value: '12m' },
  ];

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
        <span className="text-sm font-bold text-indigo-900">{format(currentDate, dateFormat)}</span>
        <div className="flex gap-1">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-[10px] font-bold text-slate-400 uppercase text-center py-2">
          {dateNames[i]}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const analysesOnThisDay = history.filter(h => isSameDay(parseISO(h.timestamp), currentDay));
        const hasAnalysis = analysesOnThisDay.length > 0;

        days.push(
          <div
            key={day.toString()}
            onClick={() => hasAnalysis && setSelectedAnalysis(analysesOnThisDay[0])}
            className={`relative py-3 flex flex-col items-center justify-center text-xs font-medium transition-all ${
              !isSameMonth(day, monthStart) ? "text-slate-200" : "text-slate-600"
            } ${hasAnalysis ? 'cursor-pointer hover:bg-indigo-50 rounded-lg' : ''}`}
          >
            <span>{format(day, "d")}</span>
            {hasAnalysis && (
              <div className="absolute bottom-1 w-1 h-1 bg-indigo-600 rounded-full" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="p-2">{rows}</div>;
  };

  return (
    <div ref={dashboardRef} className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 font-medium">Real-time performance metrics and predictive forecasting.</p>
        </div>
        <div className="flex items-center gap-3 no-export">
          {/* Calendar Picker */}
          <div className="relative">
            <button 
              onClick={() => { setIsCalendarOpen(!isCalendarOpen); setIsFilterOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${
                isCalendarOpen ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CalendarIcon size={16} />
              Activity Calendar
            </button>

            <AnimatePresence>
              {isCalendarOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsCalendarOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 z-40 overflow-hidden"
                  >
                    {renderHeader()}
                    {renderDays()}
                    {renderCells()}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setIsFilterOpen(!isFilterOpen); setIsCalendarOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm ${
                isFilterOpen ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter size={16} />
              {timeRangeOptions.find(o => o.value === timeRange)?.label}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-40 p-2"
                  >
                    <div className="p-2 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Time Range</p>
                    </div>
                    {timeRangeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTimeRange(option.value as TimeRange);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                          timeRange === option.value 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {option.label}
                        {timeRange === option.value && <Check size={16} />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-800 transition-colors shadow-lg shadow-indigo-900/10 disabled:opacity-50"
          >
            {isExporting ? <Activity className="animate-spin" size={16} /> : <Download size={16} />}
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-indigo-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-indigo-900">Revenue Growth Forecast</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-lg">Monthly</button>
              <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">Weekly</button>
            </div>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center bg-slate-50/50">
            <img 
              src={IMAGES.HERO_DASHBOARD} 
              alt="Revenue Chart" 
              className="w-full h-auto rounded-xl shadow-sm border border-slate-200/50"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-6">Top Performing Segments</h3>
            <div className="space-y-6">
              {[
                { name: 'Enterprise SaaS', value: '$1.2M', progress: 85, color: 'bg-indigo-600' },
                { name: 'Consumer Mobile', value: '$840k', progress: 62, color: 'bg-emerald-500' },
                { name: 'API Services', value: '$420k', progress: 45, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-indigo-900">{item.name}</span>
                    <span className="font-medium text-slate-500">{item.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              View All Segments <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-6">Predictive Alerts</h3>
            <div className="space-y-4">
              {[
                { title: 'Anomaly Detected', desc: 'Unusual traffic spike in EMEA region.', time: '2h ago', type: 'warning' },
                { title: 'Forecast Update', desc: 'Q4 projections increased by 4.2%.', time: '5h ago', type: 'info' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${alert.type === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                  <div>
                    <p className="text-sm font-bold text-indigo-900 group-hover:text-indigo-700">{alert.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{alert.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Report Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnalysis(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="text-xl font-bold text-indigo-900">Historical AI Analysis</h3>
                  <p className="text-xs text-slate-500 font-medium">{format(parseISO(selectedAnalysis.timestamp), 'MMMM d, yyyy h:mm a')}</p>
                </div>
                <button 
                  onClick={() => setSelectedAnalysis(null)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-indigo-900">Analysis Summary</h4>
                    <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedAnalysis.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-600' :
                      selectedAnalysis.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      <AlertTriangle size={12} className="inline mr-1" />
                      {selectedAnalysis.riskLevel} Risk
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl italic">
                    "{selectedAnalysis.summary}"
                  </p>
                </div>

                {/* Recommendations */}
                <div className="bg-indigo-900 p-8 rounded-2xl text-white">
                  <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
                    <Lightbulb className="text-amber-400" size={20} />
                    Strategic Recommendations
                  </h4>
                  <div className="space-y-4">
                    {selectedAnalysis.prediction.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1 shrink-0">
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>
                        <p className="text-sm font-medium text-indigo-100">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Original Input Data */}
                <div className="border border-slate-100 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Input Parameters</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 mb-1">REVENUE</p>
                      <p className="font-bold text-indigo-900">${selectedAnalysis.data.revenue.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 mb-1">CUSTOMERS</p>
                      <p className="font-bold text-indigo-900">{selectedAnalysis.data.customers.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 mb-1">INDUSTRY</p>
                      <p className="font-bold text-indigo-900">{selectedAnalysis.data.industry}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 mb-1">GOALS</p>
                      <p className="font-bold text-indigo-900 truncate">{selectedAnalysis.data.goals}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4">
                <button className="flex-1 bg-indigo-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-800 transition-all flex items-center justify-center gap-2">
                  <FileText size={18} /> Download Full Report
                </button>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
