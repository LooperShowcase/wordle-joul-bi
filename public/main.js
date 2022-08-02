//FrontEnd
const NUMBER_OF_WORDS = 6;
const NUMBER_OF_CHARS = 5;
let words = document.getElementById("container");
for (let i = 0; i < NUMBER_OF_WORDS; i++) {
  let singleword = document.createElement("div");
  singleword.className = "word";
  for (let u = 0; u < NUMBER_OF_CHARS; u++) {
    let singleChar = document.createElement("div");
    singleChar.className = "char";
    singleword.appendChild(singleChar);
  }
  words.appendChild(singleword);
}

let currentword = 0;
let currentchar = 0;
document.addEventListener("keyup", async function (event) {
  // Check if backaspace and that we have something to delete
  if (event.key === "Backspace" && currentchar > 0) {
    let wordDIV = words.children[currentword];
    let charDIV = wordDIV.children[currentchar - 1];
    currentchar--;
    charDIV.innerHTML = "";
  }
  // Check if the input is a valid alphabet char, and if we have space left to write
  else if (isLetter(event.key) && currentchar < 5) {
    let wordDIV = words.children[currentword];
    let charDIV = wordDIV.children[currentchar];
    charDIV.innerHTML = event.key.toUpperCase();
    currentchar++;
  } else if (event.key === "Enter" && currentchar == 5) {
    let wordDIV = words.children[currentword];
    let charDIV = wordDIV.children[currentchar];
    const word = getword();
    console.log(word);
    const results = await (await fetch("/wordle/" + word)).json();
    for (let i = 0; i < results.length; i++) {
      wordDIV.children[i].style.backgroundColor = results[i];
    }
    currentword++;
    currentchar = 0;
  }
});

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function getword() {
  let word = "";
  let myguess = words.children[currentword];
  for (let i = 0; i < myguess.children.length; i++) {
    word = word + myguess.children[i].innerHTML;
  }
  return word;
}
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
