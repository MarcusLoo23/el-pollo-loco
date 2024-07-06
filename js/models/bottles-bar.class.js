class BottlesBar extends DrawableObj {
  IMAGES_BOTTLES = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 20;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * the appropriate image of the status bar is assigned
   * @param {number} percentage percentages of the status bar are set
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * the number of the image in the array IMAGES_BOTTLES is returned
   * @returns 1 - 5 number
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
