document.addEventListener("DOMContentLoaded", () => {
  // White Blulbs semi-transparent background animation
  const blocks = document.querySelectorAll(".color-block");
  const container = document.querySelector(".color");

  // Only run if elements exist
  if (blocks.length === 0 || !container) return;

  let containerRect = container.getBoundingClientRect();

  const positions = Array.from({ length: 10 }, () => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  }));

  const directions = Array.from({ length: 10 }, () => ({
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
  }));

  const speeds = Array.from({ length: 10 }, () => Math.random() * 0.4 + 0.2);

  const pulseParams = Array.from({ length: 10 }, () => ({
    scale: Math.random() * 0.5 + 0.8,
    speed: Math.random() * 0.005 + 0.005,
    direction: 1,
  }));

  const sizes = Array.from({ length: 10 }, () => ({
    width: Math.random() * 300 + 200, // Slightly larger for better coverage
    height: Math.random() * 300 + 200,
  }));

  function updatePositions() {
    // containerRect is updated on resize

    positions.forEach((pos, index) => {
      const block = blocks[index];
      const dir = directions[index];
      const speed = speeds[index];
      const pulse = pulseParams[index];
      const size = sizes[index];

      pos.x += dir.dx * speed;
      pos.y += dir.dy * speed;

      // Bounce logic
      if (pos.x <= -20 || pos.x >= 100) {
        dir.dx *= -1;
        dir.dy += (Math.random() - 0.5) * 0.5;
      }

      if (pos.y <= -20 || pos.y >= 100) {
        dir.dy *= -1;
        dir.dx += (Math.random() - 0.5) * 0.5;
      }

      // constrain slightly to keep them generally on screen but allow edge overlap
      pos.x = Math.max(-20, Math.min(120, pos.x));
      pos.y = Math.max(-20, Math.min(120, pos.y));

      // Pulse logic
      pulse.scale += pulse.speed * pulse.direction;
      if (pulse.scale > 1.4 || pulse.scale < 0.6) {
        pulse.direction *= -1;
      }

      block.style.width = `${size.width * pulse.scale}px`;
      block.style.height = `${size.height * pulse.scale}px`;
      block.style.left = `calc(${pos.x}% - ${
        (size.width * pulse.scale) / 2
      }px)`;
      block.style.top = `calc(${pos.y}% - ${
        (size.height * pulse.scale) / 2
      }px)`;
    });

    requestAnimationFrame(updatePositions);
  }

  function initBlocks() {
    blocks.forEach((block, index) => {
      const pos = positions[index];
      const size = sizes[index];

      block.style.width = `${size.width}px`;
      block.style.height = `${size.height}px`;
      block.style.left = `calc(${pos.x}% - ${size.width / 2}px)`;
      block.style.top = `calc(${pos.y}% - ${size.height / 2}px)`;
    });
  }

  // Initialize
  initBlocks();
  updatePositions();

  window.addEventListener("resize", () => {
    containerRect = container.getBoundingClientRect();
  });

  // Contact Form Logic Removed

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
