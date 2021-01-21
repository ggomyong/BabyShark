import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  MAX_X: number = 3500;
  MAX_Y: number = 1000;

  constructor() { }

  init(two: any) {
    let sea= two.makeRectangle(0, 0, 7500, 1500);
    sea.fill = 'blue';
    sea.opacity=.87;
    let sand = two.makeRectangle(0, 1100, 7500, 750);
    sand.fill = '#00ff00';

  }
}
