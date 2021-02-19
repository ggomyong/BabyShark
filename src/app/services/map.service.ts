import { Injectable } from '@angular/core';
import Two from '../../assets/two.min.js';
import { Sprite, SpriteService } from './sprite.service.js';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  MAX_X: number = 3500;
  MAX_Y: number = 1000;

  constructor(private _spriteService: SpriteService) { }

  init(two: any) {
    let sea= two.makeRectangle(0, 0, 7000, 1500);
    sea.fill = 'blue';
    sea.opacity=.65;
    let sand = two.makeRectangle(0, 1100, 7000, 750);
    sand.fill = '#ffb76f';
  }
}
