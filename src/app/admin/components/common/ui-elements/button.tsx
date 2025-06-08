import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary buttons
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        success: "bg-success text-white hover:bg-success/90",
        danger: "bg-danger text-white hover:bg-danger/90",
        warning: "bg-warning text-white hover:bg-warning/90",
        info: "bg-info text-white hover:bg-info/90",

        // Outline buttons
        "outline-primary": "border-2 border-primary text-primary hover:bg-primary/10",
        "outline-secondary": "border-2 border-secondary text-secondary hover:bg-secondary/10",
        "outline-success": "border-2 border-success text-success hover:bg-success/10",
        "outline-danger": "border-2 border-danger text-danger hover:bg-danger/10",
        "outline-warning": "border-2 border-warning text-warning hover:bg-warning/10",
        "outline-info": "border-2 border-info text-info hover:bg-info/10",

        // Ghost buttons
        ghost: "hover:bg-gray-100 text-gray-700",
        "ghost-primary": "hover:bg-primary/10 text-primary",
        "ghost-secondary": "hover:bg-secondary/10 text-secondary",
        "ghost-success": "hover:bg-success/10 text-success",
        "ghost-danger": "hover:bg-danger/10 text-danger",
        "ghost-warning": "hover:bg-warning/10 text-warning",
        "ghost-info": "hover:bg-info/10 text-info",

        // Link buttons
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    rounded,
    fullWidth,
    asChild = false,
    leftIcon,
    rightIcon,
    isLoading,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, fullWidth, className }),
          isLoading && "relative !text-transparent transition-none hover:!text-transparent",
          disabled && "cursor-not-allowed"
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
