import { Button } from '../components';

const features = [
    {
        title: 'Anomaly Detection Without Labeled Fraud Data',
        description: 'JanAvlokan uses unsupervised learning to identify deviations from normal behavior, eliminating the dependency on pre-labeled fraud datasets which are rare and delayed in public finance systems.',
        highlights: [
            'Isolation Forest as primary detector',
            'Autoencoders for pattern reconstruction',
            'DBSCAN for density-based clustering',
            'No dependency on labeled training data',
        ],
    },
    {
        title: 'Privacy-Safe Collusion Detection',
        description: 'The platform detects patterns such as shared bank accounts or devices using irreversibly hashed identifiers, enabling detection of coordinated misuse while fully preserving beneficiary privacy.',
        highlights: [
            'All identifiers are irreversibly hashed',
            'No PII enters the cloud',
            'Location data generalized to regions',
            'Compliant with data protection principles',
        ],
    },
    {
        title: 'Policy-Aware Risk Calibration',
        description: 'Risk thresholds dynamically adapt based on scheme type, region, and time period. Seasonal surges and policy-driven variations are accounted for to reduce false positives.',
        highlights: [
            'Scheme-specific thresholds',
            'Regional baseline adjustments',
            'Seasonal variation handling',
            'Continuous model recalibration',
        ],
    },
    {
        title: 'Explainable Audit Narratives',
        description: 'Each flagged case is accompanied by a human-readable explanation outlining contributing behavioral signals—designed for administrative review, audits, and legal defensibility.',
        highlights: [
            'Feature importance breakdowns',
            'Behavioral signal explanations',
            'Audit-ready documentation',
            'Legal defensibility focus',
        ],
    },
    {
        title: 'Geographic Risk Heatmaps',
        description: 'Aggregated risk scores are visualized at district or block levels, allowing administrators to identify regional concentrations of anomalous behavior and allocate audit resources efficiently.',
        highlights: [
            'District-level visualization',
            'Block-level drill-down',
            'Resource allocation insights',
            'Regional trend analysis',
        ],
    },
    {
        title: 'Real-Time Processing',
        description: 'Built on Google Cloud Platform for scalability and reliability, JanAvlokan can process 100M+ transactions using distributed computing and optimized data pipelines.',
        highlights: [
            '100M+ transaction capacity',
            'Distributed ETL pipelines',
            'Real-time risk scoring',
            'Batch prediction support',
        ],
    },
];

const mlFeatures = [
    'Rolling claim frequency patterns',
    'Deviation from personal baselines',
    'Deviation from scheme-level baselines',
    'Cross-scheme overlap detection',
    'Hashed shared identifier analysis',
    'Temporal spike indicators',
    'Geographic clustering signals',
    'Behavioral sequence modeling',
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - White */}
            <section className="bg-white py-12 md:py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                        Key Capabilities
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl">
                        Powered by unsupervised machine learning, privacy-preserving technology,
                        and explainable AI for transparent governance.
                    </p>
                </div>
            </section>

            {/* Features List */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="space-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-4">
                                    <span className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-lg font-heading font-semibold text-gray-900">{feature.title}</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 mb-4">{feature.description}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {feature.highlights.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ML Features */}
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <div className="border-l-4 border-primary pl-6 mb-6">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                    Machine Learning Features
                                </h2>
                            </div>
                            <p className="text-gray-700 mb-4">
                                JanAvlokan employs a hybrid unsupervised ensemble approach, analyzing
                                multiple behavioral and transactional features to detect anomalies.
                            </p>
                            <p className="text-gray-700 mb-6">
                                The model outputs a normalized risk score (0-1), risk category, and
                                contributing feature signals to ensure transparency and explainability.
                            </p>
                            <Button to="/technology">
                                Explore Technology Stack
                            </Button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                                Feature Signals Analyzed
                            </h3>
                            <ul className="space-y-2">
                                {mlFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="w-5 h-5 bg-gray-100 border border-gray-300 rounded text-xs flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Risk Scoring */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Risk Scoring Output
                        </h2>
                        <p className="text-gray-600">Clear, actionable intelligence for administrators</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-green-100 px-4 py-3 border-b border-gray-200">
                                <span className="font-heading font-bold text-green-800">0.0 - 0.3</span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-heading font-semibold text-gray-900 mb-2">Low Risk</h3>
                                <p className="text-sm text-gray-600">Normal behavioral patterns within expected parameters</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-amber-100 px-4 py-3 border-b border-gray-200">
                                <span className="font-heading font-bold text-amber-800">0.3 - 0.7</span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-heading font-semibold text-gray-900 mb-2">Medium Risk</h3>
                                <p className="text-sm text-gray-600">Some deviation detected, recommended for review</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-red-100 px-4 py-3 border-b border-gray-200">
                                <span className="font-heading font-bold text-red-800">0.7 - 1.0</span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-heading font-semibold text-gray-900 mb-2">High Risk</h3>
                                <p className="text-sm text-gray-600">Significant anomalies detected, priority audit recommended</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - White */}
            <section className="py-12 md:py-16 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                        See JanAvlokan in Action
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Explore our interactive dashboard demonstration
                    </p>
                    <Button to="/dashboard">
                        View Risk Dashboard Demo
                    </Button>
                </div>
            </section>
        </div>
    );
}
