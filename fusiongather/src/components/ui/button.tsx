interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`flex justify-center rounded-md px-3 py-4 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-2 border-black hover:opacity-75    
                ${disabled && 'opacity-50 cursor-default'}
                ${fullWidth && 'w-full'}
                ${secondary ? 'text-gray-300' : 'text-black'}
                ${danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'}
                ${!secondary && !danger && 'bg-primary hover:opacity-50 '}
            `}
        >
            {children}
        </button>
    );
}

export default Button;
