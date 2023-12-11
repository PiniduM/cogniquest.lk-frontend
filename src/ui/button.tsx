import React from "react";

type ButtonProps = {
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = "primary",
  children,
  disabled = false,
  className,
  style = {},
  icon,
  size = "medium",
}) => {
  const getVariantClass = (): string => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 text-white hover:scale-95 transition duration-300"; // Tailwind classes for primary variant
      case "secondary":
        return "bg-gray-300 text-gray-700 hover:scale-95 transition duration-300"; // Tailwind classes for secondary variant
      case "danger":
        return "bg-red-500 text-white hover:scale-95 transition duration-300"; // Tailwind classes for danger variant
      default:
        return "bg-blue-500 text-white hover:scale-95 transition duration-300"; // Default Tailwind classes
    }
  };

  const getSizeClass = (): string => {
    switch (size) {
      case "small":
        return "py-1 px-2 text-sm";
      case "large":
        return "py-3 px-6 text-lg";
      default:
        return "py-2 px-4 text-base";
    }
  };

  return (
    <button
      className={`rounded ${getVariantClass()} ${getSizeClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
