import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full"
};

export default function Container({ children, size = "xl", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 md:px-8 lg:px-12", sizeMap[size], className)}>
      {children}
    </div>
  );
}
