/** Анимированный спиннер загрузки */
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }[size];
  return (
    <div className={`${sizeClass} animate-spin rounded-full border-2 border-accent border-t-transparent`} />
  );
}
