const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .7;
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
  };

  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  };

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  };
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  a: {
    pressd: false,
  },
  d: {
    pressd: false,
  },
  w: {
    pressd: false,
  },
  ArrowRight: {
    pressd: false,
  },
  ArrowLeft: {
    pressd: false,
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  
  player.velocity.x = 0;
  enemy.velocity.x = 0;
  
  // player movement
  if (keys.a.pressd && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressd && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  // enemy movement
  if (keys.ArrowLeft.pressd && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressd && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }
}

animate();

// events

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'd':
      keys.d.pressd = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressd = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressd = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressd = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressd = false;
      break;
    case 'a':
      keys.a.pressd = false;
      break;
  }
  
  // enemy keys
  switch (e.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressd = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressd = false;
      break;
  }
})
