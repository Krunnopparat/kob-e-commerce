'use client';

import Form from 'next/form';
import InputForm from '@/components/form/InputForm';
import SubmitForm from '@/components/form/SubmitForm';
import { HandleForm } from '@/hooks/use-form';
import { SelectForm } from '@/components/form/SelectForm';
import { Category } from '@prisma/client';
import { createProduct } from '@/hooks/use-product';
import { useState } from 'react';
import ImagePreview from '@/components/customs/ImagePreview';

type EditCategoryFormProps = {
  categories: Category[];
};

const CreateProductForm = ({ categories }: EditCategoryFormProps) => {
  const { state, formAction, isPending } = HandleForm(createProduct, '/admin/products');
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
          label='ชื่อสินค้า'
          type='text'
          name='name'
          placeholder='Ex. iPhone 16 Pro Max, Macbook Air, etc...'
          required
        />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <SelectForm someData={categories as Category[]} name='categoryId' label='หมวดหมู่' required />
        {state.errors?.categoryId && (
          <p className="text-sm text-red-500">{state.errors.categoryId[0]}</p>
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

      <div className='flex flex-col gap-2'>
        <InputForm
          label='ราคา'
          type='number'
          name='price'
          placeholder='Ex. 10000, 25000'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <InputForm
          label='จำนวนสินค้า'
          type='number'
          name='quantity'
          placeholder='Ex. 5, 10'
          required
        />
        {state.errors?.quantity && (
          <p className="text-sm text-red-500">{state.errors.quantity[0]}</p>
        )}
      </div>
        
      <SubmitForm name='บันทึก' pending={isPending} />
    </Form>
  );
};
export default CreateProductForm;