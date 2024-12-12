'use client';

import Form from 'next/form';
import InputForm from '@/components/form/InputForm';
import SubmitForm from '@/components/form/SubmitForm';
import { HandleForm } from '@/hooks/use-form';
import { createCategory } from '@/hooks/use-category';
import { useState } from 'react';
import ImagePreview from '@/components/customs/ImagePreview';

const CreateCategoryForm = () => {
  const { state, formAction, isPending } = HandleForm(createCategory, '/admin/categories');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    };
  };

  return (
    <Form action={formAction} className='flex flex-col gap-6 p-4'>
      <div className='flex flex-col gap-2'>
        <InputForm
          label='ชื่อหมวดหมู่'
          type='text'
          name='name'
          placeholder='Ex. Mobile, Computer. etc...'
          required
        />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2 '>
        <ImagePreview file={file} placeholder="No image selected" />
        <InputForm
          label='ภาพหมวดหมู่ (ไม่จำเป็น)'
          type='file'
          name='image'
          onChange={handleFileChange}
        />
        {state.errors?.image && (
          <p className="text-sm text-red-500">{state.errors.image[0]}</p>
        )}
      </div>

      <SubmitForm name='บันทึก' pending={isPending} />
    </Form>
  );
};
export default CreateCategoryForm;