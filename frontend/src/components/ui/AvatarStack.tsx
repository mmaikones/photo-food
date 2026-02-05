import Avatar from "@/components/ui/Avatar";

interface AvatarItem {
  src?: string;
  alt?: string;
  fallback: string;
}

interface AvatarStackProps {
  avatars: AvatarItem[];
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function AvatarStack({ avatars, max = 4, size = "md" }: AvatarStackProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - visible.length;

  const sizeMap = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-16 w-16 text-base"
  } as const;

  return (
    <div className="flex items-center">
      {visible.map((avatar, index) => (
        <div key={`${avatar.fallback}-${index}`} className={index === 0 ? "" : "-ml-3"}>
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 ? (
        <div
          className={`-ml-3 flex items-center justify-center rounded-full border border-white/10 bg-bg-elevated font-semibold text-white ${sizeMap[size]}`}
        >
          +{remaining}
        </div>
      ) : null}
    </div>
  );
}
