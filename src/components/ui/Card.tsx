import * as React from 'react';
import { cn } from '../../lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'sheet';
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {

        const variants = {
            default: "bg-surface-dark border border-white/5 rounded-xl shadow-lg",
            glass: "bg-surface-dark/20 backdrop-blur-sm border-b border-white/5",
            sheet: "bg-surface-dark rounded-t-[1.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.5)] border-t border-white/5",
        };

        return (
            <div
                ref={ref}
                className={cn(variants[variant], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";
