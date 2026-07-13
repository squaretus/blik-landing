'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NeonBorder } from '@/components/ui/NeonBorder';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

/* ============================================================
   Animation variants
   ============================================================ */

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const featureStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const defaultTransition = { duration: 0.6, ease: EASE_OUT };
const defaultViewport = { once: false, amount: 0.3 };

/* ============================================================
   Navbar
   ============================================================ */

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <a
            href="#features"
            className="hidden shrink-0 text-sm text-text-tertiary transition-colors hover:text-text-primary sm:block"
          >
            Возможности
          </a>
          <a
            href="#showcase"
            className="hidden shrink-0 text-sm text-text-tertiary transition-colors hover:text-text-primary sm:block"
          >
            Интерфейсы
          </a>

          <ThemeToggle />

          <Button asChild>
            <a href="https://github.com/squaretus/blik/releases/latest">Скачать</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Dot-grid background */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* Gradient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={defaultViewport}
      >
        {/* macOS badge with live pulse */}
        <motion.div
          className="mb-6 inline-flex items-center rounded-full border border-border-subtle bg-bg-secondary px-4 py-1.5 text-sm text-text-secondary"
          variants={fadeUp}
          transition={defaultTransition}
        >
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full bg-success"
            style={{ animation: 'live-pulse 2s ease-in-out infinite' }}
          />
          macOS
        </motion.div>

        <motion.h1
          className="mb-4 max-w-3xl text-5xl font-medium tracking-tight sm:text-7xl"
          style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
          variants={fadeUp}
          transition={defaultTransition}
        >
          Полный контроль над{' '}
          <span className="text-accent">охлаждением</span>
        </motion.h1>

        <motion.p
          className="mb-8 max-w-xl text-lg text-text-secondary sm:text-xl"
          style={{ lineHeight: 1.6 }}
          variants={fadeUp}
          transition={defaultTransition}
        >
          Мониторинг температур и управление скоростью кулеров
          вашего Mac в реальном времени.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          variants={fadeUp}
          transition={defaultTransition}
        >
          <Button asChild size="lg">
            <a
              href="https://github.com/squaretus/blik/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Скачать
            </a>
          </Button>

          <Button asChild variant="ghost" size="lg">
            <a href="#features">Подробнее</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Features
   ============================================================ */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="transition-transform duration-300 hover:-translate-y-1"
      variants={fadeUp}
      transition={defaultTransition}
    >
      <NeonBorder borderRadius={12} bgColor="var(--bg-primary)">
        <div className="rounded-xl bg-bg-primary p-6">
          <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
            {icon}
          </div>
          <h3 className="mb-2 text-[17px] font-semibold text-text-primary">{title}</h3>
          <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
        </div>
      </NeonBorder>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.h2
        className="mx-auto mb-12 max-w-6xl text-center text-3xl font-medium tracking-tight sm:text-4xl"
        style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        transition={defaultTransition}
      >
        Возможности
      </motion.h2>

      <motion.div
        className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={featureStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        <FeatureCard
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
            </svg>
          }
          title="Мониторинг температур"
          description="CPU, GPU, SSD, батарея, WiFi и ещё 60+ сенсоров через SMC. Цветовая индикация — зелёный, жёлтый, красный."
        />
        <FeatureCard
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          }
          title="Управление кулерами"
          description="Пресеты 0–100%, ручная установка RPM, переключение AUTO/MANUAL. Авто-восстановление при выходе."
        />
        <FeatureCard
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
          title="Три интерфейса"
          description="Терминальный TUI-дашборд, MenuBar-приложение и CLI в PATH. Выбирайте удобный способ."
        />
      </motion.div>
    </section>
  );
}

/* ============================================================
   Showcase
   ============================================================ */

