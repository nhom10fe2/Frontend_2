//Declaring all game variables
let count = 0;
let hunger = 100;
let thirst = 100;
let happiness = 0;
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
//Function below returns a random number between the two arguments you give it.
let randomNumber = (min, max) =>{
  return Math.random() * (max-min) + min;
}
/* time is a function that runs every 20 seconds by using setInterval which is at the end of the script,
this function, every 20 seconds will decrease hunger, thirst and switch the animation that is currently
placed on the dog by switching classes. This function also checks if values are too low and gives you an alert stating so.*/
let time = () => {
  let animNumber = Math.round(randomNumber(0,3));
  if (animNumber == 0) {
    dog.className = 'dogSprite dogSpriteAnimMain';
    dog.src = "./public/images/dogsprite.gif";
    dog2.className = 'dogSprite2 dogSpriteAnimMain3';
    dog2.src = "./public/images/dogsprite.gif";
  }
  else if (animNumber == 1){
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
  else if (animNumber == 3){
    dog.className = 'dogSprite dogSpriteAnimSleep';
    dog.src = "./public/images/dogsleep.gif"
    dog2.className = 'dogSprite2 dogSpriteAnimMain2';
    dog2.src = "./public/images/dogsprite.gif";
  }
  if(hunger <= 0 || thirst <= 0) {
    alert("Your pet is dying, please take care of them ;(");
  }
  else{
    thirst -= .5;
    hunger -= 1.5;
    happiness = (thirst + hunger)/2;
    hungerProgress.style.width = hunger + "%";
    thirstProgress.style.width = thirst + "%";
    happinessProgress.style.width = happiness + "%";
  }};
/* Poopgen is a function which every 40 seconds will randomly choose between 1 or 2, and based on this number it will make the poop or peeSprite
visible by changing the display value for these images, these images are then also moved to a random spot within the play area of the dog
, this was done  by changing the left and top values of the images to a random number using the random number function declared earlier. */
let poopGen = () => {
  let fecesType = Math.round(randomNumber(0,2));
  if (fecesType == 1) {
    poopSprite.style.left = randomNumber(25, 50) + "vw";
    poopSprite.style.top = randomNumber(15,30) + "vh";
    poopSprite.style.display = "block";
  }
  else if (fecesType == 2){
    peeSprite.style.left = randomNumber(25, 30) + "vw";
    peeSprite.style.top = randomNumber(15,20) + "vh";
    peeSprite.style.display = "block";
  }
}
/* Poop pick up takes argument that is passed from the image that is clicked, The value is passes identifies whether it was pee or poop and
makes the appropriate image invisible by changing the display property back to none instead of block. It also awards the user with 20 coins
and updates the coin div to show new number.*/
let poopPickup = (type) => {
  coins += 20;
  coinTab.textContent = coins
  if (type == 1){
    poopSprite.style.display = "none";
  }
  else if (type == 2) {
    peeSprite.style.display = "none"
  }
}
/* replenish much like poop pick up takes an argument from the button that clicked, this argument allows the app to identify what the user bought
1 being for food, 2 for water, 3 for toy. the if statement makes this identification and from there will reduce your coins by the price
and increase the according trait by a few points and update the progress bar. This function also changes the animation of the dog to a feeding one
which ends by calling replenishReversal 10 seconds after the food or water is bought.*/
let replenish = (type) => {
  if(type == 1 ) {
    if (coins < 20) {

    }
    else if (coins > 20) {
      foodBowl.src="./public/images/dopFood.jpg";
      dog.className = 'dogSprite dogSpriteAnimFeed'
      coins -= 20;
      hunger += 30;
      if (coins < 0) { coins = 0;};
      if (hunger > 100) { hunger = 100;};
      hungerProgress.style.width = hunger + "%";
      coinTab.textContent = coins
      setTimeout(function(){
        replenishReversal(1);
      }, 10000)
    }
  }
  else if (type == 2) {
    if (coins < 10) {

    }
    else if (coins > 10) {
      waterBowl.src="./public/images/dogWater.jpg";
      dog.className = 'dogSprite dogSpriteAnimFeed'
      coins -= 10;
      thirst += 30;
      if (coins < 0) { coins = 0;};
      if (thirst > 100) { thirst = 100;}
      thirstProgress.style.width = thirst + "%";
      coinTab.textContent = coins
      setTimeout(function(){
        replenishReversal(2);
      }, 10000)
    }
  }
  else if (type == 3) {
    coins -= 20;
    happiness += 30;
      if (coins < 0) { coins = 0;};
    if (happiness > 100) { happinness = 100;}
    happinessProgress.style.width = happiness + "%";
    coinTab.textContent = coins
  }
};
/* replenish reversal just undoes the changes to classes/animation of the dog that occurs when you buy food or water.*/
let replenishReversal = (type) => {
  if (type == 1) {
    foodBowl.src="./public/images/emptybowl.jpg";
    dog.className = 'dogSprite dogSpriteAnimMain'
  }
  else if (type == 2){
    waterBowl.src="./public/images/emptybowl.jpg";
    dog.className = 'dogSprite dogSpriteAnimMain'
  }
};
/* The rest of these functions hook up to the last items in the shop and simply just check if you have enough coins and if so
makes said item visible by changing the display value of the image.*/
let addPuppy = () => {
  if (coins < 100) {

  }
  else if (coins >= 100) {
    dog2.style.display = "block"
    coins -= 100;
    coinTab.textContent = coins
  }
}
let addRug = () => {
  if (coins <= 50) {

  }
  else if (coins >= 50) {
    document.getElementById("dogRug").style.display = "block";
    coins -= 50;
    coinTab.textContent = coins
  }
  document.getElementById("dogRug").style.display = "block";
  coins -= 50;
}
let addHouse = () => {
  if (coins <= 150) {

  }
  else if (coins >= 150) {
    document.getElementById("dogHouse").style.display = "block";
    coins -= 150;
    coinTab.textContent = coins
  }
};
/* These are the setIntervals that run to diminish values of pet traits and generate poop.*/
setInterval(time, 20000);
setInterval(poopGen,40000);
