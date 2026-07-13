import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Page from '@/app/page';

// next/image тянет оптимизацию — отдаём обычный img.
vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img alt={alt} src={typeof src === 'string' ? src : ''} />
  ),
}));

describe('HomePage (landing)', () => {
  it('рендерит ключевые секции лендинга', () => {
    render(<Page />);

    expect(
      screen.getByRole('heading', { name: /Полный контроль над/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Возможности' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Интерфейсы' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Готовы взять контроль в свои руки?' }),
    ).toBeInTheDocument();
  });

  it('все кнопки «Скачать» ведут на GitHub Releases', () => {
    render(<Page />);

    const downloadLinks = screen
      .getAllByRole('link', { name: /Скачать/ })
      .map((el) => el.getAttribute('href'));

    expect(downloadLinks.length).toBeGreaterThanOrEqual(3); // navbar + hero + CTA
    for (const href of downloadLinks) {
      expect(href).toBe('https://github.com/squaretus/blik/releases/latest');
    }
  });

  it('не содержит ссылок на удалённые страницы (login/dashboard)', () => {
    render(<Page />);

    const hrefs = screen
      .getAllByRole('link')
      .map((el) => el.getAttribute('href') ?? '');

    expect(hrefs.some((h) => h.includes('/login') || h.includes('/dashboard'))).toBe(false);
  });
});