function Showcase() {
  return (
    <section id="showcase" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.h2
        className="mx-auto mb-16 max-w-6xl text-center text-3xl font-medium tracking-tight sm:text-4xl"
        style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        transition={defaultTransition}
      >
        Интерфейсы
      </motion.h2>

      <div className="mx-auto max-w-7xl">
        {/* === Mobile: sequential cards === */}
        <div className="flex flex-col gap-12 md:hidden">
          {/* Terminal + text */}
          <div className="flex flex-col gap-4">
            <NeonBorder borderRadius={12}>
              <Image
                src="/landing/assets/terminal.png"
                alt=".blik терминальный TUI-дашборд"
                width={1200}
                height={600}
                className="block h-auto w-full"
              />
            </NeonBorder>
            <motion.div
              className="text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: 0.15 }}
            >
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-text-primary">
                Полноценный дашборд в терминале
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                TUI-интерфейс с табличным отображением всех сенсоров, управлением
                кулерами и цветовой индикацией температур. Работает через SSH —
                удобно на серверах и headless-Mac.
              </p>
            </motion.div>
          </div>

          {/* MenuBar + text */}
          <div className="flex flex-col items-center gap-4">
            <NeonBorder borderRadius={16}>
              <Image
                src="/landing/assets/menu_bar.png"
                alt=".blik MenuBar-приложение"
                width={600}
                height={1200}
                className="block h-auto w-auto max-h-[480px]"
              />
            </NeonBorder>
            <motion.div
              className="text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: 0.15 }}
            >
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-text-primary">
                Все под рукой в MenuBar
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                Температуры всех датчиков, скорость вращения кулеров и быстрые
                пресеты — всегда доступны в один клик из строки меню macOS.
              </p>
            </motion.div>
          </div>
        </div>

        {/* === Desktop: overlapping images + descriptions below === */}
        <div className="hidden md:block">
          <div className="relative flex items-end justify-center" style={{ minHeight: '600px' }}>
            <div
              className="relative z-10 w-[76%] transition-transform duration-300 hover:z-30 hover:-translate-y-2"
              style={{ marginRight: '-4%' }}
            >
              <NeonBorder borderRadius={12}>
                <Image
                  src="/landing/assets/terminal.png"
                  alt=".blik терминальный TUI-дашборд"
                  width={1200}
                  height={600}
                  className="block h-auto w-full"
                />
              </NeonBorder>
            </div>

            <div
              className="relative z-20 transition-transform duration-300 hover:z-30 hover:-translate-y-2"
              style={{ marginLeft: '-4%' }}
            >
              <NeonBorder borderRadius={16}>
                <Image
                  src="/landing/assets/menu_bar.png"
                  alt=".blik MenuBar-приложение"
                  width={600}
                  height={1200}
                  className="block h-auto w-auto max-h-[640px]"
                />
              </NeonBorder>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8">
            <motion.div
              className="text-left"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: 0.3 }}
            >
              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-text-primary">
                Полноценный дашборд в терминале
              </h3>
              <p className="whitespace-pre-line text-base leading-relaxed text-text-secondary">
                {'TUI-интерфейс с табличным отображением всех сенсоров,\nуправлением кулерами и цветовой индикацией температур.\nРаботает через SSH — удобно на серверах и headless-Mac.'}
              </p>
            </motion.div>

            <motion.div
              className="text-right"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ ...defaultTransition, delay: 0.45 }}
            >
              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-text-primary">
                Все под рукой в MenuBar
              </h3>
              <p className="whitespace-pre-line text-base leading-relaxed text-text-secondary">
                {'Температуры всех датчиков, скорость вращения кулеров\nи быстрые пресеты — всегда в быстром доступе.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */

function CTA() {
  return (
    <section className="border-t border-border-subtle bg-bg-secondary py-20">
      <motion.div
        className="px-4 text-center sm:px-6 lg:px-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        transition={defaultTransition}
      >
        <h2
          className="mx-auto mb-4 max-w-6xl text-3xl font-medium tracking-tight sm:text-4xl"
          style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          Готовы взять контроль в свои руки?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-text-secondary">
          Установите .blik и настройте охлаждение вашего Mac за пару минут.
        </p>
        <Button asChild size="lg">
          <a
            href="https://github.com/squaretus/blik/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Скачать бесплатно
          </a>
        </Button>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t border-border-subtle py-8 text-sm text-text-tertiary">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} .blik. Все права защищены.</p>
        <a
          href="https://github.com/squaretus/blik"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-text-tertiary transition-colors hover:text-text-primary"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </footer>
  );
}

/* ============================================================
   Главная страница
   ============================================================ */

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <CTA />
      <Footer />
    </div>
  );
}
