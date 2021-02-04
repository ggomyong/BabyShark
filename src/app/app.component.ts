import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service.js';
import { CameraService } from './services/camera.service.js';
import { CollisionService } from './services/collision.service.js';
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
    private _collisionService: CollisionService) {}

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

    this._spriteService.populateWilliam(10);
    this._spriteService.populateEngelfish(1);
    this._spriteService.populateSeaweeds(7);
    this._mapService.init(two);

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


      if (this.x+70<this.max_x && this.x-70>0) {
        this._spriteService.sprites[0].sprite.translation.x=this.x;
        this._spriteService.sprites[0].x= this.x;
      }
      if (this.y+30<this.max_y && this.y-70>0) {
        this._spriteService.sprites[0].sprite.translation.y=this.y;
        this._spriteService.sprites[0].y= this.y;
      }
      
      this._cameraService.zoomCamera(this.x, this.y);
        for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
          if (i>0) {
            this._spriteService.sprites[i]=this._aiService.basicAI(this._spriteService.sprites[i]);
            this._spriteService.sprites[i].sprite.translation.x = this._spriteService.sprites[i].x;
            this._spriteService.sprites[i].sprite.translation.y = this._spriteService.sprites[i].y;
            this._spriteService.sprites[i].sprite.scale = this._spriteService.sprites[i].scale;
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
        
    }).play();
  }

  title = 'BabyShark';

}
