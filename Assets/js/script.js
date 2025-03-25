window.onload = function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.querySelector('body > div.header');


    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 750);
    }, 750);
};