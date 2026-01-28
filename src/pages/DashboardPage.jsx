import { useState } from 'react';
import { Button } from '../components';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// Sample data for demonstration
const sampleBeneficiaries = [
    { id: 'BEN-001', district: 'Varanasi', scheme: 'PM-KISAN', riskScore: 0.89, category: 'High', signals: ['Unusual claim frequency', 'Cross-scheme overlap'] },
    { id: 'BEN-002', district: 'Lucknow', scheme: 'MGNREGA', riskScore: 0.76, category: 'High', signals: ['Shared bank account pattern'] },
    { id: 'BEN-003', district: 'Kanpur', scheme: 'PDS', riskScore: 0.65, category: 'Medium', signals: ['Temporal spike detected'] },
    { id: 'BEN-004', district: 'Agra', scheme: 'PM-KISAN', riskScore: 0.52, category: 'Medium', signals: ['Deviation from baseline'] },
    { id: 'BEN-005', district: 'Allahabad', scheme: 'Ujjwala', riskScore: 0.45, category: 'Medium', signals: ['Geographic clustering'] },
    { id: 'BEN-006', district: 'Gorakhpur', scheme: 'MGNREGA', riskScore: 0.23, category: 'Low', signals: ['Minor frequency variance'] },
    { id: 'BEN-007', district: 'Bareilly', scheme: 'PDS', riskScore: 0.18, category: 'Low', signals: ['Within normal range'] },
    { id: 'BEN-008', district: 'Moradabad', scheme: 'PM-KISAN', riskScore: 0.12, category: 'Low', signals: ['Normal patterns'] },
];

// Chart data
const riskDistribution = [
    { name: 'High Risk', value: 2, color: '#B91C1C' },
    { name: 'Medium Risk', value: 3, color: '#D97706' },
    { name: 'Low Risk', value: 3, color: '#059669' },
];

const schemeWiseData = [
    { scheme: 'PM-KISAN', high: 1, medium: 1, low: 1 },
    { scheme: 'MGNREGA', high: 1, medium: 0, low: 1 },
    { scheme: 'PDS', high: 0, medium: 1, low: 1 },
    { scheme: 'Ujjwala', high: 0, medium: 1, low: 0 },
];

const monthlyTrend = [
    { month: 'Aug', cases: 45, resolved: 38 },
    { month: 'Sep', cases: 52, resolved: 44 },
    { month: 'Oct', cases: 38, resolved: 35 },
    { month: 'Nov', cases: 61, resolved: 52 },
    { month: 'Dec', cases: 48, resolved: 41 },
    { month: 'Jan', cases: 55, resolved: 47 },
];

const zonalData = [
    { zone: 'Eastern UP', districts: 18, flagged: 156, risk: 0.72 },
    { zone: 'Central UP', districts: 12, flagged: 98, risk: 0.58 },
    { zone: 'Western UP', districts: 15, flagged: 124, risk: 0.65 },
    { zone: 'Bundelkhand', districts: 7, flagged: 45, risk: 0.42 },
];

const districtRisks = [
    { name: 'Varanasi', risk: 0.72 },
    { name: 'Lucknow', risk: 0.65 },
    { name: 'Kanpur', risk: 0.58 },
    { name: 'Agra', risk: 0.45 },
    { name: 'Gorakhpur', risk: 0.38 },
    { name: 'Allahabad', risk: 0.32 },
];

const schemes = ['All Schemes', 'PM-KISAN', 'MGNREGA', 'PDS', 'Ujjwala'];
const riskFilters = ['All Risks', 'High', 'Medium', 'Low'];

const COLORS = ['#B91C1C', '#D97706', '#059669'];

