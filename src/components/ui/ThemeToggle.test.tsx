import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ThemeToggle } from '@/components/ui/ThemeToggle';

describe('ThemeToggle', () => {
  it('рендерит кнопку переключения темы', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Переключить тему' })).toBeInTheDocument();
  });

  it('по умолчанию (нет storage, matchMedia=false) тема тёмная — подсказка «Светлая тема»', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Светлая тема');
  });

  it('инициализируется из localStorage (light)', () => {
    window.localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Тёмная тема');
  });

  it('клик переключает тему: пишет в localStorage и ставит data-theme на html', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    // старт — dark
    await user.click(btn);
    expect(window.localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(btn).toHaveAttribute('title', 'Тёмная тема');

    await user.click(btn);
    expect(window.localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('применяет переданный className', () => {
    render(<ThemeToggle className="extra-cls" />);
    expect(screen.getByRole('button')).toHaveClass('extra-cls');
  });
});
