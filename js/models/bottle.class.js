class Bottle extends MovableObj {
  IMAGES_BOTTLES = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  y = 348;
  height = 90;
  width = 90;
  offset = {
    top: 10,
    bottom: 10,
    left: 15,
    right: 10,
  };
  isExploded = false;

  constructor(x) {
    super().loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 250 + Math.random() * 2600;
    this.animate();
  }

  /**
   *the movement of the bottles on the floor is played
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 500);
  }
}
