const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const name = queryStringParameters ? queryStringParameters.name : "Unknown";

  // Log the name (this can be saved in a database or just logged for now)
  console.log(`Email opened by: ${name}`);

  // The path to your tracking pixel image
  const pixelPath = path.join(__dirname, '..', 'static', '1x1.png');

  try {
    const pixelBuffer = fs.readFileSync(pixelPath);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: pixelBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error("Error reading pixel file: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to serve the tracking pixel.' }),
    };
  }
};
