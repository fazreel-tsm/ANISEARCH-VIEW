import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  let baseClasses =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors";

  let variantClasses = "";

  switch (variant) {
    case "secondary":
      variantClasses =
        "bg-blue-500/20 text-blue-700 dark:text-blue-300";
      break;
    case "outline":
      variantClasses =
        "border border-[2px] border-border text-text";
      break;
    default:
      variantClasses =
        "bg-purple-500/20 text-purple-700 dark:text-purple-300";
  }

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
