//Declaring all game variables
let count = 0;
let hunger = 100;
let thirst = 100;
let happiness = 100;
let coins = 100;
let dog = document.getElementById('dog');
let dog2 = document.getElementById('dog2');
let hungerProgress = document.getElementById('progressBarHung');
let thirstProgress = document.getElementById('progressBarThir');
let happinessProgress = document.getElementById('progressBarHapp');
let coinTab = document.getElementById('coinsTab');
let poopSprite = document.getElementById('dogPoop');
let peeSprite = document.getElementById('dogPee');
let foodBowl = document.getElementById('dogFood');
let waterBowl = document.getElementById('dogWater');
document.getElementById("notication").style.display = "none";
//Function below returns a random number between the two arguments you give it.
let randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}
/* time is a function that runs every 20 seconds by using setInterval which is at the end of the script,
this function, every 20 seconds will decrease hunger, thirst and switch the animation that is currently
placed on the dog by switching classes. This function also checks if values are too low and gives you an alert stating so.*/
let time = () => {
  let animNumber = Math.round(randomNumber(0, 3));
  if (animNumber == 0) {
    dog.className = 'dogSprite dogSpriteAnimMain';
    dog.src = "./public/images/dogsprite.gif";
    dog2.className = 'dogSprite2 dogSpriteAnimMain3';
    dog2.src = "./public/images/dogsprite.gif";
  }
  else if (animNumber == 1) {
    dog.className = 'dogSprite dogSpriteAnimMain2';
    dog.src = "./public/images/dogsprite.gif";
    dog2.className = 'dogSprite2 dogSpriteAnimMain';
    dog2.src = "./public/images/dogsprite.gif";
  }
  else if (animNumber == 2) {
    dog.className = 'dogSprite dogSpriteAnimMain3';
    dog.src = "./public/images/dogsprite.gif";
    dog2.className = 'dogSprite2 dogSpriteAnimSleep';
    dog2.src = "./public/images/dogsleep.gif";
  }
  else if (animNumber == 3) {
    dog.className = 'dogSprite dogSpriteAnimSleep';
    dog.src = "./public/images/dogsleep.gif"
    dog2.className = 'dogSprite2 dogSpriteAnimMain2';
    dog2.src = "./public/images/dogsprite.gif";
  }
  if (hunger <= 0 || thirst <= 0) {
    alert("Your pet is dying, please take care of them ;(");
  }

  else {
    thirst -= .5;
    hunger -= .5;
    happiness = (thirst + hunger) / 3;
    setHungerProgress(hunger);
    setThirstProgress(thirst);
    setHappinessProgress(happiness);
  }
};

let poopGen = () => {
  let fecesType = Math.round(randomNumber(0, 2));
  if (fecesType == 1) {
    poopSprite.style.left = randomNumber(25, 50) + "vw";
    poopSprite.style.top = randomNumber(15, 30) + "vh";
    poopSprite.style.display = "block";
  }
  else if (fecesType == 2) {
    peeSprite.style.left = randomNumber(25, 30) + "vw";
    peeSprite.style.top = randomNumber(15, 20) + "vh";
    peeSprite.style.display = "block";
  }
}

let poopPickup = (type) => {
  coins += 20;
  coinTab.textContent = coins
  if (type == 1) {
    poopSprite.style.display = "none";
  }
  else if (type == 2) {
    peeSprite.style.display = "none"
  }
}
let setHungerProgress = (data) => {
  hungerProgress.setAttribute('aria-valuenow', data);
  hungerProgress.setAttribute('style', 'width:' + Number(data).toFixed(2) + '%');
  hungerProgress.innerHTML = `<b>${Number(data).toFixed(2) + '%'}</b>`
}
let setThirstProgress = (data) => {
  thirstProgress.setAttribute('aria-valuenow', data);
  thirstProgress.setAttribute('style', 'width:' + Number(data).toFixed(2) + '%');
  thirstProgress.innerHTML = `<b>${(Number(data) + '%')}</b>`
}
let setHappinessProgress = (data) => {
  happinessProgress.setAttribute('aria-valuenow', data);
  happinessProgress.setAttribute('style', 'width:' + Number(data).toFixed(2) + '%');
  happinessProgress.innerHTML = `<b>${(Number(data).toFixed(2) + '%')}</b>`
}

