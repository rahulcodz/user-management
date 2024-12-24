import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   register({
  //     id: 1,
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //   });

  //   navigate('/auth/login');
  //   setLoading(false);
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await register(data);
    navigate('/auth/login');
    setLoading(false);
  };

  const password = watch('password');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id='email'
                  type='email'
                  placeholder='john@example.com'
                  // required
                  // error={!!errors.email}
                />
              )}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Controller
              name='username'
              control={control}
              rules={{
                required: 'Username is required',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id='username'
                  type='text'
                  placeholder='johndoe'
                  // required
                  // error={!!errors.username}
                />
              )}
            />
            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  // required
                  // error={!!errors.password}
                />
              )}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Controller
              name='confirmPassword'
              control={control}
              rules={{
                required: 'Confirm Password is required',
                validate: (value) => value === password || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••••'
                  // required
                  // error={!!errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword.message}</p>
            )}
          </div>

          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            Already have an account?{' '}
            <a href='/auth/login' className='font-medium text-primary underline underline-offset-4'>
              Login
            </a>
          </p>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
