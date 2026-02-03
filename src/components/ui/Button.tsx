import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:bg-primary-glow shadow-[0_4px_14px_rgba(19,127,236,0.4)]",
                secondary: "bg-[#233648] text-white hover:bg-[#233648]/80 hover:text-primary",
                ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
                outline: "border border-white/5 bg-transparent text-white hover:bg-white/5",
                danger: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-11 px-6 text-base",
                lg: "h-14 px-8 text-lg",
                icon: "size-10 p-0",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="animate-spin mr-2">⟳</span>
                ) : null}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";
