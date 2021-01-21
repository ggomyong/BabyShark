import { Injectable } from '@angular/core';
import { CameraService } from './camera.service';
import { MapService } from './map.service';
import { Sprite } from './sprite.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private _max_x = 0;
  private _max_y = 0;

  private _changeDirectionChance=.03;
  private _updateMovementXChance = .5;
  private _updateMovementYChance = .2;

  constructor(private _mapService: MapService) { 
  }

  checkXBounday(sprite: Sprite) {
    if (sprite.direction =='right') {
      if (sprite.x>this._mapService.MAX_X) {
        return false;
      }
    }
    else if (sprite.direction =='left') {
      if (sprite.x<0) {
        return false;
      }
    }
    return true;
  }

  checkYBoundary(sprite: Sprite, direction:string) {
    if (direction=='up') {
      if (sprite.y<=0) {
        return false;
      }
    }
    else {
      if (sprite.y>this._mapService.MAX_Y) {
        return false;
      }
    }
    return true;
  }

  basicAI(sprite: Sprite) {
    // just move around randomly
    // change direction in [changeDirectionChance]
    // when direction is not changed, update x coordinate in [updateMovementXChance]
    // update y coordinate in [updateMovementYChance]
    let chance = Math.random();
    if (chance< this._changeDirectionChance) {
      if (sprite.direction =='right') {
        sprite.direction='left';
      }
      else {
        sprite.direction ='right';
      }
    }
    chance = Math.random();
    if (chance< this._updateMovementXChance) {
      if (sprite.direction =='right') {
        if (this.checkXBounday(sprite)) {
          sprite.x = sprite.x+3;
        } 
      }
      else {
        if (this.checkXBounday(sprite)) {
          sprite.x = sprite.x-3;
        }
        
      }
    }
    chance = Math.random();
    if (chance< this._updateMovementYChance) {
      chance = Math.random();
      if (chance<.5) {
        if (this.checkYBoundary(sprite,'up')) {
          sprite.y=sprite.y-3;
        }
      }
      else {
        if (this.checkYBoundary(sprite,'down')) {
          sprite.y=sprite.y+3;
        }
        
      }
    }
    return sprite;
  }
}
 