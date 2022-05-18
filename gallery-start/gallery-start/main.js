const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgs = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Looping through images */
for (let i of imgs) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + i);
  thumbBar.appendChild(newImage);
}

thumbBar.addEventListener('click', (e) => {
  //console.log(e.target.getAttribute('src'));
  displayedImage.setAttribute('src', e.target.getAttribute('src'));
})

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', (e) => {
    btnClick = e.target;
    if (btnClick.getAttribute('class')==='dark'){
        btnClick.setAttribute('class','light');
        btnClick.textContent = 'Lighten';
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        btnClick.setAttribute('class', 'dark');
        btnClick.textContent = 'Darken';
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
})