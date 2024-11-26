export const validateImageFile = (file) => {
  if (!file) {
    throw new Error('No file selected');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  if (file.size > 32 * 1024 * 1024) {
    throw new Error('Image must be less than 32MB');
  }
};

export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};