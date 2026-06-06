interface UserAvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8 text-base",
  md: "h-10 w-10 text-lg",
  lg: "h-12 w-12 text-xl",
};

export default function UserAvatar({ name, className = "", size = "md" }: UserAvatarProps) {
  const initial = name ? name.charAt(0).toUpperCase() : "A";
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-tr from-[#d97a60] to-[var(--color-accent)] border-2 border-[var(--color-border-light)] shadow-sm overflow-hidden flex items-center justify-center text-[#ffffff] font-bold shrink-0 ${className}`}
    >
      {initial}
    </div>
  );
}
