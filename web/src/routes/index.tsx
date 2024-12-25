import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/auth/login';
import { DashboardPage } from '@/pages/dashboard';
import { UsersPage } from '@/pages/users';
import MainLayout from '@/layouts/MainLayout';
import { RegisterPage } from '@/pages/auth/register';
import PostsPage from '@/pages/posts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/admin/dashboard' replace />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
    ],
  },
]);
