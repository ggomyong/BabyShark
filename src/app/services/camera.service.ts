import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  diff_x: number = 720;
  diff_y: number = 300;

  constructor() { }

  init(x: number, y: number) {
  }

  zoomCamera(x: number, y: number) {
    let screen_x=x-this.diff_x;
    let screen_y=y-this.diff_y;

    window.scrollTo(screen_x, screen_y);
  }

}
