function setWorld(worldState){
    function makeTile(type) {
        return [
            sprite('tile'),
            {type}
        ]
    }

    const map = [
        addLevel(
          [
            "                 ",
            " cdddddddddddde  ",
            " 30000000000002  ",
            " 30000000000002  ",
            " 30000000000002  ",
            " 30030000008889  ",
            " 30030000024445  ",
            " 300a8888897777  ",
            " 30064444457777  ",
            " 30000000000000  ",
            " 30000000021111  ",
            " 3000000002      ",
            " 1111111111      ",
            "      b          ",
            "     b      b    ",
            " b             b ",
          ],
          {
            tileWidth: 16,
            tileHeight: 16,
            tiles: {
              0: () => makeTile("grass-m"),
              1: () => makeTile("grass-water"),
              2: () => makeTile("grass-r"),
              3: () => makeTile("grass-l"),
              4: () => makeTile("ground-m"),
              5: () => makeTile("ground-r"),
              6: () => makeTile("ground-l"),
              7: () => makeTile("sand-1"),
              8: () => makeTile("grass-mb"),
              9: () => makeTile("grass-br"),
              a: () => makeTile("grass-bl"),
              b: () => makeTile("rock-water"),
              c: () => makeTile("grass-tl"),
              d: () => makeTile("grass-tm"),
              e: () => makeTile("grass-tr"),
            },
          }
        ),

        addLevel(
            [
              "      12       ",
              "      34       ",
              " 000    00  12 ",
              " 00   00    34 ",
              " 0    0        ",
              "      0  0     ",
              "           5   ",
              "           6   ",
              "     5         ",
              "     6   0     ",
              "               ",
              "               ",
              "               ",
            ],
            {
              tileWidth: 16,
              tileHeight: 16,
              tiles: {
                0: () => makeTile(),
                1: () => makeTile("bigtree-pt1"),
                2: () => makeTile("bigtree-pt2"),
                3: () => makeTile("bigtree-pt3"),
                4: () => makeTile("bigtree-pt4"),
                5: () => makeTile("tree-t"),
                6: () => makeTile("tree-b"),
              },
            }
          ),
          addLevel(
            [
              " 00000000000000 ",
              "0     11       0",
              "0           11 0",
              "0           11 0",
              "0              0",
              "0   2          0",
              "0   2      3333 ",
              "0   2      0   0",
              "0   3333333    0",
              "0    0         0",
              "0          0000 ",
              "0          0    ",
              " 0000000000     ",
              "                ",
            ],
            {
              tileWidth: 16,
              tileHeight: 16,
              tiles: {
                0: () => [
                  area({ shape: new Rect(vec2(0), 16, 16) }),
                  body({ isStatic: true }),
                ],
                1: () => [
                  area({
                    shape: new Rect(vec2(0), 8, 8),
                    offset: vec2(4, 4),
                  }),
                  body({ isStatic: true }),
                ],
                2: () => [
                  area({ shape: new Rect(vec2(0), 2, 16) }),
                  body({ isStatic: true }),
                ],
                3: () => [
                  area({
                    shape: new Rect(vec2(0), 16, 20),
                    offset: vec2(0, -4),
                  }),
                  body({ isStatic: true }),
                ],
              },
            }
          ),
        ];

        for (const layer of map) {
            layer.use(scale(4));
            for (const tile of layer.children) {
              if (tile.type) {
                tile.play(tile.type);
              }
            }
          }

          add([
            sprite("mini-mons"),
            area(),
            body({ isStatic: true }),
            pos(100, 700),
            scale(4),
            "cat",
          ]);
        
          const spiderMon = add([
            sprite("mini-mons"),
            area(),
            body({ isStatic: true }),
            pos(400, 300),
            scale(4),
            "spider",
          ]);
          spiderMon.play("spider");
          spiderMon.flipX = true;
        
          const centipedeMon = add([
            sprite("mini-mons"),
            area(),
            body({ isStatic: true }),
            pos(100, 100),
            scale(4),
            "centipede",
          ]);
          centipedeMon.play("centipede");
        
          const grassMon = add([
            sprite("mini-mons"),
            area(),
            body({ isStatic: true }),
            pos(900, 570),
            scale(4),
            "grass",
          ]);
          grassMon.play("grass");


          add([
            sprite("npc"),
            scale(4),
            pos(600, 700),
            area(),
            body({ isStatic: true }),
            "npc",
          ]);
        
          const player = add([
            sprite("player-down"),
            pos(500, 700),
            scale(4),
            area(),
            body(),
            {
              currentSprite: "player-down",
              speed: 300,
              isInDialogue: false,
            },
          ]);

          let tick = 0;
          onUpdate(() => {
            camPos(player.pos);
            tick++;
            if (
              (isKeyDown("down") || isKeyDown("up")) &&
              tick % 20 === 0 &&
              !player.isInDialogue
            ) {
              player.flipX = !player.flipX;
            }
          });

          function setSprite(player, spriteName) {
            if (player.currentSprite !== spriteName) {
              player.use(sprite(spriteName));
              player.currentSprite = spriteName;
            }
          }
        
          onKeyDown("down", () => {
            if (player.isInDialogue) return;
            setSprite(player, "player-down");
            player.move(0, player.speed);
          });
        
          onKeyDown("up", () => {
            if (player.isInDialogue) return;
            setSprite(player, "player-up");
            player.move(0, -player.speed);
          });
        
          onKeyDown("left", () => {
            if (player.isInDialogue) return;
            player.flipX = false;
            if (player.curAnim() !== "walk") {
              setSprite(player, "player-side");
              player.play("walk");
            }
            player.move(-player.speed, 0);
          });
        
          onKeyDown("right", () => {
            if (player.isInDialogue) return;
            player.flipX = true;
            if (player.curAnim() !== "walk") {
              setSprite(player, "player-side");
              player.play("walk");
            }
            player.move(player.speed, 0);
          });
        
          onKeyRelease("left", () => {
            player.stop();
          });
        
          onKeyRelease("right", () => {
            player.stop();
          });

          if (!worldState) {
            worldState = {
              playerPos: player.pos,
              faintedMons: [],
            };
          }
        
          player.pos = vec2(worldState.playerPos);
          for (const faintedMon of worldState.faintedMons) {
            destroy(get(faintedMon)[0]);
          }


          player.onCollide("npc", () => {
            player.isInDialogue = true;
            const dialogueBoxFixedContainer = add([fixed()]);
            const dialogueBox = dialogueBoxFixedContainer.add([
              rect(1000, 200),
              outline(5),
              pos(150, 500),
              fixed(),
            ]);
            const dialogue =
              "Defeat all monsters on this island and you'll become the champion!";
            const content = dialogueBox.add([
              text("", {
                size: 42,
                width: 900,
                lineSpacing: 15,
              }),
              color(10, 10, 10),
              pos(40, 30),
              fixed(),
            ]);
          
            if (worldState.faintedMons.length < 4) {
              content.text = dialogue;
            } else {
              content.text = "You're the champion!";
            }
        
            onUpdate(() => {
              if (isKeyDown("space")) {
                destroy(dialogueBox);
                player.isInDialogue = false;
              }
            });
          });

          function flashScreen() {
            const flash = add([
              rect(1280, 720),
              color(10, 10, 10),
              fixed(),
              opacity(0),
            ]);
            tween(
              flash.opacity,
              1,
              0.5,
              (val) => (flash.opacity = val),
              easings.easeInBounce
            );
          }
        
          function onCollideWithPlayer(enemyName, player, worldState) {
            player.onCollide(enemyName, () => {
              flashScreen();
              setTimeout(() => {
                worldState.playerPos = player.pos;
                worldState.enemyName = enemyName;
                go("battle", worldState);
              }, 1000);
            });
          }
        
          onCollideWithPlayer("cat", player, worldState);
          onCollideWithPlayer("spider", player, worldState);
          onCollideWithPlayer("centipede", player, worldState);
          onCollideWithPlayer("grass", player, worldState);

          let menuOpen = false;
          let menuContainer;
          let selectedOptionIndex = 0; // Tracks the currently selected menu option
          const menuOptions = ["Dex", "Mons", "Bag", "Stats", "Save", "Quit"];
          
          // Function to create the menu
          function createMenu() {
              menuContainer = add([
                 fixed(),// Ensures the menu stays fixed on the screen
                  pos(800, 20), // Position the menu in the top-right corner
                  rect(320, 240), // Adjust the size of the menu
                  outline(4),
                  color(255, 255, 255), // White background
                  opacity(1), // Fully visible
                  "menu",
              ]);
          
              menuOptions.forEach((option, index) => {
                  menuContainer.add([
                    fixed(),// Ensures the menu stays fixed on the screen
                      text(`${index === selectedOptionIndex ? "• " : "  "}${option}`, { size: 24 }), // Add a dot for the selected option
                      pos(20, 20 + index * 40), // Position each option with spacing
                      color(0, 0, 0), // Black text color
                      { tag: `menu-option-${index}` }, // Assign a tag for easy access
                  ]);
              });
          }
          
          // Function to update the menu display
          function updateMenu() {
              menuContainer.children.forEach((child, index) => {
                  if (child.tag === `menu-option-${index}`) {
                      child.text = `${index === selectedOptionIndex ? "• " : "  "}${menuOptions[index]}`;
                  }
              });
          }
          
          // Function to toggle the menu
          function toggleMenu() {
              if (menuOpen) {
                  destroy(menuContainer);
                  menuOpen = false;
              } else {
                  createMenu();
                  menuOpen = true;
              }
          }
          
          // Listen for the 'x' key to toggle the menu
          onKeyPress("x", () => {
              if (player.isInDialogue) return; // Prevent menu during dialogue
              toggleMenu();
          });
          
          // Listen for the 'up' and 'down' keys to navigate the menu
          onKeyPress("up", () => {
              if (!menuOpen) return;
              selectedOptionIndex = (selectedOptionIndex - 1 + menuOptions.length) % menuOptions.length;
              updateMenu();
          });
          
          onKeyPress("down", () => {
              if (!menuOpen) return;
              selectedOptionIndex = (selectedOptionIndex + 1) % menuOptions.length;
              updateMenu();
          });
        }

