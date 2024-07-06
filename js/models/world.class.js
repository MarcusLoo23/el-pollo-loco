class World {
  character = new Character();
  endboss = new Endboss();
  healthBar = new HealthBar();
  coinsBar = new CoinsBar();
  bottlesBar = new BottlesBar();
  bossHealthBar = new EndbossHealthBar();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  coinsInventory = 0;
  bottlesInventory = 0;
  lastThrowTime = 0;

  collectBottleSound = new Audio("./audio/collecting_bottle.mp3");
  collectCoinSound = new Audio("./audio/collecting_coin.mp3");
  breakBottleSound = new Audio("./audio/broken_bottle.mp3");
  cackleSound = new Audio("./audio/chickenCackle.mp3");
  throwSound = new Audio("./audio/throw.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    sounds.push(this.cackleSound);
    sounds.push(this.throwSound);
    sounds.push(this.collectBottleSound);
    sounds.push(this.collectCoinSound);
    sounds.push(this.breakBottleSound);
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * create the world for the character
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   *lets all intervals run through permanently
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 40);
    setInterval(() => {
      this.checkRewardsForCoins();
    }, 1000 / 20);
    setInterval(() => {
      this.checkIfBottleIsThrow();
    }, 1000 / 20);
    setInterval(() => {
      this.checkCollisionThrowableObj();
    }, 1000 / 20);
  }

  /**
   *checks whether a bottle is present, if so the bottle is thrown
   */
  checkIfBottleIsThrow() {
    const currentThrowTime = new Date().getTime();
    if (
      this.keyboard.D &&
      this.bottlesInventory > 0 &&
      currentThrowTime - this.lastThrowTime >= 750
    ) {
      let bottle = new ThrowableObj(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwSound.play();
      this.throwableObjects.push(bottle);
      this.bottlesInventory -= 20;
      this.bottlesBar.setPercentage(this.bottlesInventory);
      this.lastThrowTime = currentThrowTime;
    }
  }

  /**
   *checks if bottle has collided with ground
   */
  checkIfBottleIsCollideWidthGround() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.y > 374) {
        bottle.animateBottleSplash();
        this.breakBottleSound.play();
        setTimeout(() => {
          this.throwableObjects.splice(bottle, 1);
        }, 500);
      }
    });
  }

  /**
   * checks if bottle has collided with enemy
   */
  collisionEnemie() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY <= 0) {
          this.cackleSound.play();
          this.deleteEnemy(enemy);
          this.character.jump();
        } else {
          this.character.hit();
          this.healthBar.setPercentage(this.character.health);
        }
      }
    });
  }

  /**
   * if character collides with enemy the enemy is removed
   */
  deleteEnemy(enemy) {
    enemy.health = 0;
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(index, 1);
    }, 1500);
  }

  /**
   *when character collides with coin the status bar coin is updated
   */
  collisionCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinsInventory += 20;
        this.collectCoinSound.play();
        this.coinsBar.setPercentage(this.coinsInventory);
        let coinIndex = this.level.coins.indexOf(coin);
        this.level.coins.splice(coinIndex, 1);
      }
    });
  }

  /**
   *when character collides with bottle the status bar bottles is updated
   */
  collisionBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (this.bottlesInventory < 100) {
          this.bottlesInventory += 20;
          this.collectBottleSound.play();
          this.bottlesBar.setPercentage(this.bottlesInventory);
          let bottleIndex = this.level.bottles.indexOf(bottle);
          this.level.bottles.splice(bottleIndex, 1);
        }
      }
    });
  }

  /**
   *all elements are drawn in the canvas and the canvas reload automaticly
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addLevelBars();
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   *all items of the level are added
   */
  addLevelObjects() {
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   *status bars are added
   */
  addLevelBars() {
    this.addToMap(this.healthBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.addBossHealthBar();
  }

  /**
   *objects are added
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   *moving objects are added
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   *image of character is mirrored to the left
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   *image of character is switch back
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   *checks if a thrown object (bottle) has collided with an enemy, ground or enboss
   */
  checkCollisionThrowableObj() {
    this.checkIfBottleIsCollideWidthGround();
    this.checkIfBottleIsCollidedWithEnemy();
    this.checkIfBottleIsCollidedWithEndboss();
  }

  /**
   *statusbar enboss added
   */
  addBossHealthBar() {
    if (this.character.x >= 2500) {
      this.endboss.firstContact = true;
    }
    if (this.endboss.firstContact == true) {
      this.addToMap(this.bossHealthBar);
    }
  }

  /**
   *When the status bar coins is full, energy is added to the
   *character and the status bar coins are added again from the beginning
   */
  checkRewardsForCoins() {
    if (this.coinsInventory >= 100 && this.character.health < 100) {
      this.coinsInventory = 0;
      this.character.recoverHealth();
      this.coinsBar.setPercentage(this.coinsInventory);
      this.healthBar.setPercentage(this.character.health);
    }
  }

  /**
   *checks if bottle has collided with endboss
   */
  checkIfBottleIsCollidedWithEndboss() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(this.endboss) && !bottle.isExploded) {
        bottle.isExploded = true;
        bottle.animateBottleSplash(bottle);
        this.breakBottleSound.play();
        this.cackleSound.play();
        this.endboss.hit();
        this.bossHealthBar.setPercentage(this.endboss.health);
        setTimeout(() => {
          this.throwableObjects.splice(bottle, 1);
        }, 80);
      }
    });
  }

  /**
   *checks whether a thrown bottle collides with an opponent
   */
  checkIfBottleIsCollidedWithEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.isExploded) {
          bottle.isExploded = true;
          bottle.animateBottleSplash();
          this.breakBottleSound.play();
          this.cackleSound.play();
          setTimeout(() => {
            this.throwableObjects.splice(bottle, 1);
          }, 80);
          this.deleteEnemy(enemy);
        }
      });
    });
  }

  /**
   *when character collides with endboss the status bar is updated
   */
  collisionEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.healthBar.setPercentage(this.character.health);
    }
  }

  /**
   *checks whether a collision with an enemy, bottle, end boss or coin occurs
   */
  checkCollisions() {
    this.collisionEnemie();
    this.collisionBottles();
    this.collisionEndboss();
    this.collisionCoins();
  }
}
