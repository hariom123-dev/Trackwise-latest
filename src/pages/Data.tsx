import React, { useState } from 'react';
import { Database, BrainCircuit, Loader2, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, BarChart3, PieChart, Activity, Lightbulb, FileText, UploadCloud } from 'lucide-react';
import { generateBusinessPredictions, BusinessData, PredictionResult } from '../services/gemini';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Data() {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<BusinessData>({
    revenue: 50000,
    expenses: 35000,
    customers: 1200,
    churnRate: 2.5,
    industry: 'SaaS',
    goals: 'Scale to $100k MRR by end of year'
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateBusinessPredictions(formData);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'industry' || name === 'goals' ? value : parseFloat(value)
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
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Database size={20} />
            </div>
            <h2 className="text-xl font-bold text-indigo-900">Business Metrics</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Revenue ($)</label>
                <input 
                  type="number" 
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Expenses ($)</label>
                <input 
                  type="number" 
                  name="expenses"
                  value={formData.expenses}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Customers</label>
                <input 
                  type="number" 
                  name="customers"
                  value={formData.customers}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Churn Rate (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  name="churnRate"
                  value={formData.churnRate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry</label>
              <select 
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all"
              >
                <option value="SaaS">SaaS</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Fintech">Fintech</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Real Estate">Real Estate</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Goals</label>
              <textarea 
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition-all resize-none"
                placeholder="e.g., Scale to $100k MRR..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold shadow-xl shadow-indigo-900/10 flex items-center justify-center gap-3 hover:bg-indigo-800 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <BrainCircuit size={20} />
                  Generate AI Prediction
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div id="prediction-report" className="lg:col-span-2 space-y-8">
          {!prediction && !loading && (
            <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-[2rem] h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-300 mb-6">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Awaiting Data Input</h3>
              <p className="text-slate-400 max-w-xs">Fill out the form to generate your business's predictive intelligence report.</p>
            </div>
          )}

          {loading && (
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-indigo-900 mb-2">TrackWise is Thinking</h3>
              <p className="text-slate-500 max-w-md">Processing your metrics through our neural network to identify trends and strategic opportunities...</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Summary Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-indigo-900">Analysis Summary</h3>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
                    prediction.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-600' :
                    prediction.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    <AlertTriangle size={14} />
                    {prediction.riskLevel} Risk
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">{prediction.summary}</p>
              </div>

              {/* Chart Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <TrendingUp size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900">6-Month Revenue Forecast</h3>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={prediction.forecast}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#4f46e5" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorRev)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-900 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-900/20">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Lightbulb className="text-amber-400" size={24} />
                    Strategic Recommendations
                  </h3>
                  <div className="space-y-4">
                    {prediction.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="mt-1.5 shrink-0">
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        </div>
                        <p className="text-sm text-indigo-100 leading-relaxed font-medium">{rec}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                    Export Strategy Deck <ArrowRight size={16} />
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-6">Efficiency Score</h3>
                    <div className="flex items-center justify-center py-4">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-100"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={364}
                            strokeDashoffset={364 - (364 * 78) / 100}
                            strokeLinecap="round"
                            fill="transparent"
                            className="text-indigo-600"
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                          <span className="text-3xl font-black text-indigo-900">78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium text-center mt-4">
                    Your business is performing in the top 22% of the {formData.industry} industry.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
