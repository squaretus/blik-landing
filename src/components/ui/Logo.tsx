import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Логотип `.blik` — стилизованный «орб» (точка перед словом «blik») + mono-надпись.
 * Цвета орба и glow-halo берутся из CSS-переменных `--logo-orb-bg` / `--logo-orb-glow`,
 * которые переопределяются в темах `:root` / `[data-theme="dark"]` в `globals.css`.
 * Текст наследует `text-text-primary`.
 */
type LogoSize = 'sm' | 'md' | 'lg';

// SVG-эталон: orb r=170, glow r=440 → ratio 2.59:1
const SIZE_MAP: Record<LogoSize, { orb: number; glow: number; font: string; gap: string }> = {
  sm: { orb: 12, glow: 31, font: 'text-base', gap: 'gap-1.5' },
  md: { orb: 14, glow: 36, font: 'text-lg',   gap: 'gap-2'   },
  lg: { orb: 18, glow: 47, font: 'text-2xl',  gap: 'gap-2.5' },
};

interface LogoProps {
  href?: string | null;
  size?: LogoSize;
  className?: string;
}

export function Logo({ href = '/', size = 'md', className = '' }: LogoProps) {
  const { orb, glow, font, gap } = SIZE_MAP[size];

  // Размер blur пропорционален эталону (SVG: blur 48 на canvas 1024 = ~4.7%
  // от ширины canvas). Для нашего glow = ~5% от его размера.
  const blurPx = Math.max(1, Math.round(glow * 0.05));

  const orbStyle: CSSProperties = {
    width: orb,
    height: orb,
    background: 'var(--logo-orb-bg)',
    boxShadow: 'var(--logo-orb-rim)',
  };
  const glowStyle: CSSProperties = {
    width: glow,
    height: glow,
    background: 'var(--logo-orb-glow)',
    filter: `blur(${blurPx}px)`,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  };
  const textStyle: CSSProperties = {
    fontFamily: 'var(--blik-font-mono)',
    letterSpacing: '-0.02em',
  };

  const content: ReactNode = (
    <span className={`inline-flex items-center ${gap} select-none ${className}`}>
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: orb, height: orb }}
      >
        <span className="absolute rounded-full" style={glowStyle} />
        <span className="relative rounded-full" style={orbStyle} />
      </span>
      <span className={`${font} font-medium tracking-tight text-text-primary`} style={textStyle}>
        blik
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} className="inline-flex shrink-0">
      {content}
    </Link>
  );
}
