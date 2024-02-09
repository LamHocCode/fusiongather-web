interface Props {
    size?: "medium" | "small"
}

const Logo = ({ size }: Props) => {
    return (
        <div>
            <span className={`${size === "medium" && "text-3xl"}
            ${size === "small" && "text-xl"}
            ${!size && "text-4xl"}
            ${!size ? "drop-shadow-lg shadow-black textShadow" : 'primaryShadow'} font-extrabold text-primary `}>
                FusionGather
            </span>
        </div>
    );
}

export default Logo;