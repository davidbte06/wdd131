// Hamburger menu
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  if(navMenu.style.display === 'flex') {
    navMenu.style.display = 'none';
    menuButton.textContent = '☰';
  } else {
    navMenu.style.display = 'flex';
    menuButton.textContent = '✖';
  }
});
