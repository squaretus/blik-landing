import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { createElement, Fragment } from 'react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// ── next/navigation ─────────────────────────────────────────────────────────
// Компоненты под тест дёргают навигационные хуки на маунте; в jsdom App Router
// контекста нет — отдаём безопасные no-op-заглушки.
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// ── framer-motion ───────────────────────────────────────────────────────────
// Passthrough: motion.<tag> → обычный DOM-тег (motion-only пропы отбрасываем),
// AnimatePresence → Fragment. Так тесты видят финальный DOM без анимаций.
vi.mock('framer-motion', () => {
  const MOTION_ONLY_PROPS = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'variants',
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileInView',
    'whileDrag',
    'layout',
    'layoutId',
    'drag',
    'dragConstraints',
    'onAnimationComplete',
    'viewport',
  ]);

  const stripMotionProps = (props: Record<string, unknown>) => {
    const clean: Record<string, unknown> = {};
    for (const key of Object.keys(props)) {
      if (!MOTION_ONLY_PROPS.has(key)) clean[key] = props[key];
    }
    return clean;
  };

  const motionProxy = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        return ({ children, ...props }: Record<string, unknown> & { children?: unknown }) =>
          createElement(tag, stripMotionProps(props), children as never);
      },
    },
  );

  // Motion value: минимальная заглушка с get/set/on, достаточная для хуков.
  const makeMotionValue = (initial: unknown) => {
    let current = initial;
    return {
      get: () => current,
      set: (v: unknown) => {
        current = v;
      },
      on: () => () => {},
      onChange: () => () => {},
      destroy: () => {},
    };
  };

  return {
    motion: motionProxy,
    m: motionProxy,
    AnimatePresence: ({ children }: { children?: unknown }) =>
      createElement(Fragment, null, children as never),
    MotionConfig: ({ children }: { children?: unknown }) =>
      createElement(Fragment, null, children as never),
    LayoutGroup: ({ children }: { children?: unknown }) =>
      createElement(Fragment, null, children as never),
    useMotionValue: (initial: unknown) => makeMotionValue(initial),
    useTransform: () => makeMotionValue(0),
    useSpring: (v: unknown) => (v && typeof v === 'object' ? v : makeMotionValue(v)),
    useReducedMotion: () => false,
    animate: () => ({ stop: () => {}, then: (r: () => void) => Promise.resolve().then(r) }),
  };
});

// ── localStorage / sessionStorage ────────────────────────────────────────────
// jsdom под некоторыми версиями Node (≥25) не отдаёт рабочий Storage: компоненты
// вроде ThemeToggle падают на `localStorage.getItem is not a function`. Ставим
// in-memory Storage-стаб явно, чтобы тесты были независимы от версии рантайма.
class StorageStub implements Storage {
  private store = new Map<string, string>();
  get length(): number {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}
for (const prop of ['localStorage', 'sessionStorage'] as const) {
  Object.defineProperty(window, prop, {
    writable: true,
    configurable: true,
    value: new StorageStub(),
  });
}
afterEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});

// ── window.matchMedia ───────────────────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
