import Phaser from 'phaser';
import { MainScene } from './scenes/mainScene/mainScene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: '',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200, x: 0 },
      debug: !import.meta.env.PRO
    }
  },
  input: {
    gamepad: true // gamepad 有効化
  },
  scene: [MainScene]
};
