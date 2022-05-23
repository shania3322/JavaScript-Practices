const aliceTumbling =
    [{transform: 'rotate(0) scale(1)'}, {transform: 'rotate(360deg) scale(0)'}];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector('#alice1');
const alice2 = document.querySelector('#alice2');
const alice3 = document.querySelector('#alice3');


/*
//-------------------------------------
// 1.Using callback
function animate1(callback) {
  const animation = alice1.animate(aliceTumbling, aliceTiming);

  animation.onfinish = event => {
    console.log('animate1 is called.');
    callback();
  };
}

function animate2(callback) {
  const animation = alice2.animate(aliceTumbling, aliceTiming);
  animation.onfinish = event => {
    console.log('animate2 is called.');
    callback();
  };
}

function animate3() {
  const animation = alice3.animate(aliceTumbling, aliceTiming);
  animation.onfinish = event => console.log('animate3 is called.');
}

function animateAll() {
  animate1(() => animate2(() => animate3()));
}

animateAll();
*/

/*
//-------------------------------------
// 2. Using Promise chain
const aliceAnimation = alice1.animate(aliceTumbling, aliceTiming);
aliceAnimation.finished
  .then(() => {
    const aPromise = alice2.animate(aliceTumbling, aliceTiming);
    return aPromise.finished;
  })
  .then(() => alice3.animate(aliceTumbling, aliceTiming))
  .catch(err => console.log('error of alice animation: ' + err));
*/


//--------------------------------
// Using async and await
async function ainmateAlice() {
  await alice1.animate(aliceTumbling, aliceTiming).finished;
  await alice2.animate(aliceTumbling, aliceTiming).finished;
  await alice3.animate(aliceTumbling, aliceTiming).finished;
}

ainmateAlice();