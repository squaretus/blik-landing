import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from '@/components/ui/Spinner';

describe('Spinner', () => {
  it('рендерит крутящийся индикатор с дефолтным размером md', () => {
    const { container } = render(<Spinner />);
    const el = container.firstElementChild;
    expect(el).toHaveClass('animate-spin');
    expect(el).toHaveClass('h-8', 'w-8');
  });

  it('размер sm', () => {
    const { container } = render(<Spinner size="sm" />);
    expect(container.firstElementChild).toHaveClass('h-5', 'w-5');
  });

  it('размер lg', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.firstElementChild).toHaveClass('h-12', 'w-12');
  });
});
