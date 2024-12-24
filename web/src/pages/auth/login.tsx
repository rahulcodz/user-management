import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    login('fake-token', {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    });

    navigate('/admin/dashboard');
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='john@example.com' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' placeholder='••••••••' required />
          </div>
          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            Don't have account{' '}
            <a
              href='/auth/register'
              className='font-medium text-primary underline underline-offset-4'
            >
              Register
            </a>
          </p>
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Loading...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
