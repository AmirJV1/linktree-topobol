import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children, variant = 'primary', fullWidth = false, className = '', ...props
}) => {
    const base = "px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const styles = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary"
    };
    return (
        <button className={`${base} ${styles[variant]} ${fullWidth ? "w-full" : ""} ${className}`} {...props}>
            {children}
        </button>
    );
};
