const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { identifyInsect } = require('./identifyInsect'); // Model inference function

const app = express();
app.use(cors());
app.use(express.json());

// Set up file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API to identify insect
app.post('/identify', upload.single('file'), async (req, res) => {
  const { buffer } = req.file;
  const insectName = await identifyInsect(buffer);
  res.json({ insect_name: insectName });
});

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
