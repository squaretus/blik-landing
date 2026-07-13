'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';

/**
 * Единая кнопка проекта: лендинг, ЛК, админка.
 *
 * Визуальная база — gradient border + inset glow, адаптированы из
 * `kokonutd/button-shiny` (21st.dev). Палитра — наш бренд-teal (`--accent`),
 * не purple оригинала. Все варианты используют CSS-переменные `--accent`,
 * `--bg-secondary`, `--danger` etc. — автоматически переключаются между
 * темами через `[data-theme="dark"]`.
 *
 * `asChild` (radix Slot) нужен для landing-страницы: `<a>` теги стилизуем как
 * кнопки без потери семантики ссылки.
 */
const buttonVariants = cva(
  // База: layout + focus + disabled. `before` рисует тонкую верхнюю подсветку
  // (имитация edge-light из kokonutd), не мешает hover-фону.
  'relative inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
    'whitespace-nowrap transition-all duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ' +
    'focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 ' +
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // accent — основной CTA. Solid teal + inset-glow.
        accent:
          'bg-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ' +
          'hover:bg-accent-hover',
        // secondary — outlined, для второстепенных действий.
        secondary:
          'bg-bg-secondary text-text-primary border border-border-primary ' +
          'hover:border-accent/50 hover:text-text-primary',
        // danger — деструктив (удаление, отозвать).
        danger:
          'bg-danger text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ' +
          'hover:opacity-90',
        // ghost — прозрачный, для toolbar-кнопок и иконок.
        ghost:
          'bg-transparent text-text-primary hover:bg-bg-tertiary',
        // link — текстовая, без фона.
        link:
          'bg-transparent text-accent underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-xs [&_svg]:size-3.5',
        md: 'h-10 px-4 text-sm [&_svg]:size-4',
        lg: 'h-12 px-6 text-base [&_svg]:size-5',
        icon: 'h-9 w-9 p-0 [&_svg]:size-4',
        // row — table action button. Меньше md, без полной paddings.
        row: 'h-7 px-2 text-xs [&_svg]:size-3.5',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        data-loading={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="opacity-80">{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
