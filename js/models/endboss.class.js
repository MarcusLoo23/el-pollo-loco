class Endboss extends MovableObj {
  y = 5;
  height = 450;
  width = 350;
  speed = 20;
  health = 100;
  firstContact = false;

  offset = {
    top: 80,
    bottom: 15,
    left: 20,
    right: 10,
  };

  bossAppearSound = new Audio("./audio/boss_appears.mp3");

  IMAGES_ALERT_IMAGES = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK_IMAGES = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK_IMAGES = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT_IMAGES = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD_IMAGES = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT_IMAGES[0]);
    this.loadImages(this.IMAGES_ALERT_IMAGES);
    this.loadImages(this.IMAGES_WALK_IMAGES);
    this.loadImages(this.IMAGES_ATTACK_IMAGES);
    this.loadImages(this.IMAGES_HURT_IMAGES);
    this.loadImages(this.IMAGES_DEAD_IMAGES);
    sounds.push(this.bossAppearSound);
    this.x = 3000;
    this.animateEndboss();
  }

  /**
   *when the final boss is in the field of view the attack animation is played
   */
  endbossInView() {
    this.bossAppearSound.play();
    this.speed = 50;
    this.playAnimation(this.IMAGES_ATTACK_IMAGES);
    this.moveLeft();
    setTimeout(() => {
      this.bossAppearSound.pause();
    }, 1000);
  }

  /**
   *animation of enboss is played
   */
  animateEndboss() {
    setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT_IMAGES);
      } else if (this.isDead()) {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD_IMAGES);
        setTimeout(() => {
          winGame();
        }, 2000);
      } else if (this.firstContact) {
        this.endbossInView();
      } else {
        this.playAnimation(this.IMAGES_ALERT_IMAGES);
      }
    }, 200);
  }
}
