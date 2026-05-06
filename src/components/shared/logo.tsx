import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  showText?: boolean;
  href?: string;
  className?: string;
}

export function Logo({
  size = 48,
  showText = true,
  href,
  className,
}: LogoProps) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/Logo_Icon.png"
        alt="Tralytic logo"
        width={size}
        height={size}
        priority
      />
      {showText && (
        <span
          className="font-black leading-none"
          style={{ fontSize: size * 0.58 }}
        >
          <span className="text-white">Tra</span>
          <span className="text-[#29a8f5]">lytic</span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {inner}
      </Link>
    );
  }

  return inner;
}
