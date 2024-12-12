'use client';

import Form from 'next/form';
import InputForm from '@/components/form/InputForm';
import SubmitForm from '../form/SubmitForm';
import { updateCategory } from '@/hooks/use-category';
import { HandleForm } from '@/hooks/use-form';
import { Input } from '../ui/input';
import { Category } from '@prisma/client';
import { useState } from 'react';
import ImagePreview from '../customs/ImagePreview';

type EditCategoryFormProps = {
  category: Category;
};

const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const { state, formAction, isPending } = HandleForm(updateCategory, '/admin/categories');

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    };
  };

  return (
    <Form action={formAction} className='flex flex-col gap-6'>

      <Input defaultValue={category.id} type='hidden' name='id' />

      <div className='flex flex-col gap-2'>
        <InputForm
          defaultValue={category.name}
          label='ชื่อหมวดหมู่'
          type='text'
          name='name'
          required
        />
        {state.errors?.name && (
          <p className='text-sm text-red-500'>{state.errors.name[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <ImagePreview file={file} defaultImage={category.imageUrl} placeholder='No image selected' />
        <InputForm
          label='ภาพหมวดหมู่ (ไม่จำเป็น)'
          type='file'
          name='newImage'
          onChange={handleFileChange}
        />
        {state.errors?.image && (
          <p className='text-sm text-red-500'>{state.errors.image[0]}</p>
        )}
      </div>

      <SubmitForm name='บันทึกข้อมูล' size='lg' pending={isPending} />
    </Form>
  );
};
export default EditCategoryForm;