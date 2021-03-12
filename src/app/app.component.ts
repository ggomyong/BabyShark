import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service.js';
import { AudioService } from './services/audio.service.js';
import { CameraService } from './services/camera.service.js';
import { CollisionService } from './services/collision.service.js';
import { GameService } from './services/game.service.js';
import { MapService } from './services/map.service.js';
import { Sprite, SpriteService } from './services/sprite.service.js';

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
      if (this.gameState =='opening') {
        this._gameService.state ='playing'
      }
    });

    document.addEventListener('mousemove', ()=>{
      this._audioService.playBackgroundMusic();
    });

    this._spriteService.populateWilliam(15);
    this._spriteService.populateEngelfish(1);
    this._spriteService.populateSeaweeds(7);
    this._spriteService.populateRocks(9);
    this._mapService.init(two);
    

    //loop through service
    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      let sprite=this._spriteService.sprites[i];
      this._spriteService.sprites[i].spriteReference=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
      this._spriteService.sprites[i].spriteReference.scale=this._spriteService.sprites[i].scale;
    }

    this._gameService.stateObservable.subscribe((value)=>{
      this.gameState = value;
      switch(value) {
        case 'opening':
          this._gameService.displayTitle(two)
          break;
        case 'playing':
          this._gameService.hideTitle()
          this._gameService.initScore(two)
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
    }).play();
  }

  opening(two:any) {
    //this._gameService.displayTitle(two)
    this._gameService.animateTitle()
  }

  playing(two: any, auto = false) {
     // this is where animatoin happens
     if (!auto) {
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
     
    
    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      if (i>0 || auto) {
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
        if (!auto) this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
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
    if (!auto) this._gameService.displayScore(two, this.x, this.y, numberOfWilliams); 
  }

  title = 'BabyShark';

}
