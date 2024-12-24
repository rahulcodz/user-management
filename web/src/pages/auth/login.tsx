import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { userService } from '@/services/api/users';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [register_errors, set_register_errors] = useState('');

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   const res = await userService.loginUser(user);

  //   login('fake-token', {
  //     id: 1,
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //   });

  //   navigate('/admin/dashboard');
  //   setLoading(false);
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log(data);
      const res = await userService.loginUser(data);
      localStorage.setItem('token', res?.data?.accessToken);
      login(res?.data?.accessToken, {
        id: 1,
        name: 'John Doe',
        email: data.email,
      });
      navigate('/admin/dashboard');
      setLoading(false);
    } catch (error) {
      set_register_errors('Something went wrong, please try again !!');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
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

          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            Don't have an account?{' '}
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
          {register_errors && <p className='text-red-500'>{register_errors}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
