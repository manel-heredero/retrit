import { API_URL } from '../constants/apiConstants';

export const uploadImage = async (base64Image) => {
  try {
    const response = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to upload image');
    }

    return data.url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};
