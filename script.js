
let lastScrollY = 0;

function smoothScroll() {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('header');
    const container = document.querySelector('.container');
    const body = document.body;
    const maxScroll = 300; // Scroll position at which the animation is fully complete

    // Calculate how much of the scroll distance we have covered as a percentage
    const scrollPercentage = Math.min(currentScrollY / maxScroll, 1);

    // Update the header's height based on scroll percentage
    const newHeight = 600 - (500 * scrollPercentage); // Shrinks from 600px to 100px
    header.style.height = newHeight + 'px';

    // Update opacity of the text based on scroll percentage
    const newOpacity = 1 - scrollPercentage;
    container.querySelector('h1').style.opacity = newOpacity;
    container.querySelector('p').style.opacity = newOpacity;

    //Create a smooth background gradient transition from orange to white
    const orangeToWhite = 'linear-gradient(to bottom, #ff7a4b ${100 - scrollPercentage * 100}%, white ${scrollPercentage * 100}%)';
    body.style.background = orangeToWhite;

    // Change body background color smoothly from orange to white
    if (scrollPercentage >= 1) {
        body.style.backgroundColor = 'white';
        container.querySelector('h1').style.color = 'black'; // Change text color on white background
    } else {
        body.style.backgroundColor = '#ff7a4b'; // Original background color
        container.querySelector('h1').style.color = 'white';
    }

    // Use requestAnimationFrame to keep the animation smooth
    requestAnimationFrame(smoothScroll);
}

// Start the animation loop when the page is loaded and on scroll
window.addEventListener('scroll', function () {
    lastScrollY = window.scrollY;
});

// Initiate the animation
//smoothScroll();
