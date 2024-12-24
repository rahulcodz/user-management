import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Posts', href: '/admin/posts', icon: FileText },
];

export function Sidebar() {
  return (
    <aside className='w-64 border-r min-h-[calc(100vh-4rem)]'>
      <nav className='flex flex-col gap-2 p-4'>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
              )
            }
          >
            <item.icon className='h-4 w-4' />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
