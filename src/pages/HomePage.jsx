import { Button, StatCard } from '../components';
import { Link } from 'react-router-dom';

const features = [
    {
        title: 'Anomaly Detection',
        description: 'Unsupervised learning to identify deviations without pre-labeled fraud data',
    },
    {
        title: 'Privacy-Safe Detection',
        description: 'Detect coordinated misuse using hashed identifiers while preserving privacy',
    },
    {
        title: 'Policy-Aware Calibration',
        description: 'Dynamic thresholds that adapt to scheme type, region, and seasonal variations',
    },
    {
        title: 'Explainable Insights',
        description: 'Human-readable explanations for every flagged case for audit defensibility',
    },
];

const stats = [
    { value: '20-40%', label: 'Estimated leakage in large schemes' },
    { value: '100M+', label: 'Transactions capacity' },
    { value: '10-30%', label: 'High-risk cases identified early' },
    { value: '0', label: 'Subsidies blocked or denied' },
];

const problems = [
    'Multiple overlapping welfare schemes across departments',
    'Valid identities exhibiting abnormal behavioral patterns',
    'Seasonal and regional variations making detection complex',
    'No labeled fraud data available for supervised learning',
    'Manual audits are reactive, identifying issues post-disbursement',
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - White with brown accent */}
            <section className="bg-white py-12 md:py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-6">
                            <span className="text-primary text-sm font-medium">Hack-4Viksit Bharat 2047</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                            JanAvlokan
                        </h1>
                        <p className="text-xl text-primary mb-2">जनावलोकन</p>

                        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                            AI-Powered Subsidy Leakage Detector for Transparent Welfare Delivery
                        </p>

                        <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
                            A cloud-native, privacy-first decision-support platform using unsupervised
                            machine learning to detect potential subsidy leakage while ensuring welfare
                            delivery remains uninterrupted.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button to="/dashboard">
                                View Risk Dashboard
                            </Button>
                            <Button variant="secondary" to="/features">
                                How It Works
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Why Subsidy Leakage Still Occurs
                        </h2>
                        <p className="text-gray-600">
                            Despite Aadhaar verification and PFMS transaction logging, leakage emerges
                            over time due to behavioral patterns and siloed audit mechanisms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg">Ground Reality</h3>
                            <ul className="space-y-3">
                                {problems.map((problem, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <span className="w-6 h-6 bg-primary text-white rounded text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span>{problem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg">CAG Reports Estimate</h3>
                            <div className="text-center py-6">
                                <p className="text-5xl font-heading font-bold text-primary mb-2">20-40%</p>
                                <p className="text-gray-600">of subsidy value lost to inefficiencies or leakage across large-scale schemes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Overview */}
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <div className="border-l-4 border-secondary pl-6 mb-6">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                    Advisory Intelligence Layer
                                </h2>
                                <p className="text-gray-600">Our Solution Approach</p>
                            </div>

                            <p className="text-gray-700 mb-6">
                                JanAvlokan acts as a decision-support platform—analyzing behavioral and
                                transactional patterns to assign risk scores while <strong>never blocking
                                    or delaying payments</strong>.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    'Advisory layer over DBT / PFMS systems',
                                    'Human-in-the-loop governance model',
                                    'Early-warning signals for administrators',
                                    'Explainable insights for audit defensibility',
                                    'Privacy-first, cloud-native architecture',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button to="/about">
                                Learn More About JanAvlokan
                            </Button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg border-b border-gray-200 pb-3">
                                Key Principle
                            </h3>
                            <div className="bg-amber-50 border border-amber-300 rounded p-4">
                                <p className="text-amber-900 font-medium text-center">
                                    "JanAvlokan empowers administrators with intelligence.
                                    It never interferes with welfare delivery."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Capabilities */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Key Capabilities
                        </h2>
                        <p className="text-gray-600">
                            Powered by unsupervised machine learning and privacy-preserving technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5">
                                <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center font-bold mb-3">
                                    {index + 1}
                                </div>
                                <h3 className="font-heading font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button variant="secondary" to="/features">
                            Explore All Features
                        </Button>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Projected Impact
                        </h2>
                        <p className="text-gray-600">
                            Based on global public finance benchmarks and pilot analysis
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 text-center">
                                <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - White background */}
            <section className="py-12 md:py-16 bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                        Transforming Reactive Audits into Proactive Governance
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        JanAvlokan represents the convergence of privacy-first design, explainable AI,
                        and scalable cloud infrastructure aligned with the vision of Viksit Bharat 2047.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button to="/technology">
                            Explore Technology
                        </Button>
                        <Button variant="secondary" to="/contact">
                            Get in Touch
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
