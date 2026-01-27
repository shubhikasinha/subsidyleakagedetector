interface CardProps {
    title?: string;
    children: React.ReactNode;
    icon?: string;
    className?: string;
}

export default function Card({ title, children, icon, className = '' }: CardProps) {
    return (
        <div className={`card group ${className}`}>
            {icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                    <span className="text-2xl">{icon}</span>
                </div>
            )}
            {title && (
                <h3 className="text-lg font-heading font-semibold text-primary mb-3">{title}</h3>
            )}
            <div className="text-gray-600 leading-relaxed">{children}</div>
        </div>
    );
}
