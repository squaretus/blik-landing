'use client';

import type { CSSProperties, FC, PropsWithChildren } from 'react';

interface IProps {
  /** Дополнительный CSS-класс на wrapper */
  className?: string;
  /** Толщина обводки в px */
  borderWidth?: number;
  /** Радиус скругления в px */
  borderRadius?: number;
  /** Скорость вращения в секундах */
  speed?: number;
  /** Размытие glow в px */
  glowBlur?: number;
  /** Прозрачность glow 0-1 */
  glowOpacity?: number;
  /** Цвет фона внутри обводки */
  bgColor?: string;
}

/**
 * NeonBorder — обёртка с вращающейся неоновой обводкой.
 *
 * Техника: @property --neon-angle анимирует угол conic-gradient.
 * Не используется transform, чтобы не конфликтовать с filter.
 *
 * Структура:
 * .neon-wrap > .neon-glow (размытый ring) + .neon-border > .neon-content (children)
 */
export const NeonBorder: FC<PropsWithChildren<IProps>> = ({
  children,
  className = '',
  borderWidth = 1.5,
  borderRadius = 10,
  speed = 3,
  glowBlur = 12,
  glowOpacity = 0.6,
  bgColor = 'var(--bg-primary)',
}) => {
  const vars = {
    '--neon-r': `${borderRadius}px`,
    '--neon-w': `${borderWidth}px`,
    '--neon-speed': `${speed}s`,
    '--neon-glow-blur': `${glowBlur}px`,
    '--neon-glow-opacity': glowOpacity,
    '--neon-bg': bgColor,
  } as CSSProperties;

  return (
    <div className={`neon-wrap ${className}`.trim()} style={vars}>
      <div className="neon-glow" />
      <div className="neon-border">
        <div className="neon-content">
          {children}
        </div>
      </div>
    </div>
  );
};
