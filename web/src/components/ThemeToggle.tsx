import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant='outline' size='icon' className='p-0' onClick={toggleTheme}>
      {theme === 'dark' ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
