import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { LogOut } from 'lucide-react';

export function Header() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <header className='border-b'>
      <div className='flex h-16 items-center px-4 gap-4'>
        <div className='flex-1'>
          <h2 className='text-lg font-semibold'>Admin Dashboard</h2>
        </div>
        <ThemeToggle />
        <div className='flex items-center gap-4'>
          <span className='text-sm text-muted-foreground'>Welcome, {user?.name}</span>
          <Button variant='outline' size='icon' className='p-2' onClick={logout}>
            <LogOut className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </header>
  );
}
