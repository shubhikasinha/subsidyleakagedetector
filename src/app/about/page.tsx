import { Button } from '@/components/Button';

const timeline = [
    {
        year: '2024',
        title: 'Project Inception',
        description: 'Conceptualized as part of Hack-4Viksit Bharat initiative',
    },
    {
        year: '2025',
        title: 'Prototype Development',
        description: 'Built cloud-native platform on Google Cloud Platform',
    },
    {
        year: '2026',
        title: 'Pilot Phase',
        description: 'Testing with anonymized sample datasets',
    },
    {
        year: '2047',
        title: 'Viksit Bharat Vision',
        description: 'Contributing to transparent welfare ecosystem',
    },
];

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
                        A practical step toward a fairer, more accountable welfare ecosystem—aligned
                        with the vision of Viksit Bharat 2047.
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
                                    of schemes, and regional variations, traditional audit mechanisms struggle to
                                    monitor misuse in real time.
                                </p>
                                <p>
                                    Public finance studies and Comptroller and Auditor General (CAG) reports
                                    estimate that <strong>20-40% of subsidy value</strong> is lost to inefficiencies
                                    or leakage across large-scale schemes.
                                </p>
                                <p>
                                    JanAvlokan addresses this critical need for a <strong>scalable, privacy-preserving,
                                        and explainable intelligence system</strong> that can flag high-risk patterns early,
                                    assist administrators in prioritizing audits, and preserve fairness for genuine
                                    beneficiaries.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-gray-900 mb-4 text-lg border-b border-gray-200 pb-3">
                                Vision Statement
                            </h3>
                            <p className="text-gray-700">
                                To transform reactive audits into proactive governance intelligence,
                                strengthening transparency and public trust in India&apos;s welfare delivery system.
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

            {/* Timeline */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Project Timeline
                        </h2>
                        <p className="text-gray-600">Journey to Viksit Bharat</p>
                    </div>

                    <div className="space-y-4">
                        {timeline.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="w-16 h-10 bg-primary text-white rounded flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    {item.year}
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex-1">
                                    <h3 className="font-heading font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Viksit Bharat Section - White */}
            <section className="py-12 md:py-16 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="flex justify-center gap-2 mb-6">
                        <span className="w-5 h-5 rounded-full bg-govt-saffron"></span>
                        <span className="w-5 h-5 rounded-full bg-gray-300"></span>
                        <span className="w-5 h-5 rounded-full bg-govt-green"></span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                        Supporting Viksit Bharat 2047
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                        JanAvlokan is part of the Hack-4Viksit Bharat initiative, contributing to
                        India&apos;s vision of becoming a developed nation by 2047 through transparent,
                        efficient, and accountable governance.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="/technology">
                            Explore Our Technology
                        </Button>
                        <Button variant="secondary" href="/contact">
                            Partner With Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
