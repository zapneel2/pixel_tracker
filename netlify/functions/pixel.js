const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Use the correct path to static folder
  const filePath = path.resolve(__dirname, '../static/1x1.png'); // Adjust path to where pixel.png is located
  
  try {
    const pixel = fs.readFileSync(filePath); // Read the pixel image from static folder
    console.log('Pixel requested from:', event.headers['user-agent']);
  
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store', // Prevent caching
      },
      body: pixel.toString('base64'), // Return the pixel image as base64
      isBase64Encoded: true, // Indicate it's base64-encoded
    };
  } catch (error) {
    console.error("Error reading pixel file:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to serve the tracking pixel." }),
    };
  }
};
