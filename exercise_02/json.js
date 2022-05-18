const header = document.querySelector("header");

const myHeader = document.createElement('h1');
myHeader.textContent = 'JSON exercise 1';
header.appendChild(myHeader);

const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');
let motherInfo = 'The mother cats are called ';
let kittenInfo;
const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json';
const requestLocal = './sample.json';

fetch(requestURL)
  .then(response => response.text())
  .then(text => displayCatInfo(text))

function displayCatInfo(catString) {
  let total = 0;
  let male = 0;

// Add your code here
  const catInfo = JSON.parse(catString);

  for (const i in catInfo) {
    if (i != catInfo.length-1) {
      motherInfo += catInfo[i].name+","; 
    } else {
      motherInfo += " and "+catInfo[i].name+"."; 
    }
    for (const kitten of catInfo[i].kittens) {
      total +=1;
      if (kitten.gender === "m") {
          male+=1;
      }
    }
  }
  kittenInfo = total + " kittens in total. " + male + " male kittens and "+ (total-male) + " female kittens";

// Don't edit the code below here!

  para1.textContent = motherInfo;
  para2.textContent = kittenInfo;
}

section.appendChild(para1);
section.appendChild(para2);
