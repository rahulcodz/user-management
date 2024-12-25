import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePosts } from '@/hooks/api/use-posts';
import React from 'react';

function TasksTasks() {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(posts as any)?.map((post: any) => (
            <TableRow key={post.id}>
              <TableCell className='font-medium'>{post.title}</TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell>{post.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TasksTasks;
