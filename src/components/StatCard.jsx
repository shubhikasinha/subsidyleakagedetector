export default function StatCard({ value, label, icon, trend }) {
    return (
        <div className="bg-white rounded-xl shadow-md border border-neutral-dark/20 p-6 text-center hover:shadow-lg transition-all duration-200">
            {icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">{icon}</span>
                </div>
            )}
            <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
            {trend && (
                <div className={`mt-2 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.positive ? '↑' : '↓'} {trend.value}
                </div>
            )}
        </div>
    );
}
