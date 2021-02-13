import { Injectable } from '@angular/core';
import { Sprite } from './sprite.service';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  constructor() { }

  detectCollision(mySprite: Sprite, targetSprite: Sprite) {
    const OFFSET = 2;

    let width=mySprite.sprite.width;
    let height = mySprite.sprite.height;
    
    let leftBound = mySprite.x-(width/OFFSET);
    let rightBound = mySprite.x+(width/OFFSET);
    let upperBound = mySprite.y-(height/OFFSET);
    let lowerBound = mySprite.y+(height/OFFSET);
    width = targetSprite.sprite.width;
    height = targetSprite.sprite.height;

    let targetLeftBound = targetSprite.x-(width/OFFSET);
    let targetRightBound = targetSprite.x+(width/OFFSET);
    let targetUpperBound = targetSprite.y-(height/OFFSET);
    let targetLowerBound = targetSprite.y+(height/OFFSET);

    if ((leftBound<targetLeftBound && targetLeftBound<rightBound) 
    || (leftBound<targetRightBound && targetRightBound<rightBound)) {
      //console.log('horizontal check!')
      if ((upperBound<targetUpperBound && targetUpperBound<lowerBound) 
      || (upperBound<targetLowerBound && targetLowerBound<lowerBound)) {
        targetSprite.scale=0;
      }
    }
  }
}
