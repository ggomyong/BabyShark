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
  type: string;

  url: string;
  fps: number; //frames per second
  x: number; // horizontal coordinate
  y: number; //vertical coordinate

  rows: number; // how many rows in your sprite sheet
  columns: number; //how many columns in your sprite sheet

  spriteReference: any;

  leftFrames: number[];
  rightFrames: number[];
}

@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  seaweed: Sprite = {
    name: 'Seaweed',
    type: 'passable',
    visibility: true,
    state: 0,
    direction: 'none',
    lastDirection: 'none',
    maxSpeed: 0,
    acceleration: 0,
    scale: 1,
    playable: false,
    url: '../assets/sprites/seaweeds 2.png',
    fps: 1,
    x: 0,
    y: 0,
    rows: 2,
    columns: 1,
    spriteReference: null,
    leftFrames: [0, 1],
    rightFrames: [0, 1]
  }
  rock: Sprite = {
    name: 'Rock',
    type: 'block',
    visibility: true,
    state: 0,
    direction: 'none',
    lastDirection: 'none',
    maxSpeed: 0,
    acceleration: 0,
    scale: 1,
    playable: false,
    url: '../assets/sprites/rocks.png',
    fps: 2,
    x: 0,
    y: 0,
    rows: 2,
    columns: 1,
    spriteReference: null,
    leftFrames: [0, 1],
    rightFrames: [0, 1]
  }

  william:Sprite= {
    name: 'William',
      type: 'prey',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 4,
      acceleration: 1,
      scale: .5,
      playable: true,
      url: '../assets/sprites/william.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 2,
      columns: 2,
      spriteReference: null,
      leftFrames: [2, 3],
      rightFrames: [0, 1]
  }

  engelfish: Sprite= {
    name: 'Engelfish',
    type: 'predator',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 5,
      acceleration: 1,
      scale: 1.3,
      playable: true,
      url: '../assets/sprites/engelfish.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 2,
      columns: 2,
      spriteReference: null,
      leftFrames: [2, 3],
      rightFrames: [0, 1]
  }

  sprites:Sprite[]=[
    {
      name: 'Baby Shark',
      type: 'self',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 6,
      acceleration: 1,
      scale: .9,
      playable: true,
      url: '../assets/sprites/babysharks.png',
      fps: 4,
      x: 0,
      y: 0,
      rows: 2,
      columns: 2,
      spriteReference: null,
      leftFrames: [2, 3],
      rightFrames: [0, 1]
    },
  ];

  populateWilliam(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let william = this.william;
      william.x = Math.floor(Math.random() * 50* i)+300;
      william.y = Math.floor(Math.random() * 30* i)+200;

      this.sprites.push(JSON.parse(JSON.stringify(william)));
    }
  }

  populateEngelfish(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let engelfish = this.engelfish;
      engelfish.x = Math.floor(Math.random() * 1500* i);
      engelfish.y = Math.floor(Math.random() * 1150* i);

      this.sprites.push(JSON.parse(JSON.stringify(engelfish)));
    }
  }

  populateSeaweeds(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let seaweed = this.seaweed;
      seaweed.x = Math.floor(Math.random() * 1000* i);
      seaweed.y = 700 + (Math.random()*100)

      this.sprites.push(JSON.parse(JSON.stringify(seaweed)));
    }
  }

  populateRocks(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let rock = this.rock;
      rock.x = Math.floor(Math.random() * 1000* i);
      rock.y = 700 + (Math.random()*100)

      this.sprites.push(JSON.parse(JSON.stringify(rock)));
    }
  }

  hideAll() {
    for (let i=0; i<this.sprites.length; i++) {
      this.sprites[i].spriteReference.scale= 0;
    }
  }

  showAll() {
    for (let i=0; i<this.sprites.length; i++) {
      this.sprites[i].spriteReference.scale= this.sprites[i].scale;
    }
  }

  constructor() { }
}
