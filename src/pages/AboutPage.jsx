import { Button } from '../components';

const principles = [
    {
        title: 'Privacy First',
        description: 'No personally identifiable information enters the cloud. All sensitive identifiers are irreversibly hashed.',
    },
    {
        title: 'Transparency',
        description: 'Every flagged case comes with human-readable explanations for administrative review and audit defensibility.',
    },
    {
        title: 'Fairness',
        description: 'Advisory-only system that never blocks or delays welfare payments to genuine beneficiaries.',
    },
    {
        title: 'Human-in-the-Loop',
        description: 'Final decisions always rest with human administrators. AI provides intelligence, not verdicts.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - White */}
            <section className="bg-white py-12 md:py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                        About JanAvlokan
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl">
                        A welfare intelligence platform designed to support transparent and accountable
                        subsidy delivery across India's welfare ecosystem.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="border-l-4 border-primary pl-6 mb-6">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                    Our Mission
                                </h2>
                            </div>

                            <div className="prose prose-lg text-gray-700 space-y-4">
                                <p>
                                    Government welfare programs in India serve millions daily across food security,
                                    education, energy, and employment schemes. Due to the massive scale, diversity
                                    of schemes, and regional variations, traditional audit mechanisms need modern
                                    technological support to monitor distribution effectively.
                                </p>
                                <p>
                                    JanAvlokan provides a <strong>scalable, privacy-preserving,
                                        and explainable intelligence system</strong> that flags high-risk patterns early,
                                    assists administrators in prioritizing audits, and preserves fairness for genuine
                                    beneficiaries.
                                </p>
                                <p>
                                    The platform operates as an advisory layer, ensuring that welfare delivery
                                    continues uninterrupted while providing administrators with actionable insights.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg border-b border-gray-200 pb-3">
                                Vision Statement
                            </h3>
                            <p className="text-gray-700">
                                To transform reactive audits into proactive governance intelligence,
                                strengthening transparency and public trust in India's welfare delivery system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Principles */}
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Core Principles
                        </h2>
                        <p className="text-gray-600">Built on foundations of privacy, transparency, and ethical AI</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {principles.map((principle, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5">
                                <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center font-bold text-sm mb-3">
                                    {index + 1}
                                </div>
                                <h3 className="font-heading font-semibold text-gray-900 mb-2">{principle.title}</h3>
                                <p className="text-sm text-gray-600">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            System Integration
                        </h2>
                        <p className="text-gray-600">Designed to work seamlessly with existing infrastructure</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg">Compatible Systems</h3>
                            <ul className="space-y-3">
                                {[
                                    'Direct Benefit Transfer (DBT) Platform',
                                    'Public Financial Management System (PFMS)',
                                    'Aadhaar-based Payment Bridge (ABPS)',
                                    'State-level welfare databases',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg">Supported Schemes</h3>
                            <ul className="space-y-3">
                                {[
                                    'PM-KISAN (Agriculture Support)',
                                    'MGNREGA (Employment Guarantee)',
                                    'PDS (Food Distribution)',
                                    'Ujjwala (LPG Subsidy)',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                        Learn More
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                        Explore our technology stack or access the dashboard to see the platform in action.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button to="/technology">
                            Technical Documentation
                        </Button>
                        <Button variant="secondary" to="/dashboard">
                            Access Dashboard
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
