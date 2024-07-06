class MovableObj extends DrawableObj {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accleration = 2.5;
  health = 100;
  coins = 0;
  bottles = 0;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   *gravity is given to the character and objects
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accleration;
      }
      if (this.y > 72 && this instanceof Character) {
        this.y = 72;
      }
    }, 1000 / 25);
  }

  /**
 * if the character or object is above the ground return true
 * @returns ture 
 
 */
  isAboveGround() {
    if (this instanceof ThrowableObj) {
      return true;
    } else {
      return this.y < 72;
    }
  }

  /**
   * check if object colliding with character
   * @param {object} mo object to check collision with
   * @returns true if collision
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   *health is reduced bys hit
   */
  hit() {
    this.health -= 5;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    if (this instanceof Endboss) {
      this.health -= 20;
    }
  }

  /**
   *recovered health if coins over 100
   */
  recoverHealth() {
    let healthRegen = 20;
    let newHealth = this.health + healthRegen;
    if (newHealth >= 100) {
      this.health = 100;
    } else this.health += 20;
  }

  /**
   *if injured
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   *is dead set health to 0
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * animation images is playing
   * @param {array} images array path swith images to animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   *movement to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   *movement to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   *movement to the upper
   */
  jump() {
    this.speedY = 30;
  }
}
