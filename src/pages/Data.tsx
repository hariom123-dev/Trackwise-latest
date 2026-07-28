import React, { useState } from 'react';
import { Database, BrainCircuit, Loader2, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, BarChart3, PieChart, Activity, Lightbulb, FileText, UploadCloud, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { generateBusinessPredictions, BusinessData, PredictionResult } from '../services/gemini';
import { saveAnalysisToHistory } from '../services/history';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Data() {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [lastSubmittedData, setLastSubmittedData] = useState<string>('');
  const [formData, setFormData] = useState<BusinessData>({
    revenue: 50000,
    expenses: 35000,
    customers: 1200,
    churnRate: 2.5,
    industry: 'SaaS',
    goals: 'Scale to $100k MRR by end of year'
  });

  const loadSampleData = () => {
    setFormData({
      revenue: 125000,
      expenses: 82000,
      customers: 4500,
      churnRate: 1.8,
      industry: 'Fintech',
      goals: 'Expand to European market and achieve 25% YoY growth'
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws) as any[];

        if (data.length > 0) {
          const firstRow = data[0];
          // Try to map common field names
          const mappedData: Partial<BusinessData> = {};
          
          const findKey = (searchTerms: string[]) => {
            return Object.keys(firstRow).find(key => 
              searchTerms.some(term => key.toLowerCase().includes(term.toLowerCase()))
            );
          };

          const revenueKey = findKey(['revenue', 'income', 'sales', 'turnover']);
          const expensesKey = findKey(['expense', 'cost', 'spending', 'outgoings']);
          const customersKey = findKey(['customer', 'user', 'client', 'subscriber']);
          const churnKey = findKey(['churn', 'retention', 'attrition']);
          const industryKey = findKey(['industry', 'sector', 'business type']);
          const goalsKey = findKey(['goal', 'target', 'objective']);

          if (revenueKey) mappedData.revenue = parseFloat(firstRow[revenueKey]);
          if (expensesKey) mappedData.expenses = parseFloat(firstRow[expensesKey]);
          if (customersKey) mappedData.customers = parseInt(firstRow[customersKey]);
          if (churnKey) mappedData.churnRate = parseFloat(firstRow[churnKey]);
          if (industryKey) mappedData.industry = String(firstRow[industryKey]);
          if (goalsKey) mappedData.goals = String(firstRow[goalsKey]);

          setFormData(prev => ({ ...prev, ...mappedData }));
          alert('Successfully imported data from ' + file.name);
        }
      } catch (error) {
        console.error("File parsing error:", error);
        alert('Error parsing file. Please ensure it is a valid Excel or CSV file.');
      } finally {
        setFileLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Check if data has changed to save quota
    const currentDataStr = JSON.stringify(formData);
    if (currentDataStr === lastSubmittedData && prediction && !error) {
      return; 
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateBusinessPredictions(formData);
      setPrediction(result);
      setLastSubmittedData(currentDataStr);
      saveAnalysisToHistory(formData, result);
    } catch (err: any) {
      console.error("Prediction failed:", err);
      let message = err.message || "The AI engine encountered an issue. Please check your connection and try again.";
      
      // Handle the specific quota error
      if (message.includes("quota") || message.includes("exhausted") || message.includes("429")) {
        message = "The AI Engine is currently processing high volume. Please give it a moment to refresh—this usually takes about 60 seconds on our standard tier.";
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'industry' || name === 'goals' ? value : (value === '' ? 0 : parseFloat(value))
    }));
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('prediction-report');
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
    pdf.save(`TrackWise-Analysis-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Data Engine</h1>
          <p className="font-medium text-slate-500">Input your business metrics for deep-learning analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-indigo-900 border border-indigo-900 rounded-xl text-sm font-bold text-white hover:bg-indigo-800 transition-colors cursor-pointer">
            {fileLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            Import Sheet
            <input 
              type="file" 
              className="hidden" 
              accept=".xlsx,.xls,.csv" 
              onChange={handleFileUpload}
              disabled={fileLoading}
            />
          </label>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <FileText size={16} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Input Form */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Database size={20} />
              </div>
              <h2 className="text-xl font-bold text-indigo-900">Business Data Matrix</h2>
            </div>
            <button 
              type="button"
              onClick={loadSampleData}
              className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors"
            >
              Load Sample
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue ($)</label>
                <input 
                  type="number" 
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Expenses ($)</label>
                <input 
                  type="number" 
                  name="expenses"
                  value={formData.expenses}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Active Customers</label>
                <input 
                  type="number" 
                  name="customers"
                  value={formData.customers}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Churn Rate (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  name="churnRate"
                  value={formData.churnRate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Industry Vertical</label>
              <select 
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
              >
                <option value="SaaS">SaaS / Enterprise Software</option>
                <option value="E-commerce">E-commerce / Retail</option>
                <option value="Fintech">Fintech / Financial Services</option>
                <option value="Healthcare">Healthcare & BioTech</option>
                <option value="Real Estate">Real Estate & PropTech</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Strategic Goals</label>
              <textarea 
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all resize-none"
                placeholder="e.g., Scale to $100k MRR..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-900 text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-indigo-900/15 flex items-center justify-center gap-2 hover:bg-indigo-950 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Processing Neural Prediction...</span>
                </>
              ) : (
                <>
                  <BrainCircuit size={16} />
                  <span>Generate AI Prediction</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div id="prediction-report" className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl text-center shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Engine Optimization in Progress</h3>
              <p className="text-slate-500 text-xs mb-6 max-w-sm mx-auto leading-relaxed">{error}</p>
              <button 
                onClick={handleSubmit}
                className="group flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-950 transition-all shadow-xs"
              >
                <RefreshCw size={15} className="group-hover:rotate-180 transition-transform duration-500" />
                <span>Retry Neural Engine</span>
              </button>
            </div>
          )}

          {!prediction && !loading && !error && (
            <div className="bg-white border border-slate-200/80 rounded-2xl min-h-[420px] flex flex-col items-center justify-center p-8 text-center shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 shadow-2xs">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Intelligence Engine Standby</h3>
              <p className="text-slate-500 text-xs max-w-md mb-6 leading-relaxed">
                Connect your financial metrics to our machine learning model. TrackWise generates a 6-month revenue projection, volatility risk assessment, and strategic recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <button 
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-indigo-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-950 transition-all active:scale-95"
                >
                  Analyze Current Data
                </button>
              </div>
              <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Encrypted Neural Pipeline Active</p>
            </div>
          )}

          {loading && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-2xs min-h-[420px] flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Processing Predictive Models</h3>
              <p className="text-slate-500 text-xs max-w-md leading-relaxed">Evaluating industry benchmarks, revenue variance, and churn metrics through neural regression layers...</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900">Analysis Summary</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    prediction.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-700' :
                    prediction.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700' :
                    'bg-rose-50 text-rose-700'
                  }`}>
                    <AlertTriangle size={13} />
                    <span>{prediction.riskLevel} Risk Profile</span>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm bg-slate-50/60 p-4 rounded-xl border border-slate-100 italic">{prediction.summary}</p>
              </div>

              {/* Chart Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <TrendingUp size={18} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">6-Month Revenue Projection</h3>
                  </div>
                </div>
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={prediction.forecast}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                        dy={8}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Forecasted Revenue']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#4f46e5" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorRev)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-900 p-6 rounded-2xl text-white shadow-md shadow-indigo-900/15 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                      <Lightbulb className="text-amber-400" size={18} />
                      Strategic Recommendations
                    </h3>
                    <div className="space-y-3">
                      {prediction.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 group">
                          <div className="mt-0.5 shrink-0">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          </div>
                          <p className="text-xs text-indigo-100 leading-relaxed font-medium">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                    <span>Export Strategy Brief</span> <ArrowRight size={14} />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-4">Operational Efficiency Index</h3>
                    <div className="flex items-center justify-center py-2">
                      <div className="relative">
                        <svg className="w-28 h-28 transform -rotate-90">
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="currentColor"
                            strokeWidth="7"
                            fill="transparent"
                            className="text-slate-100"
                          />
                          <motion.circle
                            initial={{ strokeDashoffset: 314 }}
                            animate={{ strokeDashoffset: 314 - (314 * prediction.efficiencyScore) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="currentColor"
                            strokeWidth="7"
                            strokeDasharray={314}
                            strokeLinecap="round"
                            fill="transparent"
                            className="text-indigo-600"
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                          <span className="text-2xl font-black text-slate-900">{prediction.efficiencyScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-bold text-slate-800">
                      {prediction.efficiencyScore > 80 ? 'Exceptional Performance' : prediction.efficiencyScore > 50 ? 'Stable Performance' : 'Optimizing Required'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      Benchmarks relative to {formData.industry} vertical
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
