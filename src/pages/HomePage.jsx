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
    { value: '100M+', label: 'Transactions Analyzed' },
    { value: '12', label: 'Schemes Monitored' },
    { value: '35', label: 'Districts Covered' },
    { value: '<1s', label: 'Risk Score Generation' },
];

const quickLinks = [
    { label: 'Risk Dashboard', path: '/dashboard', description: 'View real-time risk analysis' },
    { label: 'Features', path: '/features', description: 'Platform capabilities' },
    { label: 'Technology', path: '/technology', description: 'Technical documentation' },
    { label: 'Contact', path: '/contact', description: 'Support & assistance' },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - Government Style */}
            <section className="bg-white py-10 md:py-14 border-b-4 border-primary">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">ज</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-900">
                                        JanAvlokan
                                    </h1>
                                    <p className="text-primary font-medium">जनावलोकन</p>
                                </div>
                            </div>

                            <h2 className="text-lg md:text-xl text-gray-800 font-medium mb-4">
                                Welfare Intelligence Platform
                            </h2>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                A cloud-native, privacy-first decision-support platform for transparent
                                subsidy delivery. Powered by unsupervised machine learning to detect
                                potential leakage while ensuring welfare delivery remains uninterrupted.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Button to="/dashboard">
                                    Access Dashboard
                                </Button>
                                <Button variant="secondary" to="/about">
                                    About Platform
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Platform Statistics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center p-3 bg-white rounded border border-gray-200">
                                        <div className="text-xl md:text-2xl font-heading font-bold text-primary">{stat.value}</div>
                                        <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links - Government Portal Style */}
            <section className="py-8 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <span className="text-primary font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-gray-900 text-sm">{link.label}</h3>
                                        <p className="text-xs text-gray-500">{link.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Overview - Formal Government Style */}
            <section className="py-10 md:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="border-l-4 border-primary pl-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900">
                                    About This Platform
                                </h2>
                            </div>

                            <div className="prose text-gray-700 space-y-4">
                                <p>
                                    JanAvlokan operates as an <strong>advisory intelligence layer</strong> over
                                    existing DBT/PFMS systems. It analyzes behavioral and transactional patterns
                                    to assign risk scores while <strong>never blocking or delaying payments</strong>
                                    to genuine beneficiaries.
                                </p>
                            </div>

                            <div className="mt-6 grid sm:grid-cols-2 gap-3">
                                {[
                                    'Advisory layer over DBT / PFMS systems',
                                    'Human-in-the-loop governance model',
                                    'Early-warning signals for administrators',
                                    'Explainable insights for audit defensibility',
                                    'Privacy-first, cloud-native architecture',
                                    'Scheme-agnostic configuration',
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Important Notice - Government Style */}
                        <div className="space-y-4">
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                                <h4 className="font-heading font-semibold text-amber-900 mb-2">Important Notice</h4>
                                <p className="text-sm text-amber-800">
                                    This system is advisory-only. It does not approve, deny, or block any subsidy payments.
                                    Final decisions rest with authorized administrators.
                                </p>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                                <h4 className="font-heading font-semibold text-gray-900 mb-2">Key Principle</h4>
                                <p className="text-sm text-gray-700 italic">
                                    "JanAvlokan empowers administrators with intelligence.
                                    It never interferes with welfare delivery."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Capabilities - Minimal Design */}
            <section className="py-10 md:py-12 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-4 mb-8">
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900">
                            Key Capabilities
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center font-bold text-sm mb-3">
                                    {index + 1}
                                </div>
                                <h3 className="font-heading font-semibold text-gray-900 mb-2 text-sm">{feature.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supported Schemes - Government Info Table Style */}
            <section className="py-10 md:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-4 mb-8">
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900">
                            Supported Welfare Schemes
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-heading font-semibold text-gray-900">S.No.</th>
                                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-heading font-semibold text-gray-900">Scheme Name</th>
                                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-heading font-semibold text-gray-900">Category</th>
                                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-heading font-semibold text-gray-900">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'PM-KISAN', category: 'Agriculture', status: 'Active' },
                                    { name: 'MGNREGA', category: 'Employment', status: 'Active' },
                                    { name: 'PDS', category: 'Food Security', status: 'Active' },
                                    { name: 'Ujjwala', category: 'Energy', status: 'Active' },
                                ].map((scheme, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-4 py-3 text-sm text-center">{index + 1}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{scheme.name}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">{scheme.category}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-sm">
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">{scheme.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Footer CTA - Minimal */}
            <section className="py-8 bg-gray-50 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-gray-600 mb-4">
                        Access the risk dashboard for real-time monitoring and analysis
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button to="/dashboard">
                            Open Dashboard
                        </Button>
                        <Button variant="secondary" to="/technology">
                            Technical Documentation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
