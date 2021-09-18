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
let startGames = document.getElementById('start-game');
startGames.style.display = "block";
let coinCount = document.getElementById('coinCount');
coinCount.style.display = "none";
let gridCont = document.getElementById('gridCont');
gridCont.style.display = "none";
document.getElementById("notication").style.display = "none";
let gameOver = document.getElementById('gameOver');
gameOver.style.display = "none"
var audio, playbtn, mutebtn, seek_bar;
audio = new Audio();
document.getElementById("template-help").style.display = "none";

window.onload = function() {
  // audio.src = "./public/music/start-game.mp3";
  // audio.loop = true;
  // audio.oncanplaythrough = (event) => {
  //   var playedPromise = audio.play();
  //   if (playedPromise) {
  //     playedPromise.catch((e) => {
  //       if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
  //         audio.pause();
  //         audio.load()
  //       }
  //     }).then(() => {
  //       console.log("playing sound !!!");
  //     });
  //   }
  // }
}

let randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}
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
  if (hunger <= 0 || thirst <= 0 || happiness <= 0) {
    configTypeButton("none");
    gameOver.style.display = "block"
    audio.pause();
  }

  else {
    // thirst -= 8;
    // hunger -= 4;
    // happiness -= 10;
    setHungerProgress(hunger);
    setThirstProgress(thirst);
    setHappinessProgress(happiness);
  }
};

let poopGen = () => {
  let fecesType = Math.round(randomNumber(1, 2));
  // console.log(fecesType);
  // 1: phân
  // 2: nước
  if (fecesType == 1) {
    poopSprite.style.left = randomNumber(40, 60) + "vw";
    poopSprite.style.top = randomNumber(45, 59) + "vh";
    poopSprite.style.display = "block";
  }
  else if (fecesType == 2) {
    peeSprite.style.left = randomNumber(40, 60) + "vw";
    peeSprite.style.top = randomNumber(45, 59) + "vh";
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
  hungerProgress.setAttribute('style', 'width:' + Number(data).toFixed(0) + '%');
  hungerProgress.innerHTML = `<b>${Number(data).toFixed(0) + '%'}</b>`
}
let setThirstProgress = (data) => {
  thirstProgress.setAttribute('aria-valuenow', data);
  thirstProgress.setAttribute('style', 'width:' + Number(data).toFixed(0) + '%');
  thirstProgress.innerHTML = `<b>${(Number(data).toFixed(0) + '%')}</b>`
}
let setHappinessProgress = (data) => {
  happinessProgress.setAttribute('aria-valuenow', data);
  happinessProgress.setAttribute('style', 'width:' + Number(data).toFixed(0) + '%');
  happinessProgress.innerHTML = `<b>${(Number(data).toFixed(0) + '%')}</b>`
}

let replenish = (type) => {
  if (type == 1) {
    if (hunger == 100) {
      configTypeButton("none");
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Thức ăn của cún đã </span>
      <br>
      <b>đầy đủ</b>
      `
    }
    else if (coins < 20) {
      configTypeButton("none");
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
      configTypeButton("none");
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Nước uống của cún đã </span>
      <br>
      <b>đầy đủ</b>
      `
    }
    else if (coins < 10) {
      configTypeButton("none");
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
      configTypeButton("none");
      document.getElementById("notication").style.display = "block";
      document.getElementById("title-notication").innerHTML = `
      <span>Cảm xúc cún của bạn đã đạt</span>
      <br>
      <b>100%</b>
      `
    }
    else if (coins < 20) {
      configTypeButton("none");
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
let configTypeButton = (type) => {
  if (type === "none") {
    document.querySelector('button').disabled = true;
  } else {
    document.querySelector('button').disabled = false;
  }

}

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
  configTypeButton("block")
}
let help = () => {
  document.getElementById("template-help").style.display = "block"
}
let start = () => {
//  setTimeout(() => {
//   audio.pause();
//  }, 100);
  startGames.style.display = "none";
  coinCount.style.display = "flex"
  gridCont.style.display = "block";
  time();
  poopGen();
  // initAudioPlayer();
  setInterval(time, 10000);
  setInterval(poopGen, 7000);
}
let continueGame = () => {
  coins -=coins;
  setTimeout(() => {
    count = 0;
    hunger = 100;
    thirst = 100;
    happiness = 100;
    coins = 100;
  }, 100);
  startGames.style.display = "none";
  coinCount.style.display = "flex"
  gridCont.style.display = "block";
  time();
  poopGen();
  // initAudioPlayer();
  setInterval(time, 10000);
  setInterval(poopGen, 7000);
  gameOver.style.display = "none"
}
let blackGame = () => {
  audio.pause();
  startGames.style.display = "block";
  coinCount.style.display = "none";
  gridCont.style.display = "none";
  gameOver.style.display = "none"
}
function initAudioPlayer() {
  audio.src = "https://www.soundjay.com/free-music/midnight-ride-01a.mp3";
  audio.loop = true;
  audio.oncanplaythrough = (event) => {
    var playedPromise = audio.play();
    if (playedPromise) {
      playedPromise.catch((e) => {
        console.log(e)
        if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
          console.log(e.name);
        }
      }).then(() => {
        console.log("playing sound !!!");
      });
    }
  }
  // Set object references
  playbtn = document.getElementById("playpausebtn");
  mutebtn = document.getElementById("mutebtn");
  playbtn.addEventListener("click", playPause);
  mutebtn.addEventListener("click", mute);
  function playPause() {
    if (audio.paused) {
      audio.play();
      playbtn.style.background = "url(https://image.flaticon.com/icons/svg/189/189889.svg) no-repeat";
    } else {
      audio.pause();
      playbtn.style.background = "url(https://image.flaticon.com/icons/svg/148/148744.svg) no-repeat";
    }
  }
  function mute() {
    if (audio.muted) {
      audio.muted = false;
      mutebtn.style.background = "url(https://image.flaticon.com/icons/svg/204/204287.svg) no-repeat";
    } else {
      audio.muted = true;
      mutebtn.style.background = "url(https://image.flaticon.com/icons/svg/148/148757.svg) no-repeat";
    }
  }
}
let closeTempalteHelp = () => {
  document.getElementById("template-help").style.display = "none";
  // document.getElementById("template-help").style.animation
}
