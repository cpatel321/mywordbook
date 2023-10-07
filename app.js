const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

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
// dictionary
let wordsDataDict = [];
let usersDict = [];

try {
  const data = fs.readFileSync('output.json', 'utf-8');
  wordsDataDict = JSON.parse(data);
} catch (error) {
  console.error('Error reading JSON file:', error.message);
}
try {
  const data = fs.readFileSync('users.json', 'utf-8');
  usersDict = JSON.parse(data);
  // console.log("usersDict",usersDict);
}catch (error) {
  console.error('Error reading JSON file:', error.message)};


app.get('/api/words', (req, res) => {
  res.json(wordsData);
});

app.post('/api/words', (req, res) => {
  const { word, meaning, meaningG } = req.body;

  if (!word || !meaning) {
    return res.status(400).json({ error: 'Word and meaning are required fields.' });
  }

  const newWord = {
    id: wordsData.length + 1,
    word: word,
    meaningG: meaningG,
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

app.get('/api/dictionary/:word', (req, res) => {
  const { word } = req.params;

  const matchedWord = wordsDataDict.find((entry) => entry.word === word);
  if (matchedWord) {
    res.json({ meaningG: matchedWord.meaning}); 
  } else {
    res.status(404).json({ error: 'Word not found in dictionary.' });
  }
});


app.get('/api/wordofday', (req, res) => {
  const date = new Date();
  const dayOfYear = getDayOfYear(date);
  const randomIndex = dayOfYear+1500 

  const wordOfTheDay = wordsDataDict[randomIndex];
  if (wordOfTheDay) {
    res.json(wordOfTheDay);
  } else {
    res.status(404).json({ error: 'No word available for the day.' });
  }
});

app.post("/api/login",(req,res)=>{
  // console.log("req",req.body);
  const {username,password}=req.body;

 console.log("username",username);
 console.log("password",password);
  // check for username and password in the usersDict
  var matchedUser = usersDict.find((entry) => entry.username == username);
  // console.log("matchedUser",matchedUser)
  // matchedUser={username:"admin",password:"admin"}
  if (matchedUser) {
    console.log("matchedUser",matchedUser);
    if (matchedUser.password === password) {
      console.log("matchedUser",matchedUser)
      res.json({ success: true,userid:matchedUser.id });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});


app.post("/api/register",(req,res)=>{
  // console.log("req",req.body);
  const {username,password}=req.body;

//  console.log("username",username);
//  console.log("password",password);
 
  // check for username and password in the usersDict0.
  var matchedUser = usersDict.find((entry) => entry.username == username);

  if (matchedUser) {
    // console.log("matchedUser",matchedUser);
    res.json({ success: false });
  } else {
    const newUser = {
      id: usersDict.length + 1,
      username: username,
      password: password
    };

    usersDict.push(newUser);
    // Update the JSON file with the new data
    try {
      fs.writeFileSync('users.json', JSON.stringify(usersDict, null, 2));
    } catch (error) {
      console.error('Error writing to JSON file:', error.message);
    }
    res.json({ success: true });
  }
  
});

// Function to calculate the day of the year
function getDayOfYear(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

