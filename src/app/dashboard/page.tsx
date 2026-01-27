'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';

// Types matching our API responses
interface DashboardSummary {
    total_records: number;
    anomalies_detected: number;
    anomaly_percentage: number;
    avg_risk_score: number;
    last_model_run: string;
}

interface Beneficiary {
    beneficiary_id: string;
    residence_district: string;
    risk_score: number;
    total_txns: number;
    avg_amount: number;
    txns_last_30d: number;
    unique_dealers: number;
    cross_district_txns: number;
    risk_reasons: string[];
}

interface DistrictRisk {
    residence_district: string;
    anomaly_count: number;
}

interface BeneficiaryDetail {
    beneficiary_id: string;
    residence_district: string;
    residence_block: string;
    household_size: number;
    income_bracket: string;
    risk_score: number;
    is_anomaly: boolean;
    total_txns: number;
    avg_amount: number;
    txns_last_30d: number;
    unique_dealers: number;
    cross_district_txns: number;
    risk_reasons: string[];
}

const riskFilters = ['All Risks', 'High', 'Medium', 'Low'];

export default function DashboardPage() {
    // State for API data
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [districtRisks, setDistrictRisks] = useState<DistrictRisk[]>([]);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryDetail | null>(null);
    const [selectedRisk, setSelectedRisk] = useState('All Risks');
    
    // Loading & error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    // Fetch all data on mount
    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            setError(null);
            
            try {
                const [summaryRes, beneficiariesRes, districtRes] = await Promise.all([
                    fetch('/api/dashboard/summary'),
                    fetch('/api/beneficiaries/high-risk?limit=50'),
                    fetch('/api/geo/district-risk')
                ]);

                if (!summaryRes.ok || !beneficiariesRes.ok || !districtRes.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const [summaryData, beneficiariesData, districtData] = await Promise.all([
                    summaryRes.json(),
                    beneficiariesRes.json(),
                    districtRes.json()
                ]);

                setSummary(summaryData);
                setBeneficiaries(beneficiariesData);
                setDistrictRisks(districtData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    // Fetch beneficiary detail when clicked
    const handleBeneficiaryClick = async (beneficiaryId: string) => {
        setDetailLoading(true);
        try {
            const res = await fetch(`/api/beneficiaries/${beneficiaryId}`);
            if (!res.ok) throw new Error('Failed to fetch beneficiary details');
            const data = await res.json();
            setSelectedBeneficiary(data);
        } catch (err) {
            console.error('Error fetching beneficiary details:', err);
        } finally {
            setDetailLoading(false);
        }
    };

    // Helper functions
    const getRiskCategory = (score: number): 'High' | 'Medium' | 'Low' => {
        if (score >= 0.05) return 'High';
        if (score >= 0.02) return 'Medium';
        return 'Low';
    };

    const getRiskColor = (score: number): string => {
        if (score >= 0.05) return 'bg-red-600';
        if (score >= 0.02) return 'bg-amber-500';
        return 'bg-green-600';
    };

    const getRiskBgColor = (category: string): string => {
        if (category === 'High') return 'bg-red-100 text-red-800 border-red-300';
        if (category === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-300';
        return 'bg-green-100 text-green-800 border-green-300';
    };

    // Normalize risk score for display (MSE is typically small, scale it)
    const normalizeScore = (score: number): number => {
        return Math.min(score * 10, 1); // Scale for visual display
    };

    // Filter beneficiaries by risk category
    const filteredBeneficiaries = beneficiaries.filter((b) => {
        if (selectedRisk === 'All Risks') return true;
        return getRiskCategory(b.risk_score) === selectedRisk;
    });

    // Count by risk category
    const highRiskCount = beneficiaries.filter(b => getRiskCategory(b.risk_score) === 'High').length;
    const mediumRiskCount = beneficiaries.filter(b => getRiskCategory(b.risk_score) === 'Medium').length;
    const lowRiskCount = beneficiaries.filter(b => getRiskCategory(b.risk_score) === 'Low').length;

    // Get max anomaly count for scaling district bars
    const maxAnomalyCount = Math.max(...districtRisks.map(d => d.anomaly_count), 1);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard data from BigQuery...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white py-8 md:py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                Risk Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Real-time anomaly detection powered by BigQuery ML
                            </p>
                        </div>
                        <div className="bg-green-100 border border-green-300 rounded px-4 py-2">
                            <span className="text-green-800 text-sm font-medium">🟢 Live Data Connected</span>
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
                            <div className="text-2xl font-heading font-bold text-gray-900">
                                {summary?.total_records?.toLocaleString() || 0}
                            </div>
                            <div className="text-sm text-gray-600">Total Beneficiaries</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-red-700">
                                {summary?.anomalies_detected?.toLocaleString() || 0}
                            </div>
                            <div className="text-sm text-gray-600">Anomalies Detected</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-amber-600">
                                {summary?.anomaly_percentage?.toFixed(2) || 0}%
                            </div>
                            <div className="text-sm text-gray-600">Anomaly Rate</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-primary">
                                {summary?.avg_risk_score?.toFixed(4) || 0}
                            </div>
                            <div className="text-sm text-gray-600">Avg Risk Score (MSE)</div>
                        </div>
                    </div>

                    {/* Risk Category Summary */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-red-700">{highRiskCount}</div>
                            <div className="text-sm text-red-600">High Risk</div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-amber-700">{mediumRiskCount}</div>
                            <div className="text-sm text-amber-600">Medium Risk</div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
                            <div className="text-2xl font-heading font-bold text-green-700">{lowRiskCount}</div>
                            <div className="text-sm text-green-600">Low Risk</div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Beneficiary Table */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h2 className="font-heading font-semibold text-gray-900 mb-3">
                                        Flagged Beneficiaries ({filteredBeneficiaries.length})
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
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
                                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                                    <table className="w-full">
                                        <thead className="sticky top-0 bg-gray-50">
                                            <tr className="border-b border-gray-200">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Beneficiary ID</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">District</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total Txns</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Risk Score</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredBeneficiaries.map((beneficiary) => (
                                                <tr
                                                    key={beneficiary.beneficiary_id}
                                                    onClick={() => handleBeneficiaryClick(beneficiary.beneficiary_id)}
                                                    className={`cursor-pointer transition-colors ${
                                                        selectedBeneficiary?.beneficiary_id === beneficiary.beneficiary_id
                                                            ? 'bg-primary/5'
                                                            : 'hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                        {beneficiary.beneficiary_id}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {beneficiary.residence_district}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {beneficiary.total_txns}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-2 bg-gray-200 rounded overflow-hidden">
                                                                <div
                                                                    className={`h-full ${getRiskColor(beneficiary.risk_score)}`}
                                                                    style={{ width: `${normalizeScore(beneficiary.risk_score) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-medium text-xs">
                                                                {beneficiary.risk_score.toFixed(4)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBgColor(getRiskCategory(beneficiary.risk_score))}`}>
                                                            {getRiskCategory(beneficiary.risk_score)}
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
                                        {selectedBeneficiary ? 'Explainability Panel' : 'Select a Beneficiary'}
                                    </h3>
                                </div>
                                <div className="p-4">
                                    {detailLoading ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                            <p className="text-gray-500 text-sm mt-2">Loading details...</p>
                                        </div>
                                    ) : selectedBeneficiary ? (
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-lg font-heading font-bold text-gray-900">
                                                    {selectedBeneficiary.beneficiary_id}
                                                </span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBgColor(getRiskCategory(selectedBeneficiary.risk_score))}`}>
                                                    {getRiskCategory(selectedBeneficiary.risk_score)} Risk
                                                </span>
                                            </div>

                                            {/* Risk Score Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">Mean Squared Error</span>
                                                    <span className="font-semibold">{selectedBeneficiary.risk_score.toFixed(4)}</span>
                                                </div>
                                                <div className="h-3 bg-gray-200 rounded overflow-hidden">
                                                    <div
                                                        className={`h-full ${getRiskColor(selectedBeneficiary.risk_score)} transition-all duration-500`}
                                                        style={{ width: `${normalizeScore(selectedBeneficiary.risk_score) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Feature Snapshot */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Feature Snapshot</h4>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">District</div>
                                                        <div className="font-medium">{selectedBeneficiary.residence_district}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Block</div>
                                                        <div className="font-medium">{selectedBeneficiary.residence_block}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Total Txns</div>
                                                        <div className="font-medium">{selectedBeneficiary.total_txns}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Avg Amount</div>
                                                        <div className="font-medium">₹{selectedBeneficiary.avg_amount.toFixed(0)}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Last 30d Txns</div>
                                                        <div className="font-medium">{selectedBeneficiary.txns_last_30d}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Unique Dealers</div>
                                                        <div className="font-medium">{selectedBeneficiary.unique_dealers}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Cross-District</div>
                                                        <div className="font-medium text-red-600">{selectedBeneficiary.cross_district_txns}</div>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded">
                                                        <div className="text-gray-500 text-xs">Household Size</div>
                                                        <div className="font-medium">{selectedBeneficiary.household_size}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Risk Reasons / Explanations */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">🧠 AI Explanations</h4>
                                                <ul className="space-y-2">
                                                    {selectedBeneficiary.risk_reasons.map((reason, index) => (
                                                        <li key={index} className="flex items-start gap-2 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm">
                                                            <span className="w-5 h-5 bg-red-500 text-white rounded text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                !
                                                            </span>
                                                            <span className="text-red-800">{reason}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            Click on a beneficiary from the table to view detailed risk analysis and AI-generated explanations.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* District Heatmap */}
                            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-heading font-semibold text-gray-900">District Anomaly Heatmap</h3>
                                </div>
                                <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                                    {districtRisks.slice(0, 10).map((district) => (
                                        <div key={district.residence_district}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-700 truncate">{district.residence_district}</span>
                                                <span className="font-medium">{district.anomaly_count}</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded overflow-hidden">
                                                <div
                                                    className="h-full bg-red-500"
                                                    style={{ width: `${(district.anomaly_count / maxAnomalyCount) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Info */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
                        <p className="font-medium text-blue-800 mb-1">🔬 How It Works</p>
                        <p className="text-sm text-blue-700">
                            Autoencoder ML model reconstructs normal beneficiary behavior. High reconstruction error 
                            (Mean Squared Error) indicates deviation from normal patterns → potential anomaly.
                            Explanations are feature-level: cross-district usage, high transactions, multiple dealers.
                        </p>
                        {summary?.last_model_run && (
                            <p className="text-xs text-blue-600 mt-2">
                                Last model run: {new Date(summary.last_model_run).toLocaleString()}
                            </p>
                        )}
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
                        <Button href="/technology">Explore Technology</Button>
                        <Button variant="secondary" href="/contact">Contact Us</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
