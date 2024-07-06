class EndbossHealthBar extends DrawableObj {
  IMAGES_HEALTH_BAR = [
    "./img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH_BAR);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * the appropriate image of the status bar is assigned
   * @param {number} percentage percentages of the status bar are set
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * the number of the image in the array IMAGES_HEALTH_BAR is returned
   * @returns 1 - 5 number
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
