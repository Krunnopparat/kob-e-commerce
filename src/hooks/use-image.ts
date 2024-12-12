const uploadImage = async (file: File | null) => {
  if (file?.size === 0) {
    console.log('No image to upload');
    return null;
  };

  const API_KEY = process.env.PRIVATE_KEY;
  const API_URL = 'https://upload.imagekit.io/api/v2/files/upload';

  const formData = new FormData();
  formData.append('file', file as File);
  formData.append('fileName', file?.name as string);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${API_KEY}:`)}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.log('fetch failed');
      throw new Error('Failed to upload image');
    };

    const data = await response.json();

    return data;

  } catch (error) {
    console.log(error);
    return null;
  };
};

const handleUploadImage = async (file: File | null) => {
  if (file?.size === 0) {
    return {
      imageUrl: null,
      imageId: null,
    };
  };

  const result = await uploadImage(file);

  return {
    imageUrl: result?.url,
    imageId: result?.fileId,
  };
};

const removeImage = async (fileId: string) => {
  const API_KEY = process.env.PRIVATE_KEY;
  const API_URL = `https://api.imagekit.io/v1/files/${fileId}`

  try {
   await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${btoa(`${API_KEY}:`)}`,
      },
    });
  } catch (error) {
    console.error(error);
  };
};

export { handleUploadImage, removeImage };