export const validateImageFile = (file) => {
    const errors = [];
  
    // Check if file exists
    if (!file) {
      errors.push('No file selected');
      return errors;
    }
  
    // Validate file type
    if (!file.type.startsWith('image/')) {
      errors.push('Please select an image file');
    }
  
    // Validate file size (32MB = 32 * 1024 * 1024 bytes)
    if (file.size > 32 * 1024 * 1024) {
      errors.push('Image must be less than 32MB');
    }
  
    return errors;
  };
  
  export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  
  export const createImagePreview = (file) => {
    return URL.createObjectURL(file);
  };
  
  export const processImageFile = async (file) => {
    const validationErrors = validateImageFile(file);
    
    if (validationErrors.length > 0) {
      throw new Error(validationErrors[0]);
    }
  
    const previewUrl = createImagePreview(file);
    const base64 = await convertToBase64(file);
  
    return {
      preview: previewUrl,
      base64: base64
    };
  };