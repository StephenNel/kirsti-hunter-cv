// Stagger the settle-in animation of desk items
document.querySelectorAll('.desk .item').forEach((el, i) => {
  el.style.setProperty('--delay', (0.12 + i * 0.11).toFixed(2) + 's');
});
