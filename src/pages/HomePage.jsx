import { Button } from '../components';
import { Link } from 'react-router-dom';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// Realistic operational data
const overviewStats = [
    { label: 'Total Beneficiaries Analyzed', value: '4.2 Cr', change: '+12%' },
    { label: 'Transactions Processed', value: '₹18,450 Cr', change: 'This Month' },
    { label: 'High Risk Cases Flagged', value: '12,847', change: '-8% vs last month' },
    { label: 'Cases Under Review', value: '3,241', change: 'Active' },
];

const stateData = [
    { state: 'Uttar Pradesh', beneficiaries: 42000000, flagged: 12847, riskPct: 0.031, status: 'high' },
    { state: 'Bihar', beneficiaries: 28000000, flagged: 8234, riskPct: 0.029, status: 'medium' },
    { state: 'Madhya Pradesh', beneficiaries: 22000000, flagged: 5123, riskPct: 0.023, status: 'medium' },
    { state: 'Rajasthan', beneficiaries: 19000000, flagged: 4567, riskPct: 0.024, status: 'low' },
    { state: 'Maharashtra', beneficiaries: 31000000, flagged: 6789, riskPct: 0.022, status: 'low' },
];

const schemeData = [
    { scheme: 'PM-KISAN', processed: 9200, flagged: 847, rate: 9.2 },
    { scheme: 'MGNREGA', processed: 12400, flagged: 1123, rate: 9.1 },
    { scheme: 'PDS', processed: 8700, flagged: 654, rate: 7.5 },
    { scheme: 'Ujjwala', processed: 5600, flagged: 412, rate: 7.4 },
    { scheme: 'Awas Yojana', processed: 3200, flagged: 289, rate: 9.0 },
];

const monthlyTrend = [
    { month: 'Aug', flagged: 14234, resolved: 12890, savings: 234 },
    { month: 'Sep', flagged: 15678, resolved: 14234, savings: 287 },
    { month: 'Oct', flagged: 13456, resolved: 12678, savings: 245 },
    { month: 'Nov', flagged: 16789, resolved: 15234, savings: 312 },
    { month: 'Dec', flagged: 14567, resolved: 13890, savings: 278 },
    { month: 'Jan', flagged: 12847, resolved: 11234, savings: 256 },
];

const riskDistribution = [
    { name: 'High Risk', value: 2847, color: '#B91C1C' },
    { name: 'Medium Risk', value: 5423, color: '#D97706' },
    { name: 'Low Risk', value: 4577, color: '#059669' },
];

