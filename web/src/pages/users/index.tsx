import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNewUser, useUsers } from '@/hooks/api/use-users';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const mutation = useNewUser();

  const [open, setOpen] = useState(false); // State to handle dialog visibility
  const [selectedUser, setSelectedUser] = useState<any>(null); // State to store selected user for editing

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedUser?.name || '',
      userName: selectedUser?.userName || '',
      email: selectedUser?.email || '',
      password: selectedUser?.password || '',
      userRole: selectedUser?.userRole || '2', // Assuming '2' is the default user role
    },
  });
  // Function to open dialog with the selected user
  const handleEditClick = (user: any) => {
    setSelectedUser(user); // Set selected user data
    setOpen(true); // Open dialog
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    setOpen(false); // Close dialog
    setSelectedUser(null); // Reset selected user
  };

  const onSubmit = async (data: any) => {
    data.userType = Number(data?.userRole);
    await mutation.mutateAsync(data);
    // onSave(data); // Call the onSave function with the form data
    handleClose(); // Close the dialog after saving
  };

  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Users</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant='outline'>Add User</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>User Action</DialogTitle>
                <DialogDescription>
                  Make changes to the user profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    {...register('name', { required: 'Name is required' })}
                    className='col-span-3'
                    placeholder='John Doe'
                  />
                </div>
                <div className='ml-[99px]'>
                  {errors.name && (
                    <span className='text-red-500'>{(errors as any)?.name?.message}</span>
                  )}
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='username' className='text-right'>
                    Username
                  </Label>
                  <Input
                    id='username'
                    {...register('userName', { required: 'Username is required' })}
                    className='col-span-3'
                    placeholder='johndoe'
                  />
                </div>
                <div className='ml-[99px]'>
                  {errors.userName && (
                    <span className='text-red-500'>{(errors as any)?.userName?.message}</span>
                  )}
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-right'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    {...register('email', { required: 'Email is required' })}
                    className='col-span-3'
                    placeholder='john@email.com'
                  />
                </div>
                <div className='ml-[99px]'>
                  {errors.email && (
                    <span className='text-red-500'>{(errors as any)?.email?.message}</span>
                  )}
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='password' className='text-right'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    {...register('password', { required: 'Password is required' })}
                    className='col-span-3'
                    type='password'
                    placeholder='*****'
                  />
                </div>
                <div className='ml-[99px]'>
                  {errors.password && (
                    <span className='text-red-500'>{(errors as any)?.password?.message}</span>
                  )}
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='userRole' className='text-right'>
                    User Role
                  </Label>
                  <Select
                    {...register('userRole')}
                    onValueChange={(e) => {
                      setValue('userRole', e);
                    }}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='User Role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>User Role</SelectLabel>
                        <SelectItem value='1'>Admin</SelectItem>
                        <SelectItem value='2'>User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type='submit'>Save changes</Button>
                  <Button variant='outline' onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(users as any)?.map((user: any) => (
              <TableRow key={user?.id}>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.userName}</TableCell>
                <TableCell>
                  {user?.userType === 1 ? (
                    <Badge variant='secondary'>Admin</Badge>
                  ) : (
                    <Badge>User</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant='outline'
                    size='icon'
                    className='me-2'
                    onClick={() => handleEditClick(user)} // Trigger edit dialog
                  >
                    <Edit />
                  </Button>
                  <Button variant='destructive' size='icon'>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
