class DrawableObj {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   *an image is loaded from the specified path
   * @param {string} path = imagepath
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * draws pictures on the canvas
   * @param {object} ctx - the 2d context is added to the canvas
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("error laoding img", e);
      console.log("not image", this.img.src);
    }
  }

  /**
   * draws a frame around character, chicken, chicken small, Endboss, throwable objects, bottle, coin
   * @param {object} ctx the 2d context is added to the canvas
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ChickenSmall ||
      this instanceof Endboss ||
      this instanceof ThrowableObj ||
      this instanceof Bottle ||
      this instanceof Coin
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }

  /**
   * loads images from the array and loads them into the image cache
   * @param {array} array image path of array to load
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
