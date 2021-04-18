import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service';
import { AudioService } from './services/audio.service';
import { CameraService } from './services/camera.service';
import { CollisionService } from './services/collision.service';
import { GameService } from './services/game.service';
import { MapService } from './services/map.service';
import { Sprite, SpriteService } from './services/sprite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  direction:string;
  
  x: number=200;
  y: number=300;

  max_x: number= 3500;
  max_y: number= 2500;

  gameState: string ='';

  constructor(private _spriteService: SpriteService, 
    private _cameraService: CameraService, 
    private _aiService: AiService, 
    private _mapService: MapService,
    private _collisionService: CollisionService,
    private _gameService: GameService,
    private _audioService: AudioService) {}

  @HostListener('document:keydown', ['$event'])
  handleKey(event: any) {
    if (event.key=='ArrowRight') {
      this.x=this.x+10;
      this._spriteService.sprites[0].direction='right'
    }
    else if (event.key=='ArrowLeft') {
      this.x=this.x-10;
      this._spriteService.sprites[0].direction='left';
    }
    else if (event.key =='ArrowUp') {
      this.y=this.y-10;
    }
    else if (event.key=='ArrowDown') {
      this.y=this.y+10;
    }
    event.preventDefault();
  }
  

  ngOnInit(): void {
    let elem = document.getElementById('map');
    let params = {
      width: this._mapService.MAX_X,
      height: this._mapService.MAX_Y
    };
    let two = new Two(params).appendTo(elem);
    document.addEventListener('click', ()=>{
      this._audioService.playBackgroundMusic();
      if (this.gameState =='opening' || this.gameState=='gameover' || this.gameState =='gameclear') {
        this._gameService.state ='playing'
      }
    });

    document.addEventListener('mousemove', ()=>{
      this._audioService.playBackgroundMusic();
    });

    this.initialize(two)

    this._gameService.stateObservable.subscribe((value)=>{
      this.gameState = value;
      switch(value) {
        case 'opening':
          this._gameService.hideScore()
          this._gameService.displayTitle(two)
          break;
        case 'playing':
          this._gameService.hideTitle()
          this.initialize(two)
          break;
        case 'gameover':
          //this._gameService.hideScore()
          this._gameService.displayGameOver(two)
          break;
        case 'gameclear':
          this._gameService.displayGameClear(two)
          break;
      }
    })
    //rectangle.scale=.7;
    two.bind('update', (framesPerSecond)=>{
     //this.playing(two)
     if (this.gameState == 'opening') {
       this.opening(two)
       this.playing(two, true) //enable auto mode
     }
     else if (this.gameState =='playing') {
       this.playing(two)
     }
     else if (this.gameState == 'gameover'){
       //do nothing.
     }
    }).play();
  }

  initialize(two: any) {
    // resetting of all members of the array by making their scale to be 0, and splicing it from array.
    for (let i=this._spriteService.sprites.length-1; i>0; i--) {
      this._spriteService.sprites[i].scale = 0;
      if (this._spriteService.sprites[i].spriteReference) {
        this._spriteService.sprites[i].spriteReference.scale = 0 
      }
      this._spriteService.sprites.splice(i, 1);
    }

    this._spriteService.sprites[0].x = 200;
    this._spriteService.sprites[0].y = 200;
    this._spriteService.sprites[0].state =0;
    if (this._spriteService.sprites[0].spriteReference) this._spriteService.sprites[0].spriteReference.scale = 0

    this.x = 200;
    this.y= 200;
    this._spriteService.populateWilliam(15);
    this._spriteService.populateEngelfish(1);
    this._spriteService.populateSeaweeds(7);
    this._spriteService.populateRocks(9);
    this._mapService.init(two);
    this._gameService.initScore(two)

    //loop through service
    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      let sprite=this._spriteService.sprites[i];
      this._spriteService.sprites[i].spriteReference=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
      this._spriteService.sprites[i].spriteReference.scale=this._spriteService.sprites[i].scale;
    }
  }

  opening(two:any) {
    //this._gameService.displayTitle(two)
    this._gameService.animateTitle()
  }

  playing(two: any, autopilot: boolean  = false) {
     // this is where animatoin happens
     if (!autopilot) { // Do NOT run this block of code, if it's on auto-pilot
      if (!this._collisionService.detectBorder(this._spriteService.sprites[0],this._spriteService.sprites[0].x,this._spriteService.sprites[0].y, this.x, this.y)) {
        this._spriteService.sprites[0].spriteReference.translation.x=this.x;
        this._spriteService.sprites[0].x= this.x;
        this._spriteService.sprites[0].spriteReference.translation.y=this.y;
        this._spriteService.sprites[0].y= this.y;
        this._cameraService.zoomCamera(this.x, this.y);
      }
      else {
        this.x = this._spriteService.sprites[0].x
        this.y = this._spriteService.sprites[0].y
      }
     }
     if (this._spriteService.sprites[0].state <0 ) {
       this._gameService.state = 'gameover'
     }
    
    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      if (i>0 || autopilot) {
        if (!this._spriteService.sprites[i]) continue
        let oldX = this._spriteService.sprites[i].x
        let oldY = this._spriteService.sprites[i].y
        this._spriteService.sprites[i]=this._aiService.basicAI(this._spriteService.sprites[i]);
        if (!this._collisionService.detectBorder(this._spriteService.sprites[i], oldX, oldY, this._spriteService.sprites[i].x, this._spriteService.sprites[i].y)) {
          this._spriteService.sprites[i].spriteReference.translation.x = this._spriteService.sprites[i].x;
          this._spriteService.sprites[i].spriteReference.translation.y = this._spriteService.sprites[i].y;
          this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
        }
        else {
          this._spriteService.sprites[i].x=oldX
          this._spriteService.sprites[i].y=oldY
        }
        if (!autopilot) this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
      }
      if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
        this._spriteService.sprites[i].lastDirection=this._spriteService.sprites[i].direction;
        if (this._spriteService.sprites[i].direction=='right') {
          this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1])
        }
        else {
          this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0], this._spriteService.sprites[i].leftFrames[1])
        }
      }
    }
    let numberOfWilliams = 0
    for (let sprite of this._spriteService.sprites) {
      if (sprite.type=='prey' && sprite.spriteReference.scale>0) {
        numberOfWilliams++
      }
    }
    if (numberOfWilliams==0) {
      this._gameService.state = 'gameclear'
    }
    if (!autopilot) this._gameService.displayScore(two, this.x, this.y, numberOfWilliams); 
  }

  title = 'BabyShark';

}
