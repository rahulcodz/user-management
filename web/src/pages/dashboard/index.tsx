import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useUsers } from '@/hooks/api/use-users';
// import { usePosts } from '@/hooks/api/use-posts';

export function DashboardPage() {
  // const { data: users } = useUsers();
  // const { data: posts } = usePosts();
  const users = {};
  const posts = {};

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{(users as any)?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{(posts as any)?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
