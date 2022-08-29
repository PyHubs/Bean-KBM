//alert('DO TO SOME STUPID BUGS, TOUCH SUPPORT HAD TO BE TAKEN AWAY, ELSE I GOT A BUNCH OF ERRORS WHICH IM TIRED OF. ')

// esbuild game.js --bundle > script.js

// import kaboom libvar
import kaboom from "kaboom";

function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// initialize context
kaboom({
  font: 'apl386',
  background: [52, 47, 145],
  crips: true,
})

// Load a sprite "bean' from an image
loadSound("oof", "sounds/oof.mp3");
loadSound("oof", "sounds/oof.mp3");
loadSound("background", "sounds/bean.wav");

loadSprite("testbg", "sprites/testbg.png");
loadSprite("chicken", "sprites/chicken.png");
loadSprite("new_bean", "sprites/bean.png");
loadSprite("clown", "sprites/clown.png");
loadSprite("kokofruit", "sprites/kokonut.png");

let score = 0;
let level = 1;
let fake_hits = 900;
let SPEED = 240;

const music = play("background", {
  volume: 0.8,
  loop: true
})

var show_score = true;

// Complete game loop
scene("game", () => {
  add([
    sprite("testbg", { width: width(), height: height() })
  ])

  // using the handle to control (check out AudioPlay for more controls / info)
  //music.pause()
  music.play()

  /* add([
    origin("center"),
    sprite("sun"),
    pos(center())
  ]); */

  // CONFIGURE
  if (show_score == true) {
    score = 0
  }

  // Hit label
  let hit_label = add([
    text("HP:" + fake_hits + " S:" + score + " L:" + level), {
      width: width(),
      size: 20,
      font: 'apl386',
    },
    area(),
    'hit_lbl',
  ])

  onClick("hit_lbl", () => {
    go("menu")
  })

  // increment score every frame
  onUpdate(() => {
    score++;
    hit_label.text = "HP:" + fake_hits + " S:" + score + " L:" + level

    // Increase speed
    if (score == 3000) {
      SPEED += 20;
      level++;
    }
    else if (score == 6000) {
      SPEED += 20;
      level++;
    }
    else if (score == 9000) {
      SPEED += 20;
      level++;
    }
    else if (score == 12000) {
      SPEED += 20;
      level++;
    }
    else if (score == 15000) {
      SPEED += 20;
      level++;
    }
    else if (score == 18000) {
      SPEED += 20;
      level++;
    }
    else if (score == 23000) {
      SPEED += 20;
      level++;
    }
    else if (score == 26000) {
      SPEED += 20;
      level++;
    }
    else if (score == 29000) {
      SPEED += 20;
      level++;
    }
    else if (score == 31000) {
      SPEED += 20;
      level++;
    }
    else if (score == 34000) {
      SPEED += 20;
      level++;
    }
    else if (score == 39000) {
      SPEED += 20;
      level++;
    } else if (score == 40000) {
      SPEED += 20;
      level++;
    } else if (score == 43000) {
      SPEED += 20;
      level++;
    } else if (score == 46000) {
      SPEED += 20;
      level++;
    } else if (score == 49000) {
      SPEED += 20;
      level++;
    } else if (score == 52000) {
      SPEED += 20;
      level++;
    } else if (score == 56000) {
      SPEED += 20;
      level++;
    }

  });

  // putting together our player character
  const bean = add([
    sprite("new_bean"), // render the bean sprite in loadSprite()
    pos(80, 40), // sets position
    area(), // adds a colider area
    body(), // enable gravity
    outline(4),
  ])

  // .jump() when "space" key is pressed and is on groud
  onKeyPress("space", () => { // like cframe.bind("<Space>", self.jump)
    if (bean.isGrounded()) {
      bean.jump()
    }
  })

  onClick(() => {
    if (bean.isGrounded()) {
      bean.jump()
    }
  })

  onTouchStart(() => {
    if (bean.isGrounded()) {
      bean.jump()
    }
  })

  onKeyPress("b", () => {
    burp()
  })

  onKeyPress("k", () => {
    addKaboom(bean.pos)
  })

  onKeyPress("o", () => {
    play("oof")
  })

  // add platform
  add([
    outline(4),
    rect(width(), 48), // renders a TRIANGLE takes width and height
    pos(0, height() - 48), // position, x=0, y=height() = 48 or right-bottom
    area(), // adds colider
    solid(), // makes it impossible for other things to pass
    color(131, 79, 194), // rgb color, a purple i selected
  ])

  add([
    area(),
    text("Music by faaz using beapbox", {
      size: 40,
    }),
    color(0, 0, 0),
    pos(5, height() - 46), // position, x=0, y=height() = 48 or right-bottom
    solid(),
  ])

  // Check for collision
  bean.onCollide("tree", () => {
    addKaboom(bean.pos); // Add kaboom effect to beans current position
    shake();
    play('oof');
    fake_hits = fake_hits - 100;
    hit_label.text = "HP:" + fake_hits + " S:" + score + " L:" + level
    //"Hits: " + fake_hits + " Score: " + score
    if (fake_hits <= 0) {
      burp();
      addKaboom(bean.pos)
      go("loose");
    }
  })

  // Colide with food
  bean.onCollide("food", (food) => {
    burp();
    if (fake_hits == 900) { }
    else { fake_hits = fake_hits + 75; }
    destroy(food)
  })

  bean.onCollide("kokonut", (kokonut) => {

    burp();
    if (fake_hits == 900) { }
    else { fake_hits = fake_hits + 50; }

    destroy(kokonut)
  })

  // Spawn trees
  function spawnTree() {
    // 1 in 12 chance
    var random_num = Math.floor(Math.random() * 20);
    console.log(random_num)

    // Spawn clowns
    var random_nums = Math.floor(Math.random() * 22);

    if (random_num == 0) {
      let food = add([
        sprite("chicken"),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        move(LEFT, SPEED),
        "food"
      ])
    } else if (random_num == 1) {
      // kokonut
      var kkn = add([
        sprite("kokofruit"),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        move(LEFT, SPEED),
        "kokonut"
      ])
    } else if (random_num == 2) {
      // clown code
      var clown = add([
        sprite("clown"),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        move(LEFT, SPEED),
        "clowns"
      ])

      bean.onCollide("clowns", () => {
        shake();
        play('oof');

        hit_label.text = "HP:" + fake_hits + " S:" + score + " L:" + level
      })

      const jokes = [
        //"Joe mama",
        "Whats the buffest thing on earth? Buff banana",
        "My dog stepped on a bee",
        "E is the best letter",
        "I will totally finish my homework",
        "Whats the buffest thing? Its buff banana",
        "When the microphone just dies",
        "Nicolas Goatifi (only f1 fans will understand this)",
        "EEEEEEEEEEEEEE",
        "eeeeeeeeeeeeee",
        "When da impostor is sus",
        "Your grandma is better",
        "Your grandparents had to walk uphill and downhill sideways, on one leg to school. The other leg was starting a buisness",
        "Go to blancstore.imibuks.repl.co/#virus to download my virus :)",
        "Your cousin is better",
        "You got a B IN MATHS???",
        "Please email pycodes.10@gmail.com some jokes!"
      ]

      var msgbox = add([
        text(random_item(jokes), {
          size: 40
        }),
        color(255, 255, 255),
        origin("botleft"),
        pos(width(), height() - 130),
        area(),
        move(LEFT, SPEED),
        "msgbox"
      ])

    } else {
      add([
        rect(rand(36, 48), rand(24, 64)),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        //color(194, 121, 79),
        color(rand(0, 255), rand(0, 255), rand(0, 255)),
        move(LEFT, SPEED),
        outline(4),
        cleanup(),
        "tree", // add a tag here
      ])
    }

    wait(rand(0.9, 1.7), () => {
      spawnTree();
    })

  }
  spawnTree();
})

// Menu scene
scene("menu", () => {
  add([
    text("The Bean - Menu"),
    origin("center"),
    pos(width() / 2, 80)
  ])

  /* Continue game*/
  add([
    text("Continue game"),
    pos(center()),
    origin("center"),
    area(),
    color(61, 255, 135),
    "continue_btn"
  ]);

  onClick("continue_btn", () => {
    show_score = false
    go("game")
  })

  // Restart game
  add([
    text("\nRestart game"),
    pos(center()),
    origin("top"),
    area(),
    color(255, 61, 110),
    "restart_btn"
  ]);

  onClick("restart_btn", () => {
    show_score = true
    fake_hits = 9000
    go("game")
  })

})

// Loose scene
scene("loose", () => {

  add([
    text("What a failiure!\nScore: " + score),
    pos(center()),
    origin("center"),
  ]);

  // click key to continue
  onKeyPress(() => {
    show_score = true
    fake_hits = 900
    go("game")
  })

  onTouchStart(() => {
    show_score = true
    fake_hits = 900
    go("game")
  })

})

go("game")