let replenish = (type) => {
  if (type == 1) {
    if (hunger == 100) {
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Thức ăn của cún đã </span>
      <br>
      <b>đầy đủ</b>
      `
    }
    if (coins < 20) {
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Bạn không đủ điểm để mua thêm </span>
      <br>
      <b>Thức ăn</b>
      `
    }
    else if (coins >= 20) {
      foodBowl.src = "./public/images/dopFood.jpg";
      dog.className = 'dogSprite dogSpriteAnimFeed'
      coins -= 20;
      hunger += 30;
      if (coins < 0) { coins = 0; };
      if (hunger > 100) { hunger = 100; };
      setHungerProgress(hunger);
      coinTab.textContent = coins
      setTimeout(function () {
        replenishReversal(1);
      }, 10000)
    }
  }
  else if (type == 2) {
    if (thirst == 100) {
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Nước uống của cún đã </span>
      <br>
      <b>đầy đủ</b>
      `
    }
    if (coins < 10) {
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Bạn không đủ điểm để mua thêm</span>
      <br>
      <b>Nước uống</b>
      `
    }
    else if (coins >= 10) {
      waterBowl.src = "./public/images/dogWater.jpg";
      dog.className = 'dogSprite dogSpriteAnimFeed'
      coins -= 10;
      thirst += 30;
      if (coins < 0) { coins = 0; };
      if (thirst > 100) { thirst = 100; }
      setThirstProgress(thirst);
      coinTab.textContent = coins
      setTimeout(function () {
        replenishReversal(2);
      }, 10000)
    }
  }
  else if (type == 3) {
    if (happiness == 100) {
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Cảm xúc cún của bạn đã đạt</span>
      <br>
      <b>100%</b>
      `
    }
    if (coins < 20) {
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Bạn không đủ điểm để mua thêm</span>
      <br>
      <b>Đồ chơi</b>
      `
    } else if (coins >= 20) {
      coins -= 20;
      happiness += 20;
      if (coins < 0) { coins = 0; };
      if (happiness > 100) { happiness = 100; }
      setHappinessProgress(happiness);
      coinTab.textContent = coins
    }
  }
};
let replenishReversal = (type) => {
  if (type == 1) {
    foodBowl.src = "./public/images/emptybowl.jpg";
    dog.className = 'dogSprite dogSpriteAnimMain'
  }
  else if (type == 2) {
    waterBowl.src = "./public/images/emptybowl.jpg";
    dog.className = 'dogSprite dogSpriteAnimMain'
  }
};

let addPuppy = () => {
  if (coins < 100) {
    document.getElementById("notication").style.display = "block";
    document.getElementById("title-notication").innerHTML = `
    <span>Bạn không đủ điểm để mua thêm</span>
    <br>
    <b>Cún con</b>
    `
  }
  else if (coins >= 100) {
    dog2.style.display = "block"
    coins -= 100;
    coinTab.textContent = coins
  }
}
// let addRug = () => {
//   if (coins <= 50) {

//   }
//   else if (coins >= 50) {
//     document.getElementById("dogRug").style.display = "block";
//     coins -= 50;
//     coinTab.textContent = coins
//   }
//   document.getElementById("dogRug").style.display = "block";
//   coins -= 50;
// }
let addHouse = () => {
  if (coins < 150) {
    document.getElementById("notication").style.display = "block";
    document.getElementById("title-notication").innerHTML = `
    <span>Bạn không đủ điểm để mua </span>
    <br>
    <b>Nhà cho chó</b>
    `
  }
  else if (coins >= 150) {
    document.getElementById("dogHouse").style.display = "block";
    coins -= 150;
    coinTab.textContent = coins
  }
};
let closeNotication = () => {
  document.getElementById("notication").style.display = "none";

}
setInterval(time, 10000);
setInterval(poopGen, 9000);
