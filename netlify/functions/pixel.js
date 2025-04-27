exports.handler = async (event, context) => {
  // Use the URL of the image file served from the static directory
  const pixelUrl = 'https://gleaming-jalebi-73344d.netlify.app/1x1.png';

  try {
    // Fetch the pixel image from the URL
    const response = await fetch(pixelUrl);
    const pixel = await response.buffer(); // Get the image data as a buffer

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
    console.error("Error fetching pixel:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to serve the tracking pixel." }),
    };
  }
};
