//BackEnd
const express = require("express");
const app = express();

app.get("/wordle/:guess", async function (req, res) {
  const ourword = "lucky";
  let ourwordMap = {
    l: 1,
    u: 1,
    c: 1,
    k: 1,
    y: 1,
  };
  let resArr = ["", "", "", "", ""];
  const word = req.params.guess.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ourword[i]) {
      resArr[i] = "green";
      let curlword = ourword[i];
      ourwordMap[curlword]--;
    }
  }
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== ourword[i]) {
      let curlletter = word[i];
      if (ourwordMap[curlletter] === undefined) {
        resArr[i] = "grey";
      } else if (ourwordMap[curlletter] > 0) {
        resArr[i] = "orange";
        ourwordMap[curlletter]--;
      } else {
        resArr[i] = "grey";
      }
    }
  }

  res.send(resArr);
});
app.use(express.static("public"));

app.listen(3000);
