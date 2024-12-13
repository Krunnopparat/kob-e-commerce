'use client';

import Form from 'next/form';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ImagePlus, Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HandleForm } from '@/hooks/use-form';
import { createCategory } from '@/hooks/use-category';

const CreateCategoryForm = () => {
  const { state, formAction, isPending } = HandleForm(createCategory, '/admin/categories');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className=" w-full md:w-[650px] shadow-lg">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
        <CardTitle className="text-2xl text-center">เพิ่มหมวดหมู่สินค้าใหม่</CardTitle>
        <CardDescription className="text-yellow-100 text-center">
          กรอกข้อมูลด้านล่างเพื่อสร้างหมวดหมู่สินค้าใหม่
        </CardDescription>
      </CardHeader>

      <Form action={formAction}>
        <CardContent className="space-y-6 pt-6">
          {/* Category Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              ชื่อหมวดหมู่ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="เช่น โทรศัพท์มือถือ, คอมพิวเตอร์"
              required
              className="h-11"
            />
            {state.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          <Separator />

          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label className="text-base">รูปภาพหมวดหมู่</Label>
            
            {/* Preview Area */}
            <div className="relative h-[200px] w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
              {preview ? (
                <div className="absolute inset-0">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <>
                  <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">ยังไม่ได้เลือกรูปภาพ</p>
                </>
              )}
            </div>

            {/* File Input */}
            <div>
              <Input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="cursor-pointer"
              />
              <p className="mt-1 text-sm text-gray-500">
                รองรับไฟล์: JPG, PNG หรือ GIF (ไม่เกิน 2MB)
              </p>
              {state.errors?.image && (
                <p className="text-sm text-red-500 mt-1">{state.errors.image[0]}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 bg-gray-50 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                บันทึก
              </>
            )}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default CreateCategoryForm;