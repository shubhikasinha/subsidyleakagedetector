'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'white';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ children, variant = 'primary', href, onClick, className = '', type, ...props }: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg';

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white py-3 px-6 shadow-md hover:shadow-lg',
        secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 px-6',
        accent: 'bg-accent hover:bg-accent-light text-primary py-3 px-6 shadow-md hover:shadow-lg',
        ghost: 'bg-transparent text-primary hover:bg-neutral-light py-2 px-4',
        white: 'bg-white text-primary hover:bg-neutral-light py-3 px-6 shadow-md hover:shadow-lg',
    };

    const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={buttonStyles} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={buttonStyles} onClick={onClick} type={type} {...props}>
            {children}
        </button>
    );
}

export default Button;
