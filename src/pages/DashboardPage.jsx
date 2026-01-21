import { useState } from 'react';
import { Button } from '../components';

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

export default function DashboardPage() {
    const [selectedScheme, setSelectedScheme] = useState('All Schemes');
    const [selectedRisk, setSelectedRisk] = useState('All Risks');
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

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
        <div className="min-h-screen bg-white">
            {/* Hero Section - White */}
            <section className="bg-white py-8 md:py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                Risk Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Interactive demonstration with sample anonymized data
                            </p>
                        </div>
                        <div className="bg-amber-100 border border-amber-300 rounded px-4 py-2">
                            <span className="text-amber-800 text-sm font-medium">Demo Mode - Sample Data</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-gray-900">8</div>
                            <div className="text-sm text-gray-600">Total Flagged</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-red-700">2</div>
                            <div className="text-sm text-gray-600">High Risk</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-amber-600">3</div>
                            <div className="text-sm text-gray-600">Medium Risk</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-green-700">3</div>
                            <div className="text-sm text-gray-600">Low Risk</div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Beneficiary Table */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-gray-200 rounded overflow-hidden">
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

                        {/* Right Column - Details & Heatmap */}
                        <div className="space-y-6">
                            {/* Selected Beneficiary Details */}
                            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">
                                        {selectedBeneficiary ? 'Risk Analysis' : 'Select a Beneficiary'}
                                    </h3>
                                </div>
                                <div className="p-4">
                                    {selectedBeneficiary ? (
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xl font-heading font-bold text-gray-900">{selectedBeneficiary.id}</span>
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

                                            {/* Details Table */}
                                            <table className="w-full text-sm mb-4">
                                                <tbody>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 text-gray-600">District</td>
                                                        <td className="py-2 font-medium text-right">{selectedBeneficiary.district}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 text-gray-600">Scheme</td>
                                                        <td className="py-2 font-medium text-right">{selectedBeneficiary.scheme}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

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
                                            Click on a beneficiary from the table to view detailed risk analysis and contributing signals.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* District Heatmap */}
                            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">District Risk Overview</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {districtRisks.map((district) => (
                                        <div key={district.name}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-700">{district.name}</span>
                                                <span className="font-medium">{(district.risk * 100).toFixed(0)}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded overflow-hidden">
                                                <div
                                                    className={`h-full ${getRiskColor(district.risk)}`}
                                                    style={{ width: `${district.risk * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-6 bg-amber-50 border border-amber-300 rounded p-4">
                        <p className="font-medium text-amber-800 mb-1">Demo Data Notice</p>
                        <p className="text-sm text-amber-700">
                            This dashboard displays sample anonymized data for demonstration purposes only.
                            In production, real-time data would be processed through secure pipelines with
                            all privacy measures in place.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">
                        Want to Learn More?
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Explore our technology stack or get in touch for a detailed demonstration
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button to="/technology">Explore Technology</Button>
                        <Button variant="secondary" to="/contact">Contact Us</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
