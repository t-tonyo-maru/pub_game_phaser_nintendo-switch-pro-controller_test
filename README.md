# pub_game_phaser_nintendo-switch-pro-controller_test

## Summary

This repository is text of [Phaser3](https://phaser.io/) x [Nintendo Switch Pro Controller](https://www.nintendo.com/jp/hardware/switch/accessories/index.html)

## Development environment

| tool    | version |
| ------- | ------- |
| Phaser3 | 3.88.2  |
| node    | >=22    |

## Commands

| Command         | Content           |
| --------------- | ----------------- |
| npm run dev     | run dev server    |
| npm run build   | build app         |
| npm run preview | preview built app |
| npm run format  | run code format   |
| npm run test    | run vitest        |

## Quik Start

1. Run `npm i` command
2. Run `npm run dev` command

## Demo url

https://t-tonyo-maru.github.io/pub_game_phaser_nintendo-switch-pro-controller_test/

## Explanation article(ja)

https://zenn.dev/t_tonyo_maru/articles/dacae1477fda3f

## How to Check Operation

1. Connect the Nintendo Switch Pro Controller to your PC using a USB cable or Bluetooth.
   - For guaranteed operation, connect only one Nintendo Switch Pro Controller to your PC.
2. Open the demo URL
   - demo url: https://t-tonyo-maru.github.io/pub_game_phaser_nintendo-switch-pro-controller_test/
3. After the screen loads, press any button on the Nintendo Switch Pro Controller to trigger the connection event (`connected`).
4. Once the connection event is triggered, the Nintendo Switch Pro Controller will be ready for use. You can control Tohoku Kiritan using the D-pad.
   - Press the "Toggle Control" button at the bottom-right of the screen to switch from D-pad control to left stick control.
   - The button states during operation will be displayed as mappings on the top-right of the screen.

## Phaser x Nintendo switch pro controller button code

| button      | code |
| ----------- | ---- |
| B           | 0    |
| A           | 1    |
| Y           | 2    |
| X           | 3    |
| L           | 4    |
| R           | 5    |
| ZL          | 6    |
| ZR          | 7    |
| Minus       | 8    |
| Plus        | 9    |
| Left stick  | 10   |
| Right stick | 11   |
| D-pad up    | 12   |
| D-pad down  | 13   |
| D-pad left  | 14   |
| D-pad right | 15   |
| Home        | 16   |
| Captcha     | 17   |

## Links

- Phaser3
  - [Phaser3](https://phaser.io/)
  - [Gamepad example | Phaser3](https://phaser.io/examples/v3.85.0/input/gamepad)
- Controller
  - [Nintendo Switch Pro Controller](https://www.nintendo.com/jp/hardware/switch/accessories/index.html)
