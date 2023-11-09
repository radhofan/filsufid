const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');
const cors = require('cors');
const multer = require('multer');
const path = require('path')
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3002;
const SERVICE_ACCOUNT_KEY_PATH = './filsufid-710f5c83e46e.json';

app.post('/fetch-files', async (req, res) => { 
  const FOLDER_ID = req.body.folderId;

  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  }); 

  const drive = google.drive({ version: 'v3', auth });

  try {
    // Fetch files from a specific folder in Google Drive
    const response = await drive.files.list({
      pageSize: 10, // Adjust as needed
      q: `'${FOLDER_ID}' in parents`,
    });
    const files = response.data.files.map((file) => {
      const shareableLink = `https://drive.google.com/uc?export=download&id=${file.id}`;
      return {
        name: file.name,
        shareableLink: shareableLink,
      };
    });

    res.json({ files });
 
  } catch (error) {
    console.error('Error fetching files in the specific folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const imageStorage = multer.diskStorage({
  // Destination to store the image
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB (adjust as needed)
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Upload only png and jpg format
      return cb(new Error('Please upload a valid image file (png or jpg)'));
    }
    cb(null, true);
  },
}); 

app.post('/uploadimage', upload.single('image'), async (req, res) => {
  const imageFile = req.file; // Get the uploaded image file
  console.log(imageFile)
  if (!imageFile) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.file'], // Use the appropriate scope for file uploads
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // Set the metadata for the uploaded file
    const fileMetadata = {
      name: imageFile.originalname, // Use the original filename
      parents: ['10OuJZ4KCVMR3xciLyCn8ex0NUj9XetXX'], // Replace with the ID of the folder where you want to upload the image
    };

    // Create a media object for the image file
    const media = {
      mimeType: imageFile.mimetype,
      body: require('fs').createReadStream(imageFile.path), // Read the file from the temporary location
    };

    // Upload the image to Google Drive
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id', // Retrieve the ID of the uploaded file
    });

    // Remove the temporary file
    require('fs').unlinkSync(imageFile.path);

    res.json({ fileId: response.data.id });
  } catch (error) {
    console.error('Error uploading image to Google Drive:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

