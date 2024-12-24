import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePosts } from '@/hooks/api/use-posts';

export function PostsPage() {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Posts</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(posts as any)?.map((post: any) => (
            <TableRow key={post.id}>
              <TableCell className='font-medium'>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