// India Map State Coordinates (simplified for SVG)
const indiaStates = {
    'Uttar Pradesh': { x: 280, y: 180, risk: 'high' },
    'Bihar': { x: 340, y: 190, risk: 'high' },
    'Madhya Pradesh': { x: 230, y: 220, risk: 'medium' },
    'Rajasthan': { x: 170, y: 170, risk: 'low' },
    'Maharashtra': { x: 190, y: 280, risk: 'medium' },
    'Gujarat': { x: 130, y: 230, risk: 'low' },
    'West Bengal': { x: 370, y: 220, risk: 'medium' },
    'Karnataka': { x: 190, y: 340, risk: 'low' },
    'Tamil Nadu': { x: 220, y: 390, risk: 'low' },
    'Odisha': { x: 330, y: 270, risk: 'medium' },
};

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header with Logo and Stats */}
            <section className="bg-white border-b-4 border-primary">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src="/logojan.jpeg"
                                alt="JanAvlokan Logo"
                                className="h-16 w-auto"
                            />
                            <div>
                                <h1 className="text-xl md:text-2xl font-heading font-bold text-gray-900">
                                    Welfare Intelligence Dashboard
                                </h1>
                                <p className="text-sm text-gray-600">Real-time Subsidy Monitoring & Analytics</p>
                            </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            <div>Last Updated: {new Date().toLocaleDateString('en-IN')}</div>
                            <div className="text-xs text-gray-500">Data refreshes every 15 minutes</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Metrics Row */}
            <section className="py-4 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {overviewStats.map((stat, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{stat.label}</div>
                                <div className="text-2xl font-heading font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Analytics Section */}
            <section className="py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* India Map with Highlighted States */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="font-heading font-semibold text-gray-900">State-wise Risk Distribution</h3>
                                <div className="flex gap-3 text-xs">
                                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-600"></span> High</span>
                                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium</span>
                                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-600"></span> Low</span>
                                </div>
                            </div>
                            <div className="p-4">
                                {/* Simplified India Map SVG */}
                                <div className="relative">
                                    <svg viewBox="0 0 500 500" className="w-full h-64 md:h-80">
                                        {/* India outline (simplified) */}
                                        <path
                                            d="M150,80 L180,60 L220,55 L260,50 L300,55 L340,70 L380,90 L400,120 L410,160 L400,200 L390,240 L380,280 L370,320 L350,360 L320,400 L280,430 L240,450 L200,440 L180,400 L160,360 L140,320 L130,280 L120,240 L110,200 L100,160 L110,120 L130,90 Z"
                                            fill="#f3f4f6"
                                            stroke="#d1d5db"
                                            strokeWidth="2"
                                        />

                                        {/* State markers */}
                                        {Object.entries(indiaStates).map(([state, data]) => (
                                            <g key={state}>
                                                <circle
                                                    cx={data.x}
                                                    cy={data.y}
                                                    r={data.risk === 'high' ? 18 : data.risk === 'medium' ? 14 : 10}
                                                    fill={data.risk === 'high' ? '#B91C1C' : data.risk === 'medium' ? '#D97706' : '#059669'}
                                                    opacity="0.8"
                                                    className="cursor-pointer hover:opacity-100 transition-opacity"
                                                />
                                                <circle
                                                    cx={data.x}
                                                    cy={data.y}
                                                    r={data.risk === 'high' ? 22 : data.risk === 'medium' ? 18 : 14}
                                                    fill="none"
                                                    stroke={data.risk === 'high' ? '#B91C1C' : data.risk === 'medium' ? '#D97706' : '#059669'}
                                                    strokeWidth="2"
                                                    opacity="0.3"
                                                />
                                            </g>
                                        ))}

                                        {/* Watermark */}
                                        <text x="250" y="480" textAnchor="middle" fontSize="10" fill="#9ca3af">
                                            JanAvlokan - Welfare Intelligence Platform
                                        </text>
                                    </svg>

                                    {/* State labels overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 border-t border-gray-200">
                                        <div className="grid grid-cols-5 gap-2 text-xs">
                                            {stateData.slice(0, 5).map((s, i) => (
                                                <div key={i} className="text-center">
                                                    <div className={`font-medium ${s.status === 'high' ? 'text-red-700' : s.status === 'medium' ? 'text-amber-700' : 'text-green-700'}`}>
                                                        {s.state.split(' ')[0]}
                                                    </div>
                                                    <div className="text-gray-500">{s.flagged.toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Risk Distribution Pie */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <h3 className="font-heading font-semibold text-gray-900">Risk Categories</h3>
                            </div>
                            <div className="p-4">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={riskDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={45}
                                            outerRadius={75}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {riskDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => value.toLocaleString()} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 mt-2">
                                    {riskDistribution.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></span>
                                                {item.name}
                                            </span>
                                            <span className="font-medium">{item.value.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Charts Row */}
            <section className="pb-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Monthly Trend */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <h3 className="font-heading font-semibold text-gray-900">Monthly Flagged vs Resolved Cases</h3>
                            </div>
                            <div className="p-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={monthlyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="flagged" name="Flagged" stroke="#7C3726" fill="#7C3726" fillOpacity={0.3} />
                                        <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Scheme-wise Bar Chart */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <h3 className="font-heading font-semibold text-gray-900">Scheme-wise Flagged Cases</h3>
                            </div>
                            <div className="p-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={schemeData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="scheme" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Bar dataKey="flagged" name="Flagged Cases" fill="#7C3726" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* State Table */}
            <section className="pb-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-heading font-semibold text-gray-900">State-wise Analysis (Top 5 States by Volume)</h3>
                            <Link to="/dashboard" className="text-primary text-sm hover:underline">View All →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">State</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Beneficiaries</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Flagged Cases</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Risk %</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stateData.map((state, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{state.state}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 text-right">{(state.beneficiaries / 10000000).toFixed(1)} Cr</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 text-right">{state.flagged.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 text-right">{(state.riskPct * 100).toFixed(2)}%</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-1 text-xs font-medium rounded ${state.status === 'high' ? 'bg-red-100 text-red-800' :
                                                        state.status === 'medium' ? 'bg-amber-100 text-amber-800' :
                                                            'bg-green-100 text-green-800'
                                                    }`}>
                                                    {state.status.charAt(0).toUpperCase() + state.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Footer */}
            <section className="py-6 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <img src="/logojan.jpeg" alt="JanAvlokan" className="h-10 w-auto opacity-60" />
                            <span className="text-sm text-gray-500">Advisory-only system. Does not block or delay payments.</span>
                        </div>
                        <div className="flex gap-3">
                            <Button to="/dashboard">Detailed Dashboard</Button>
                            <Button variant="secondary" to="/technology">Documentation</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
