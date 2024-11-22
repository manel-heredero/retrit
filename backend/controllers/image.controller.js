import axios from 'axios';
import FormData from 'form-data';

const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB in bytes

export const uploadImage = async (req, res) => {
    try {
        const { image } = req.body;
        
        if (!image) {
            return res.status(400).json({
                success: false,
                message: 'No image provided'
            });
        }

        // Check file size before uploading
        const base64Size = Buffer.from(image.split(',')[1], 'base64').length;
        if (base64Size > MAX_FILE_SIZE) {
            return res.status(400).json({
                success: false,
                message: `Image size exceeds maximum limit of 32MB`
            });
        }

        // Create form data for ImgBB
        const formData = new FormData();
        formData.append('key', process.env.IMGBB_API_KEY);
        
        // Remove the data:image/xxx;base64 prefix
        const base64Image = image.split(',')[1];
        formData.append('image', base64Image);

        // Upload to ImgBB
        const response = await axios.post('https://api.imgbb.com/1/upload', formData);

        // Return just the image URL
        res.json({
            success: true,
            url: response.data.data.url
        });

    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message
        });
    }
};
