const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const name = queryStringParameters ? queryStringParameters.name : "Unknown";

  // Log the name (this can be saved in a database or just logged for now)
  console.log(`Email opened by: ${name}`);

  // Use the public URL for the tracking pixel image
  const pixelUrl = 'https://gleaming-jalebi-73344d.netlify.app/1x1.png'; // Use the correct URL for your image

  try {
    // Fetch the pixel image from the URL
    const response = await fetch(pixelUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pixel image: ${response.statusText}`);
    }

    // Convert the response into an array buffer
    const pixel = await response.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: Buffer.from(pixel).toString('base64'),
      isBase64Encoded: true, // Indicate that the image is base64 encoded
    };
  } catch (err) {
    console.error("Error fetching pixel: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to serve the tracking pixel.' }),
    };
  }
};
