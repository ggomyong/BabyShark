import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service.js';
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
  
  x: number=0;
  y: number=0;

  max_x: number= 3500;
  max_y: number= 2500;

  constructor(private _spriteService: SpriteService, 
    private _cameraService: CameraService, 
    private _aiService: AiService, 
    private _mapService: MapService,
    private _collisionService: CollisionService,
    private _gameService: GameService) {}

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

    this._spriteService.populateWilliam(15);
    this._spriteService.populateEngelfish(1);
    this._spriteService.populateSeaweeds(7);
    this._spriteService.populateRocks(9);
    this._mapService.init(two);
    this._gameService.init(two);

    //loop through service
    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      let sprite=this._spriteService.sprites[i];
      this._spriteService.sprites[i].sprite=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].sprite.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
      this._spriteService.sprites[i].sprite.scale=this._spriteService.sprites[i].scale;
    }
    //rectangle.scale=.7;
    two.bind('update', (framesPerSecond)=>{
      // this is where animatoin happens
      if (!this._collisionService.detectBorder(this._spriteService.sprites[0],this._spriteService.sprites[0].x,this._spriteService.sprites[0].y, this.x, this.y)) {
        this._spriteService.sprites[0].sprite.translation.x=this.x;
        this._spriteService.sprites[0].x= this.x;
        this._spriteService.sprites[0].sprite.translation.y=this.y;
        this._spriteService.sprites[0].y= this.y;
        this._cameraService.zoomCamera(this.x, this.y);
      }
      else {
        this.x = this._spriteService.sprites[0].x
        this.y = this._spriteService.sprites[0].y
      }
      
      for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
        if (i>0) {
          if (!this._spriteService.sprites[i]) continue
          let oldX = this._spriteService.sprites[i].x
          let oldY = this._spriteService.sprites[i].y
          this._spriteService.sprites[i]=this._aiService.basicAI(this._spriteService.sprites[i]);
          if (!this._collisionService.detectBorder(this._spriteService.sprites[i], oldX, oldY, this._spriteService.sprites[i].x, this._spriteService.sprites[i].y)) {
            this._spriteService.sprites[i].sprite.translation.x = this._spriteService.sprites[i].x;
            this._spriteService.sprites[i].sprite.translation.y = this._spriteService.sprites[i].y;
            this._spriteService.sprites[i].sprite.scale = this._spriteService.sprites[i].scale;
          }
          else {
            this._spriteService.sprites[i].x=oldX
            this._spriteService.sprites[i].y=oldY
          }
          this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
        }
        if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
          this._spriteService.sprites[i].lastDirection=this._spriteService.sprites[i].direction;
          if (this._spriteService.sprites[i].direction=='right') {
            this._spriteService.sprites[i].sprite.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1])
          }
          else {
            this._spriteService.sprites[i].sprite.play(this._spriteService.sprites[i].leftFrames[0], this._spriteService.sprites[i].leftFrames[1])
          }
        }
      }
      let numberOfWilliams = 0
      for (let sprite of this._spriteService.sprites) {
        if (sprite.type=='prey' && sprite.sprite.scale>0) {
          numberOfWilliams++
        }
      }
      this._gameService.displayScore(two, this.x, this.y, numberOfWilliams); 
    }).play();
  }

  title = 'BabyShark';

}
