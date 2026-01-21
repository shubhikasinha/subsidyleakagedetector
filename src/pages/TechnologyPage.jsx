import { Button } from '../components';

const gcpServices = [
    {
        name: 'Cloud Storage',
        description: 'Secure storage of anonymized raw datasets with encryption at rest',
    },
    {
        name: 'Dataflow',
        description: 'Distributed ETL and feature engineering pipelines for scalable processing',
    },
    {
        name: 'BigQuery',
        description: 'Analytics warehouse handling 100M+ transactions with partitioning and clustering',
    },
    {
        name: 'Vertex AI',
        description: 'Model training, versioning, batch prediction, and inference endpoints',
    },
    {
        name: 'Cloud Run',
        description: 'Serverless backend APIs for dashboard and real-time data access',
    },
    {
        name: 'Web Dashboard',
        description: 'Interactive interface for anomalies, explanations, and regional insights',
    },
];

const mlModels = [
    {
        name: 'Isolation Forest',
        role: 'Primary Anomaly Detector',
        description: 'Isolates anomalies by randomly selecting features and splitting values. Effective for high-dimensional data with no labeled samples.',
    },
    {
        name: 'Autoencoders',
        role: 'Pattern Reconstruction',
        description: 'Neural networks that learn to compress and reconstruct normal patterns. High reconstruction error indicates anomalies.',
    },
    {
        name: 'DBSCAN',
        role: 'Density-Based Clustering',
        description: 'Groups together closely packed points and marks points in low-density regions as outliers. Handles varying cluster densities.',
    },
];

const privacyMeasures = [
    {
        title: 'No PII in Cloud',
        description: 'No personally identifiable information enters the cloud infrastructure',
    },
    {
        title: 'Irreversible Hashing',
        description: 'All sensitive identifiers are irreversibly hashed before processing',
    },
    {
        title: 'Location Generalization',
        description: 'Location data is generalized into regional clusters for privacy',
    },
    {
        title: 'Human-in-the-Loop',
        description: 'Outputs are strictly advisory with human decision-making',
    },
];

export default function TechnologyPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - White */}
            <section className="bg-white py-12 md:py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                        Technology Stack
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl">
                        Built entirely on Google Cloud Platform, ensuring scalability,
                        reliability, and audit readiness.
                    </p>
                </div>
            </section>

            {/* Architecture Overview */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Cloud-Native Architecture
                        </h2>
                        <p className="text-gray-600">Scalable, secure, and designed for enterprise-grade deployments</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-4 py-3 text-left font-heading font-semibold text-gray-900">S.No.</th>
                                    <th className="border border-gray-200 px-4 py-3 text-left font-heading font-semibold text-gray-900">Service</th>
                                    <th className="border border-gray-200 px-4 py-3 text-left font-heading font-semibold text-gray-900">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gcpServices.map((service, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-4 py-3 text-center font-medium">{index + 1}</td>
                                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{service.name}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-600">{service.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ML Approach */}
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-l-4 border-primary pl-6 mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Machine Learning Approach
                        </h2>
                        <p className="text-gray-600">Hybrid unsupervised ensemble for robust anomaly detection</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {mlModels.map((model, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-primary px-4 py-3">
                                    <span className="text-white text-sm font-medium">{model.role}</span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-heading font-semibold text-gray-900 mb-2">{model.name}</h3>
                                    <p className="text-sm text-gray-600">{model.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-heading font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                            Ensemble Output
                        </h3>
                        <p className="text-gray-600 mb-4">
                            The hybrid ensemble combines outputs from all three models to produce:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                                <span className="font-semibold text-gray-900">Risk Score</span>
                                <p className="text-sm text-gray-600">(0-1 normalized)</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                                <span className="font-semibold text-gray-900">Risk Category</span>
                                <p className="text-sm text-gray-600">(Low/Medium/High)</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                                <span className="font-semibold text-gray-900">Feature Signals</span>
                                <p className="text-sm text-gray-600">(Explainable)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Privacy */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <div className="border-l-4 border-primary pl-6 mb-6">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                                    Privacy-First Design
                                </h2>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Privacy is central to JanAvlokan's architecture. The system ensures
                                compliance with data protection principles while maintaining analytical
                                effectiveness.
                            </p>
                            <p className="text-gray-700">
                                This approach enables powerful anomaly detection while fully preserving
                                beneficiary privacy and maintaining the trust essential for government systems.
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-primary px-4 py-3">
                                <span className="text-white font-medium">Privacy Measures</span>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {privacyMeasures.map((measure, index) => (
                                    <div key={index} className="p-4">
                                        <div className="flex items-start gap-3">
                                            <span className="w-6 h-6 bg-white border border-gray-300 rounded text-xs flex items-center justify-center font-medium flex-shrink-0">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{measure.title}</h4>
                                                <p className="text-sm text-gray-600">{measure.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scalability */}
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                            Scalability & Performance
                        </h2>
                        <p className="text-gray-600">Designed for national-scale deployment</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: '100M+', label: 'Transactions Processed' },
                            { value: '<1s', label: 'Risk Score Generation' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: 'Auto', label: 'Scaling Enabled' },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - White */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                        Experience the Technology
                    </h2>
                    <p className="text-gray-600 mb-8">
                        See how JanAvlokan processes and visualizes risk data
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button to="/dashboard">
                            View Dashboard Demo
                        </Button>
                        <Button variant="secondary" to="/contact">
                            Request Technical Demo
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
