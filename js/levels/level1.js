let level1;

/**
 * init new level and content
 */
function initLevel() {
  level1 = new Level(
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
    ],
    [new Cloud(400), new Cloud(1400), new Cloud(2400)],
    [
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 4
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 5
      ),
    ]
  );
}