export default function DashboardPage() {
    const [selectedScheme, setSelectedScheme] = useState('All Schemes');
    const [selectedRisk, setSelectedRisk] = useState('All Risks');
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    const filteredBeneficiaries = sampleBeneficiaries.filter((b) => {
        if (selectedScheme !== 'All Schemes' && b.scheme !== selectedScheme) return false;
        if (selectedRisk !== 'All Risks' && b.category !== selectedRisk) return false;
        return true;
    });

    const getRiskColor = (score) => {
        if (score >= 0.7) return 'bg-red-600';
        if (score >= 0.3) return 'bg-amber-500';
        return 'bg-green-600';
    };

    const getRiskBgColor = (category) => {
        if (category === 'High') return 'bg-red-100 text-red-800 border-red-300';
        if (category === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-300';
        return 'bg-green-100 text-green-800 border-green-300';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-6 md:py-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                Risk Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Real-time risk analysis and monitoring
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('analytics')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                Analytics
                            </button>
                            <button
                                onClick={() => setActiveTab('zones')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'zones' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                Zonal Map
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-6">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Stats Overview - Always visible */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-gray-900">8</div>
                            <div className="text-sm text-gray-600">Total Flagged</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-red-700">2</div>
                            <div className="text-sm text-gray-600">High Risk</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-amber-600">3</div>
                            <div className="text-sm text-gray-600">Medium Risk</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-green-700">3</div>
                            <div className="text-sm text-gray-600">Low Risk</div>
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Left Column - Beneficiary Table */}
                            <div className="lg:col-span-2">
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h2 className="font-heading font-semibold text-gray-900 mb-3">Flagged Beneficiaries</h2>
                                        <div className="flex flex-wrap gap-3">
                                            <select
                                                value={selectedScheme}
                                                onChange={(e) => setSelectedScheme(e.target.value)}
                                                className="px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            >
                                                {schemes.map((scheme) => (
                                                    <option key={scheme} value={scheme}>{scheme}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={selectedRisk}
                                                onChange={(e) => setSelectedRisk(e.target.value)}
                                                className="px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            >
                                                {riskFilters.map((risk) => (
                                                    <option key={risk} value={risk}>{risk}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">District</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Scheme</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Risk Score</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredBeneficiaries.map((beneficiary) => (
                                                    <tr
                                                        key={beneficiary.id}
                                                        onClick={() => setSelectedBeneficiary(beneficiary)}
                                                        className={`cursor-pointer transition-colors ${selectedBeneficiary?.id === beneficiary.id
                                                            ? 'bg-primary/5'
                                                            : 'hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{beneficiary.id}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{beneficiary.district}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{beneficiary.scheme}</td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-16 h-2 bg-gray-200 rounded overflow-hidden">
                                                                    <div
                                                                        className={`h-full ${getRiskColor(beneficiary.riskScore)}`}
                                                                        style={{ width: `${beneficiary.riskScore * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="font-medium">{(beneficiary.riskScore * 100).toFixed(0)}%</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBgColor(beneficiary.category)}`}>
                                                                {beneficiary.category}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Details & Pie Chart */}
                            <div className="space-y-6">
                                {/* Risk Distribution Pie Chart */}
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="font-heading font-semibold text-gray-900">Risk Distribution</h3>
                                    </div>
                                    <div className="p-4">
                                        <ResponsiveContainer width="100%" height={200}>
                                            <PieChart>
                                                <Pie
                                                    data={riskDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={70}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                >
                                                    {riskDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Selected Beneficiary Details */}
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="font-heading font-semibold text-gray-900">
                                            {selectedBeneficiary ? 'Risk Analysis' : 'Select a Beneficiary'}
                                        </h3>
                                    </div>
                                    <div className="p-4">
                                        {selectedBeneficiary ? (
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-lg font-heading font-bold text-gray-900">{selectedBeneficiary.id}</span>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBgColor(selectedBeneficiary.category)}`}>
                                                        {selectedBeneficiary.category} Risk
                                                    </span>
                                                </div>

                                                {/* Risk Score Bar */}
                                                <div className="mb-4">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600">Risk Score</span>
                                                        <span className="font-semibold">{(selectedBeneficiary.riskScore * 100).toFixed(0)}%</span>
                                                    </div>
                                                    <div className="h-3 bg-gray-200 rounded overflow-hidden">
                                                        <div
                                                            className={`h-full ${getRiskColor(selectedBeneficiary.riskScore)} transition-all duration-500`}
                                                            style={{ width: `${selectedBeneficiary.riskScore * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Contributing Signals */}
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Contributing Signals</h4>
                                                    <ul className="space-y-2">
                                                        {selectedBeneficiary.signals.map((signal, index) => (
                                                            <li key={index} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm">
                                                                <span className="w-4 h-4 bg-primary text-white rounded text-xs flex items-center justify-center">
                                                                    {index + 1}
                                                                </span>
                                                                <span>{signal}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-sm">
                                                Click on a beneficiary from the table to view detailed risk analysis.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === 'analytics' && (
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Scheme-wise Risk Bar Chart */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">Scheme-wise Risk Distribution</h3>
                                </div>
                                <div className="p-4">
                                    <ResponsiveContainer width="100%" height={280}>
                                        <BarChart data={schemeWiseData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                            <XAxis dataKey="scheme" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="high" name="High Risk" fill="#B91C1C" />
                                            <Bar dataKey="medium" name="Medium Risk" fill="#D97706" />
                                            <Bar dataKey="low" name="Low Risk" fill="#059669" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Monthly Trend Line Chart */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">Monthly Cases Trend</h3>
                                </div>
                                <div className="p-4">
                                    <ResponsiveContainer width="100%" height={280}>
                                        <AreaChart data={monthlyTrend}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" dataKey="cases" name="Flagged Cases" stroke="#7C3726" fill="#7C3726" fillOpacity={0.3} />
                                            <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Risk Distribution Pie Chart - Large */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">Overall Risk Distribution</h3>
                                </div>
                                <div className="p-4">
                                    <ResponsiveContainer width="100%" height={280}>
                                        <PieChart>
                                            <Pie
                                                data={riskDistribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={3}
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {riskDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* District Risk Bar Chart */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">District-wise Risk Level</h3>
                                </div>
                                <div className="p-4">
                                    <ResponsiveContainer width="100%" height={280}>
                                        <BarChart data={districtRisks} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                            <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 12 }} />
                                            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                                            <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
                                            <Bar dataKey="risk" name="Risk Score" fill="#7C3726" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Zones Tab */}
                    {activeTab === 'zones' && (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Zonal Map Visualization */}
                            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">Zonal Risk Map - Uttar Pradesh</h3>
                                </div>
                                <div className="p-6">
                                    {/* Simplified Zone Grid Map */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {zonalData.map((zone) => (
                                            <div
                                                key={zone.zone}
                                                className="relative p-6 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer"
                                                style={{
                                                    backgroundColor: zone.risk >= 0.7 ? '#FEE2E2' : zone.risk >= 0.5 ? '#FEF3C7' : '#D1FAE5',
                                                    borderColor: zone.risk >= 0.7 ? '#B91C1C' : zone.risk >= 0.5 ? '#D97706' : '#059669'
                                                }}
                                            >
                                                <h4 className="font-heading font-bold text-gray-900 text-lg mb-2">{zone.zone}</h4>
                                                <div className="space-y-1 text-sm">
                                                    <p className="text-gray-700"><span className="font-medium">Districts:</span> {zone.districts}</p>
                                                    <p className="text-gray-700"><span className="font-medium">Flagged Cases:</span> {zone.flagged}</p>
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Risk Level:</span>{' '}
                                                        <span className={`font-bold ${zone.risk >= 0.7 ? 'text-red-700' : zone.risk >= 0.5 ? 'text-amber-700' : 'text-green-700'}`}>
                                                            {(zone.risk * 100).toFixed(0)}%
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="absolute top-2 right-2">
                                                    <span className={`w-3 h-3 rounded-full inline-block ${zone.risk >= 0.7 ? 'bg-red-600' : zone.risk >= 0.5 ? 'bg-amber-500' : 'bg-green-600'}`}></span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Legend */}
                                    <div className="flex justify-center gap-6 pt-4 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 rounded bg-red-600"></span>
                                            <span className="text-sm text-gray-600">High Risk (≥70%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 rounded bg-amber-500"></span>
                                            <span className="text-sm text-gray-600">Medium Risk (50-70%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 rounded bg-green-600"></span>
                                            <span className="text-sm text-gray-600">Low Risk (&lt;50%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Zonal Statistics */}
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="font-heading font-semibold text-gray-900">Zone Comparison</h3>
                                    </div>
                                    <div className="p-4">
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={zonalData} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                                <YAxis dataKey="zone" type="category" tick={{ fontSize: 11 }} width={90} />
                                                <Tooltip />
                                                <Bar dataKey="flagged" name="Flagged Cases" fill="#7C3726" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="font-heading font-semibold text-gray-900">District Coverage</h3>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        {zonalData.map((zone) => (
                                            <div key={zone.zone}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-700">{zone.zone}</span>
                                                    <span className="font-medium">{zone.districts} districts</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${(zone.districts / 18) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">
                        Need Assistance?
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Explore technical documentation or contact support for help
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button to="/technology">Technical Documentation</Button>
                        <Button variant="secondary" to="/contact">Contact Support</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
