'use client';

import Form from 'next/form';
import InputForm from '@/components/form/InputForm';
import SubmitForm from '../form/SubmitForm';
import { SelectForm } from '@/components/form/SelectForm';
import { HandleForm } from '@/hooks/use-form';
import { Input } from '../ui/input';
import { Category, Product } from '@prisma/client';
import { updateProduct } from '@/hooks/use-product';
import { useState } from 'react';
import ImagePreview from '../customs/ImagePreview';

type EditProductFormProps = {
  product: Product;
  categories: Category[]
};

const EditProductForm = ({ product, categories }: EditProductFormProps) => {
  const { state, formAction, isPending } = HandleForm(updateProduct, '/admin/products');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    };
  };

  return (
    <Form action={formAction} className='flex flex-col gap-6'>
      <Input type='hidden' name='id' defaultValue={product.id} />

      <div className='flex flex-col gap-2'>
        <InputForm
          defaultValue={product.name}
          label='ชื่อสินค้า'
          type='text'
          name='name'
        />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <SelectForm
          someData={categories}
          name='categoryId'
          label='หมวดหมู่'
          defaultValue={product.categoryId}
        />
        {state.errors?.categoryId && (
          <p className="text-sm text-red-500">{state.errors.categoryId[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <ImagePreview file={file} defaultImage={product.imageUrl} placeholder='No image selected' />
        <InputForm
          label='ภาพสินค้า (ไม่จำเป็น)'
          type='file'
          name='newImage'
          onChange={handleFileChange}
        />
        {state.errors?.image && (
          <p className='text-sm text-red-500'>{state.errors.image[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <InputForm
          defaultValue={product.price?.toString() ?? '0'}
          label='ราคา'
          type='number'
          name='price'
        />
        {state.errors?.price && (
          <p className="text-sm text-red-500">{state.errors.price[0]}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <InputForm
          defaultValue={product.quantity?.toString() ?? '0'}
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

      <SubmitForm name='บันทึกข้อมูล' size='lg' pending={isPending} />
    </Form>
  );
};

export default EditProductForm;

