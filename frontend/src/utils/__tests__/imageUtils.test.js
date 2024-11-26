// Create this file in src/utils/__tests__/imageUtils.test.js

import { validateImageFile, createImagePreview, convertToBase64 } from '../imageUtils';

// Helper function to create a mock file
const createMockFile = (type, size) => {
  return {
    type,
    size,
    name: 'test.jpg'
  };
};

// Test validateImageFile
console.log('\nTesting validateImageFile:');
try {
  // Test valid image
  const validFile = createMockFile('image/jpeg', 1024 * 1024); // 1MB
  validateImageFile(validFile);
  console.log('✅ Valid image file passed');
} catch (error) {
  console.error('❌ Valid image test failed:', error.message);
}

try {
  // Test invalid type
  const invalidTypeFile = createMockFile('text/plain', 1024);
  validateImageFile(invalidTypeFile);
  console.error('❌ Invalid type test failed - should have thrown error');
} catch (error) {
  console.log('✅ Invalid type caught:', error.message);
}

try {
  // Test file too large
  const largeFile = createMockFile('image/jpeg', 33 * 1024 * 1024); // 33MB
  validateImageFile(largeFile);
  console.error('❌ Large file test failed - should have thrown error');
} catch (error) {
  console.log('✅ Large file caught:', error.message);
}

// Test createImagePreview
console.log('\nTesting createImagePreview:');
try {
  // Note: We can't fully test this in Node.js as URL.createObjectURL is browser-only
  console.log('⚠️ createImagePreview needs to be tested in browser');
} catch (error) {
  console.error('❌ createImagePreview test failed:', error.message);
}

// Test convertToBase64
console.log('\nTesting convertToBase64:');
try {
  // Note: We can't fully test this in Node.js as FileReader is browser-only
  console.log('⚠️ convertToBase64 needs to be tested in browser');
} catch (error) {
  console.error('❌ convertToBase64 test failed:', error.message);
}