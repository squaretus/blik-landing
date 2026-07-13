import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NeonBorder } from '@/components/ui/NeonBorder';

describe('NeonBorder', () => {
  it('рендерит children внутри neon-content', () => {
    render(
      <NeonBorder>
        <span>Контент</span>
      </NeonBorder>,
    );
    const child = screen.getByText('Контент');
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass('neon-content');
  });

  it('добавляет переданный className к wrapper', () => {
    const { container } = render(
      <NeonBorder className="my-wrap">
        <span>x</span>
      </NeonBorder>,
    );
    const wrap = container.firstElementChild;
    expect(wrap).toHaveClass('neon-wrap');
    expect(wrap).toHaveClass('my-wrap');
  });

  it('пробрасывает кастомные пропсы в CSS-переменные', () => {
    const { container } = render(
      <NeonBorder borderWidth={4} borderRadius={20} speed={2} glowBlur={8} glowOpacity={0.3}>
        <span>x</span>
      </NeonBorder>,
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--neon-w')).toBe('4px');
    expect(wrap.style.getPropertyValue('--neon-r')).toBe('20px');
    expect(wrap.style.getPropertyValue('--neon-speed')).toBe('2s');
    expect(wrap.style.getPropertyValue('--neon-glow-blur')).toBe('8px');
    expect(wrap.style.getPropertyValue('--neon-glow-opacity')).toBe('0.3');
  });
});
