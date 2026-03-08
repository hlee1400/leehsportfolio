(function() {
  const text = document.getElementById('floatText');
  if (!text) return;

  let x = Math.random() * (window.innerWidth * 0.5);
  let y = Math.random() * (window.innerHeight * 0.4) + 100;
  let vx = 1.2;
  let vy = 0.8;

  text.style.left = x + 'px';
  text.style.top = y + 'px';

  function animate() {
    const rect = text.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    x += vx;
    y += vy;

    if (x <= 0 || x >= maxX) {
      vx *= -1;
      x = Math.max(0, Math.min(x, maxX));
    }
    if (y <= 0 || y >= maxY) {
      vy *= -1;
      y = Math.max(0, Math.min(y, maxY));
    }

    text.style.left = x + 'px';
    text.style.top = y + 'px';
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
