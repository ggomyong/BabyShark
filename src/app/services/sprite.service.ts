import { Injectable } from '@angular/core';

export interface Sprite {
  name: string;
  visibility: boolean;
  state: number; // 1=moving, 0=stationary
  direction: string; // left, right, up, down.
  lastDirection: string;
  maxSpeed: number; 
  acceleration: number;
  scale: number;
  playable: boolean;

  url: string;
  fps: number; //frames per second
  x: number; // horizontal coordinate
  y: number; //vertical coordinate

  rows: number; // how many rows in your sprite sheet
  columns: number; //how many columns in your sprite sheet

  sprite: any;

  leftFrames: number[];
  rightFrames: number[];
}

@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  william:Sprite= {
    name: 'William',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 10,
      acceleration: 1,
      scale: .7,
      playable: true,
      url: '../assets/sprites/william2.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 2,
      columns: 2,
      sprite: null,
      leftFrames: [2, 3],
      rightFrames: [0, 1]
  }

  engelfish: Sprite= {
    name: 'Engelfish',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 10,
      acceleration: 1,
      scale: .7,
      playable: true,
      url: '../assets/sprites/engelfish2.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 2,
      columns: 2,
      sprite: null,
      leftFrames: [2, 3],
      rightFrames: [0, 1]
  }

  sprites:Sprite[]=[
    {
      name: 'Baby Shark',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 10,
      acceleration: 1,
      scale: .7,
      playable: true,
      url: '../assets/sprites/babysharks.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 2,
      columns: 2,
      sprite: null,
      leftFrames: [2, 3],
      rightFrames: [0, 1]
    },
  ];

  constructor() { }

  populateWilliam(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let william = this.william;
      //william.x = Math.floor(Math.random() * 50* i)+300;
      //william.y = Math.floor(Math.random() * 10* i)+200;
      william.x = 200+i;
      william.y= 200+i;
      this.sprites.push(JSON.parse(JSON.stringify(william)));
    }
  }

  populateEngelfish(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let engelfish = this.engelfish;
      //engelfish.x = Math.floor(Math.random() * 500* i);
      //engelfish.y = Math.floor(Math.random() * 100* i);
      engelfish.x = 200+i;
      engelfish.y= 200+i;
      this.sprites.push(JSON.parse(JSON.stringify(engelfish)));
    }
  }
}
