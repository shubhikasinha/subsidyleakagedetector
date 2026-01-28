import { Button } from '../components';
import { Link } from 'react-router-dom';

// Key stats for quick display
const quickStats = [
    { value: '4.2 Cr', label: 'Beneficiaries Monitored' },
    { value: '12', label: 'Welfare Schemes' },
    { value: '28', label: 'States Covered' },
    { value: '₹18,450 Cr', label: 'Transactions This Month' },
];

// State data for India map
const stateMarkers = [
    { name: 'J&K', x: 175, y: 65, flagged: '1,234', risk: 'medium' },
    { name: 'Punjab', x: 175, y: 110, flagged: '2,456', risk: 'low' },
    { name: 'Rajasthan', x: 160, y: 175, flagged: '4,567', risk: 'low' },
    { name: 'Gujarat', x: 120, y: 230, flagged: '3,890', risk: 'low' },
    { name: 'Maharashtra', x: 175, y: 285, flagged: '6,789', risk: 'medium' },
    { name: 'Karnataka', x: 180, y: 350, flagged: '2,345', risk: 'low' },
    { name: 'Tamil Nadu', x: 210, y: 400, flagged: '3,456', risk: 'low' },
    { name: 'Kerala', x: 185, y: 420, flagged: '1,890', risk: 'low' },
    { name: 'UP', x: 265, y: 165, flagged: '12,847', risk: 'high' },
    { name: 'Bihar', x: 330, y: 185, flagged: '8,234', risk: 'high' },
    { name: 'MP', x: 225, y: 225, flagged: '5,123', risk: 'medium' },
    { name: 'West Bengal', x: 365, y: 230, flagged: '4,567', risk: 'medium' },
    { name: 'Odisha', x: 325, y: 275, flagged: '3,234', risk: 'medium' },
    { name: 'Assam', x: 420, y: 175, flagged: '1,567', risk: 'low' },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Logo */}
            <section className="py-12 md:py-16 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        {/* Large Logo */}
                        <img
                            src="/logojan.jpeg"
                            alt="JanAvlokan Logo"
                            className="h-32 md:h-40 w-auto mx-auto mb-6"
                        />

                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
                            Welfare Intelligence Platform
                        </h1>

                        <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                            AI-powered decision support system for transparent subsidy delivery.
                            JanAvlokan analyzes welfare transaction patterns to flag potential
                            leakage while ensuring genuine beneficiaries receive uninterrupted support.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Button to="/analytics">
                                View Analytics
                            </Button>
                            <Button variant="secondary" to="/dashboard">
                                Risk Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-6 bg-gray-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                <div className="text-xl md:text-2xl font-heading font-bold text-primary">{stat.value}</div>
                                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* India Map with State-wise Data */}
            <section className="py-10 md:py-14">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-2">
                            State-wise Risk Monitoring
                        </h2>
                        <div className="flex justify-center gap-6 text-sm">
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-600"></span> High Risk</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-600"></span> Low</span>
                        </div>
                    </div>

                    {/* India Map SVG with Markers */}
                    <div className="relative max-w-lg mx-auto">
                        <svg viewBox="0 0 500 500" className="w-full h-auto">
                            {/* India outline */}
                            <path
                                d="M150,50 L175,40 L200,35 L230,30 L260,32 L290,40 L320,55 L350,75 L380,100 L395,130 L400,160 L395,195 L385,230 L375,265 L360,300 L340,340 L310,380 L275,420 L235,450 L195,455 L165,440 L145,400 L130,355 L115,310 L105,265 L100,220 L100,175 L105,135 L115,100 L130,70 Z"
                                fill="#FEF3C7"
                                stroke="#D97706"
                                strokeWidth="2"
                            />

                            {/* State markers with labels */}
                            {stateMarkers.map((state, index) => (
                                <g key={index}>
                                    {/* Outer pulse circle */}
                                    <circle
                                        cx={state.x}
                                        cy={state.y}
                                        r={state.risk === 'high' ? 20 : state.risk === 'medium' ? 16 : 12}
                                        fill="none"
                                        stroke={state.risk === 'high' ? '#B91C1C' : state.risk === 'medium' ? '#D97706' : '#059669'}
                                        strokeWidth="2"
                                        opacity="0.3"
                                    />
                                    {/* Main circle */}
                                    <circle
                                        cx={state.x}
                                        cy={state.y}
                                        r={state.risk === 'high' ? 14 : state.risk === 'medium' ? 10 : 7}
                                        fill={state.risk === 'high' ? '#B91C1C' : state.risk === 'medium' ? '#D97706' : '#059669'}
                                        opacity="0.9"
                                    />
                                    {/* State name label (only for high risk) */}
                                    {state.risk === 'high' && (
                                        <>
                                            <line
                                                x1={state.x + 15}
                                                y1={state.y}
                                                x2={state.x + 35}
                                                y2={state.y - 15}
                                                stroke="#374151"
                                                strokeWidth="1"
                                            />
                                            <text
                                                x={state.x + 38}
                                                y={state.y - 18}
                                                fontSize="11"
                                                fontWeight="bold"
                                                fill="#1F2937"
                                            >
                                                {state.name}
                                            </text>
                                            <text
                                                x={state.x + 38}
                                                y={state.y - 6}
                                                fontSize="10"
                                                fill="#B91C1C"
                                            >
                                                {state.flagged} cases
                                            </text>
                                        </>
                                    )}
                                </g>
                            ))}

                            {/* Title */}
                            <text x="250" y="485" textAnchor="middle" fontSize="11" fill="#6B7280">
                                JanAvlokan | Real-time Welfare Monitoring
                            </text>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-10 bg-gray-50 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-primary font-bold">1</span>
                            </div>
                            <h3 className="font-heading font-semibold text-gray-900 mb-2">Privacy-First</h3>
                            <p className="text-sm text-gray-600">
                                All PII is hashed before processing. No personal data enters the cloud.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-primary font-bold">2</span>
                            </div>
                            <h3 className="font-heading font-semibold text-gray-900 mb-2">Advisory Only</h3>
                            <p className="text-sm text-gray-600">
                                Never blocks or delays payments. Provides risk intelligence for human review.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-primary font-bold">3</span>
                            </div>
                            <h3 className="font-heading font-semibold text-gray-900 mb-2">Explainable AI</h3>
                            <p className="text-sm text-gray-600">
                                Every flagged case includes human-readable explanations for audit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-10 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <img src="/logojan.jpeg" alt="JanAvlokan" className="h-12 w-auto opacity-70" />
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Ministry of Electronics & Information Technology | Government of India
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button to="/analytics">View Full Analytics</Button>
                        <Button variant="secondary" to="/about">Learn More</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
