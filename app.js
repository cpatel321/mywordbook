const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Read word data from the JSON file
let wordsData = [];
try {
  const data = fs.readFileSync('words.json', 'utf-8');
  wordsData = JSON.parse(data);
} catch (error) {
  console.error('Error reading JSON file:', error.message);
}



app.get('/api/words', (req, res) => {
    res.json(wordsData);
  });
  
  app.post('/api/words', (req, res) => {
    const { word, meaning } = req.body;
  
    if (!word || !meaning) {
      return res.status(400).json({ error: 'Word and meaning are required fields.' });
    }
  
    const newWord = {
      id: wordsData.length + 1,
      word: word,
      meaning: meaning
    };
  
    wordsData.push(newWord);
  
    // Update the JSON file with the new data
    try {
      fs.writeFileSync('words.json', JSON.stringify(wordsData, null, 2));
    } catch (error) {
      console.error('Error writing to JSON file:', error.message);
    }
  
    res.json(newWord);
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  