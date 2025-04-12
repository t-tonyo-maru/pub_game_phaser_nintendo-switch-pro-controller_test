import Phaser from 'phaser';
import { MAIN_SCENE_KEY } from '~/constants/sceneKeys';
import { VITE_GITHUB_PAGES_PATH } from '~/constants/urls';

const CONTROLLER_BUTTON_COUNT = 22;
const BUTTON_STATUS_COLORS = {
  ON: 0x888888,
  OFF: 0xffffff
};

/**
 * https://phaser.io/examples/v3.85.0/input/gamepad
 * https://phaser.io/examples/v3.85.0/input/gamepad/view/move-sprite
 */
export class MainScene extends Phaser.Scene {
  title!: Phaser.GameObjects.Text;
  warning!: Phaser.GameObjects.Text;
  pad: Phaser.Input.Gamepad.Gamepad | null;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  isLStickControl!: boolean;

  // text
  texts: Phaser.GameObjects.Text[] = [
    //  1: Left stick axes X,
    //  2: Left stick axes Y,
    //  3: Right stick axes X,
    //  4: Right stick axes Y,
    //  5: Button L,
    //  6: Button R,
    //  7: Button ZL,
    //  8: Button ZR,
    //  9: Button left stick,
    // 10: Button reft stick,
    // 11: Button minus,
    // 12: Button plus,
    // 13: Button home,
    // 14: Button capture,
    // 15: Button B,
    // 16: Button A,
    // 17: Button Y,
    // 18: Button X,
    // 19: Cursor T,
    // 20: Cursor B,
    // 21: Cursor L,
    // 22: Cursor R,
  ];
  // controller + buttons
  controllerBg!: Phaser.GameObjects.Image;
  aButton!: Phaser.GameObjects.Image;
  bButton!: Phaser.GameObjects.Image;
  xButton!: Phaser.GameObjects.Image;
  yButton!: Phaser.GameObjects.Image;
  lButton!: Phaser.GameObjects.Image;
  rButton!: Phaser.GameObjects.Image;
  zlButton!: Phaser.GameObjects.Image;
  zrButton!: Phaser.GameObjects.Image;
  stickLButton!: Phaser.GameObjects.Image;
  stickRButton!: Phaser.GameObjects.Image;
  plusButton!: Phaser.GameObjects.Image;
  minusButton!: Phaser.GameObjects.Image;
  cursorTop!: Phaser.GameObjects.Image;
  cursorBottom!: Phaser.GameObjects.Image;
  cursorLeft!: Phaser.GameObjects.Image;
  cursorRight!: Phaser.GameObjects.Image;
  homeButton!: Phaser.GameObjects.Image;
  captureButton!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: MAIN_SCENE_KEY });
    this.pad = null;
  }

  preload() {
    this.load.image(
      'controller',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/controller.png`
    );
    this.load.image(
      'BUTTON_A',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/a.png`
    );
    this.load.image(
      'BUTTON_B',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/b.png`
    );
    this.load.image(
      'BUTTON_X',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/x.png`
    );
    this.load.image(
      'BUTTON_Y',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/y.png`
    );
    this.load.image(
      'BUTTON_L',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/l.png`
    );
    this.load.image(
      'BUTTON_R',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/r.png`
    );
    this.load.image(
      'BUTTON_ZL',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/zl.png`
    );
    this.load.image(
      'BUTTON_ZR',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/zr.png`
    );
    this.load.image(
      'BUTTON_STICK',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/stick.png`
    );
    this.load.image(
      'BUTTON_STICK',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/stick.png`
    );
    this.load.image(
      'BUTTON_MINUS',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/-.png`
    );
    this.load.image(
      'BUTTON_PLUS',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/+.png`
    );
    this.load.image(
      'CURSOR_BOTTOM',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/cursor_bottom.png`
    );
    this.load.image(
      'CURSOR_LEFT',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/cursor_left.png`
    );
    this.load.image(
      'CURSOR_RIGHT',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/cursor_right.png`
    );
    this.load.image(
      'CURSOR_TOP',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/cursor_top.png`
    );
    this.load.image(
      'HOME',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/home.png`
    );
    this.load.image(
      'SCREEN',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/controllers/capture.png`
    );
    this.load.image(
      'KIRITAN',
      `${VITE_GITHUB_PAGES_PATH}/assets/game/images/kiritan.png`
    );
  }

  create() {
    // title
    this.title = this.add
      .text(
        this.scale.width / 2,
        32,
        'Phaser x Nintendo Switch Pro Controller Test',
        {
          color: '#ffffff',
          fontSize: 32
        }
      )
      .setOrigin(0.5);
    // player
    this.player = this.physics.add.sprite(
      this.scale.width / 2,
      (this.scale.height * 3) / 4,
      'KIRITAN'
    );
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    // cursor or LStick control flag
    this.isLStickControl = false;
    // toggle button for LStick control
    const toggleButton = this.add
      .text(this.scale.width * 0.8, this.scale.height * 0.9, 'Toggle Control', {
        color: '#ffffff',
        fontSize: 24,
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    toggleButton.on('pointerdown', () => {
      this.isLStickControl = !this.isLStickControl;
      toggleButton.setText(
        `Control is ${this.isLStickControl ? 'LStick' : 'CURSOR'}`
      );
    });

    // controller background
    this.controllerBg = this.add
      .image(this.scale.width * 0.75, this.scale.height * 0.45, 'controller')
      .setScale(1)
      .setOrigin(0.5);
    // buttons
    this.aButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.343,
      this.controllerBg.y + this.controllerBg.height * -0.199,
      'BUTTON_A'
    );
    this.bButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.265,
      this.controllerBg.y + this.controllerBg.height * -0.098,
      'BUTTON_B'
    );
    this.xButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.265,
      this.controllerBg.y + this.controllerBg.height * -0.295,
      'BUTTON_X'
    );
    this.yButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.187,
      this.controllerBg.y + this.controllerBg.height * -0.199,
      'BUTTON_Y'
    );
    this.lButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.28,
      this.controllerBg.y + this.controllerBg.height * -0.6,
      'BUTTON_L'
    );
    this.rButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.28,
      this.controllerBg.y + this.controllerBg.height * -0.6,
      'BUTTON_R'
    );
    this.zlButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.28,
      this.controllerBg.y + this.controllerBg.height * -0.75,
      'BUTTON_ZL'
    );
    this.zrButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.28,
      this.controllerBg.y + this.controllerBg.height * -0.75,
      'BUTTON_ZR'
    );
    this.stickLButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.275,
      this.controllerBg.y + this.controllerBg.height * -0.195,
      'BUTTON_STICK'
    );
    this.stickRButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.13,
      this.controllerBg.y + this.controllerBg.height * 0.002,
      'BUTTON_STICK'
    );
    this.cursorTop = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.155,
      this.controllerBg.y + this.controllerBg.height * -0.075,
      'CURSOR_TOP'
    );
    this.cursorBottom = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.155,
      this.controllerBg.y + this.controllerBg.height * 0.075,
      'CURSOR_BOTTOM'
    );
    this.cursorLeft = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.202,
      this.controllerBg.y + this.controllerBg.height * 0.0,
      'CURSOR_LEFT'
    );
    this.cursorRight = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.105,
      this.controllerBg.y + this.controllerBg.height * 0.0,
      'CURSOR_RIGHT'
    );
    this.plusButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.1225,
      this.controllerBg.y + this.controllerBg.height * -0.305,
      'BUTTON_PLUS'
    );
    this.minusButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.1225,
      this.controllerBg.y + this.controllerBg.height * -0.305,
      'BUTTON_MINUS'
    );
    this.homeButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * 0.072,
      this.controllerBg.y + this.controllerBg.height * -0.199,
      'HOME'
    );
    this.captureButton = this.add.image(
      this.controllerBg.x + this.controllerBg.width * -0.07,
      this.controllerBg.y + this.controllerBg.height * -0.198,
      'SCREEN'
    );

    // game pad
    if (!this.input.gamepad) return;
    this.input.gamepad.once(
      'connected',
      (pad: Phaser.Input.Gamepad.Gamepad) => {
        this.pad = pad;

        // button down
        pad.on('down', (buttonCode: number) => {
          this.renderControllerButtonStatusText(buttonCode, true);
          this.renderControllerButtonImage(buttonCode, true);
          if (!this.isLStickControl) {
            this.movePlayerWithCursor(buttonCode, true);
          }
        });
        // button up
        pad.on('up', (buttonCode: number) => {
          this.renderControllerButtonStatusText(buttonCode, false);
          this.renderControllerButtonImage(buttonCode, false);
          if (!this.isLStickControl) {
            this.movePlayerWithCursor(buttonCode, false);
          }
        });
      }
    );

    // initial game pad text
    this.renderControllerInitialStatusText();
  }

  update(): void {
    if (!this.pad) return;
    // left stick
    this.texts[0].text = `left stick axes x: ${this.pad.axes[0].getValue()}`;
    this.texts[1].text = `left stick axes y: ${this.pad.axes[1].getValue()}`;
    this.stickLButton.setPosition(
      this.controllerBg.x +
        this.controllerBg.width * -0.275 +
        14 * this.pad.axes[0].getValue(),
      this.controllerBg.y +
        this.controllerBg.height * -0.195 +
        14 * this.pad.axes[1].getValue()
    );

    // right stick
    this.texts[2].text = `right stick axes x: ${this.pad.axes[2].getValue()}`;
    this.texts[3].text = `right stick axes y: ${this.pad.axes[3].getValue()}`;
    this.stickRButton.setPosition(
      this.controllerBg.x +
        this.controllerBg.width * 0.13 +
        14 * this.pad.axes[2].getValue(),
      this.controllerBg.y +
        this.controllerBg.height * 0.002 +
        14 * this.pad.axes[3].getValue()
    );

    if (this.isLStickControl) {
      this.movePlayerWithLStick();
    }
  }

  renderControllerInitialStatusText(): void {
    for (let i = 0; i < CONTROLLER_BUTTON_COUNT; i++) {
      let text = '';
      if (i === 0) {
        text = 'left stick axes x: 0';
      } else if (i === 1) {
        text = 'left stick axes y: 0';
      } else if (i === 2) {
        text = 'right stick axes x: 0';
      } else if (i === 3) {
        text = 'right stick axes y: 0';
      } else if (i === 4) {
        text = 'Button L: OFF';
      } else if (i === 5) {
        text = 'Button R: OFF';
      } else if (i === 6) {
        text = 'Button ZL: OFF';
      } else if (i === 7) {
        text = 'Button ZR: OFF';
      } else if (i === 8) {
        text = 'Button LStick: OFF';
      } else if (i === 9) {
        text = 'Button RStick: OFF';
      } else if (i === 10) {
        text = 'Button Minus: OFF';
      } else if (i === 11) {
        text = 'Button Plus: OFF';
      } else if (i === 12) {
        text = 'Button Home: OFF';
      } else if (i === 13) {
        text = 'Button Capture: OFF';
      } else if (i === 14) {
        text = 'Button B: OFF';
      } else if (i === 15) {
        text = 'Button A: OFF';
      } else if (i === 16) {
        text = 'Button Y: OFF';
      } else if (i === 17) {
        text = 'Button X: OFF';
      } else if (i === 18) {
        text = 'Cursor T: OFF';
      } else if (i === 19) {
        text = 'Cursor B: OFF';
      } else if (i === 20) {
        text = 'Cursor L: OFF';
      } else if (i === 21) {
        text = 'Cursor R: OFF';
      }

      this.texts.push(
        this.add
          .text(
            this.scale.width * 0.1,
            this.scale.height * 0.1 + i * 28,
            text,
            {
              color: '#ffffff',
              fontSize: 20
            }
          )
          .setOrigin(0, 0.5)
      );
    }
  }

  renderControllerButtonStatusText(buttonCode: number, on: boolean): void {
    const status = on ? 'ON' : 'OFF';
    if (buttonCode === 4) {
      this.texts[4].text = `Button L: ${status}`;
    }
    if (buttonCode === 5) {
      this.texts[5].text = `Button R: ${status}`;
    }
    if (buttonCode === 6) {
      this.texts[6].text = `Button ZL: ${status}`;
    }
    if (buttonCode === 7) {
      this.texts[7].text = `Button ZR: ${status}`;
    }
    if (buttonCode === 10) {
      this.texts[8].text = `Button LStick: ${status}`;
    }
    if (buttonCode === 11) {
      this.texts[9].text = `Button RStick: ${status}`;
    }
    if (buttonCode === 8) {
      this.texts[10].text = `Button Minus: ${status}`;
    }
    if (buttonCode === 9) {
      this.texts[11].text = `Button Plus: ${status}`;
    }
    if (buttonCode === 16) {
      this.texts[12].text = `Button Home: ${status}`;
    }
    if (buttonCode === 17) {
      this.texts[13].text = `Button Capture: ${status}`;
    }
    if (buttonCode === 0) {
      this.texts[14].text = `Button B: ${status}`;
    }
    if (buttonCode === 1) {
      this.texts[15].text = `Button A: ${status}`;
    }
    if (buttonCode === 2) {
      this.texts[16].text = `Button Y: ${status}`;
    }
    if (buttonCode === 3) {
      this.texts[17].text = `Button X: ${status}`;
    }
    if (buttonCode === 12) {
      this.texts[18].text = `Cursor T: ${status}`;
    }
    if (buttonCode === 13) {
      this.texts[19].text = `Cursor B: ${status}`;
    }
    if (buttonCode === 14) {
      this.texts[20].text = `Cursor L: ${status}`;
    }
    if (buttonCode === 15) {
      this.texts[21].text = `Cursor R: ${status}`;
    }
  }

  renderControllerButtonImage(buttonCode: number, on: boolean): void {
    if (buttonCode === 4) {
      // Button L
      if (this.lButton) {
        this.lButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 5) {
      // Button R
      if (this.rButton) {
        this.rButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 6) {
      // Button ZL
      if (this.zlButton) {
        this.zlButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 7) {
      // Button ZR
      if (this.zrButton) {
        this.zrButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 10) {
      // Button LStick
      if (this.stickLButton) {
        this.stickLButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 11) {
      // Button RStick
      if (this.stickRButton) {
        this.stickRButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 8) {
      // Button Minus
      if (this.minusButton) {
        this.minusButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 9) {
      // Button Plus
      if (this.plusButton) {
        this.plusButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 16) {
      // Button Home
      if (this.homeButton) {
        this.homeButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 17) {
      // Button Capture
      if (this.captureButton) {
        this.captureButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 0) {
      // Button B
      if (this.bButton) {
        this.bButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 1) {
      // Button A
      if (this.aButton) {
        this.aButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 2) {
      // Button Y
      if (this.yButton) {
        this.yButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 3) {
      // Button X
      if (this.xButton) {
        this.xButton.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 12) {
      // Cursor T
      if (this.cursorTop) {
        this.cursorTop.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 13) {
      // Cursor B
      if (this.cursorBottom) {
        this.cursorBottom.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 14) {
      // Cursor L
      if (this.cursorLeft) {
        this.cursorLeft.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
    if (buttonCode === 15) {
      // Cursor R
      if (this.cursorRight) {
        this.cursorRight.setTint(
          on ? BUTTON_STATUS_COLORS.ON : BUTTON_STATUS_COLORS.OFF
        );
      }
    }
  }

  movePlayerWithCursor(buttonCode: number, on: boolean): void {
    if (buttonCode === 12) {
      // Cursor T
      if (this.cursorTop) {
        this.player.setVelocityY(on ? -200 : 0);
      }
    }
    if (buttonCode === 13) {
      // Cursor B
      if (this.cursorBottom) {
        this.player.setVelocityY(on ? 200 : 0);
      }
    }
    if (buttonCode === 14) {
      // Cursor L
      if (this.cursorLeft) {
        this.player.setVelocityX(on ? -200 : 0);
      }
    }
    if (buttonCode === 15) {
      // Cursor R
      if (this.cursorRight) {
        this.player.setVelocityX(on ? 200 : 0);
      }
    }
  }

  movePlayerWithLStick(): void {
    if (!this.pad) return;
    this.player.setVelocityX(400 * this.pad.axes[0].getValue());
    this.player.setVelocityY(400 * this.pad.axes[1].getValue());
  }
}
