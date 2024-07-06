class Coin extends MovableObj {
  IMAGES_COINS = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  height = 100;
  width = 100;

  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  constructor() {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = 300 + Math.random() * 2200;
    this.y = 30 + Math.random() * 180;
    this.animate();
  }

  /**
   *animate the coins
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }
}
