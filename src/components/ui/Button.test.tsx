import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('рендерит children и по умолчанию вариант accent', () => {
    render(<Button>Сохранить</Button>);
    const btn = screen.getByRole('button', { name: 'Сохранить' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('bg-accent');
  });

  it('применяет классы варианта secondary', () => {
    render(<Button variant="secondary">S</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-bg-secondary');
  });

  it('применяет классы варианта danger', () => {
    render(<Button variant="danger">D</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-danger');
  });

  it('применяет классы варианта ghost', () => {
    render(<Button variant="ghost">G</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('применяет классы варианта link', () => {
    render(<Button variant="link">L</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-accent');
  });

  it('применяет классы размера sm', () => {
    render(<Button size="sm">small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
  });

  it('применяет классы размера lg', () => {
    render(<Button size="lg">large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');
  });

  it('вызывает onClick по клику', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('isLoading рендерит спиннер, дизейблит кнопку и не вызывает onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <Button isLoading onClick={onClick}>
        Загрузка
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('data-loading', 'true');
    // children всё ещё видимы рядом со спиннером
    expect(screen.getByText('Загрузка')).toBeInTheDocument();
    // спиннер — div с animate-spin
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disabled пропс дизейблит кнопку', () => {
    render(<Button disabled>x</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('asChild рендерит дочерний элемент вместо button, сохраняя стили', () => {
    render(
      <Button asChild>
        <a href="/go">Ссылка</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Ссылка' });
    expect(link).toHaveAttribute('href', '/go');
    expect(link).toHaveClass('bg-accent');
    // button-роли быть не должно
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('пробрасывает className поверх вариантов', () => {
    render(<Button className="custom-x">x</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-x');
  });
});
