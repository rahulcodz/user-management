import { Button } from '@/components/ui/button';
import Select from 'react-select';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useNewTask, usePosts } from '@/hooks/api/use-posts';
import TasksTasks from './table';

const options = [
  { value: '676a501416e367bc7cc35cf8', label: 'test' },
  { value: '676a5bdf8bea204e5cd05550', label: 'admin@email.com' },
  { value: '676a61188bea204e5cd05562', label: 'satish' },
  { value: '676a90375cf3c0cda42f9ea6', label: 'Rahul' },
  { value: '676a91795cf3c0cda42f9eb2', label: 'Parth' },
  { value: '676a91ac5cf3c0cda42f9eb9', label: 'Sarthak' },
  { value: '676a95a05cf3c0cda42f9ec1', label: 'akib' },
  { value: '676a98cd5cf3c0cda42f9ecd', label: 'john' },
  { value: '676be8058db63d60f875fca2', label: 'Captain America' },
];

const PostsPage = () => {
  // const { data: posts, isLoading } = usePosts();
  const mutation = useNewTask();
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    assignee: [],
    assigned: [],
    startDate: '2024-12-24T10:49:16.501Z',
    endDate: '2024-12-24T10:49:16.501Z',
  });

  // State for error messages
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    assignee: '',
  });

  // Handle input change for normal form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAssigneeChange = (selectedOptions: any) => {
    setFormValues({
      ...formValues,
      assignee: selectedOptions || [],
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {
      title: formValues.title ? '' : 'Title is required',
      description: formValues.description ? '' : 'Description is required',
      assignee: formValues.assignee.length > 0 ? '' : 'At least one assignee is required',
    };

    setErrors(newErrors);

    // Return true if no errors
    return Object.values(newErrors).every((error) => error === '');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form data
      (formValues as any).assigned =
        (formValues?.assignee?.length > 0 && formValues?.assignee?.map((i: any) => i.value)) || [];
      console.log('Form submitted:', formValues);
      await mutation.mutateAsync(formValues);
      handleClose();
      // Reset form or handle other post-submit logic
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Tasks</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Task</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Task Action</DialogTitle>
              <DialogDescription>
                Make changes to the task here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
              {/* Title Field */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='title' className='text-right'>
                  Title
                </Label>
                <Input
                  id='title'
                  name='title'
                  value={formValues.title}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='Title'
                />
              </div>
              {errors.title && <div className='ml-[99px] text-red-500'>{errors.title}</div>}

              {/* Description Field */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Textarea
                  id='description'
                  name='description'
                  value={formValues.description}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='Description'
                />
              </div>
              {errors.description && (
                <div className='ml-[99px] text-red-500'>{errors.description}</div>
              )}

              {/* Assignee Multi-Select Field */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='assignee' className='text-right'>
                  Assignee
                </Label>
                <Select
                  id='assignee'
                  name='assignee'
                  value={formValues.assignee}
                  onChange={handleAssigneeChange}
                  options={options as any}
                  isMulti
                  className='col-span-3'
                  placeholder='Select assignees'
                />
              </div>
              {errors.assignee && <div className='ml-[99px] text-red-500'>{errors.assignee}</div>}

              {/* Dialog Footer */}
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
      <TasksTasks />
    </div>
  );
};

export default PostsPage;
