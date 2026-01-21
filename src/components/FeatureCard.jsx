export default function FeatureCard({ icon, title, description, highlights = [] }) {
    return (
        <div className="bg-white rounded-xl shadow-md border border-neutral-dark/20 p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">{icon}</span>
            </div>

            <h3 className="text-xl font-heading font-semibold text-primary mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

            {highlights.length > 0 && (
                <ul className="space-y-2">
                    {highlights.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
