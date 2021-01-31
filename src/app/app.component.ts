import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { Sprite, SpriteService } from './services/sprite.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  direction:string;
  
  x: number=200;
  y: number=200;

  constructor(private _spriteService: SpriteService) {}

  ngOnInit(): void {
    let elem = document.getElementById('draw-shapes');
    let params = {fullscreen: true};
    let two = new Two(params).appendTo(elem);
    let x = 1000;
    let y= 200;

    //initialization
    let circle=two.makeCircle (x, y, 150);
    let square = two.makeRectangle (x,y, 200, 200);
    let time = 0;
    let scale=0;
    two.bind('update', (framesPerSecond)=>{
      // this is where animatoin happens
      //circle.translation.set(x--, y++);
      time++;
      scale=scale+.1;
      if (scale>5) {
        scale=1;
      }

      circle.scale=scale;
      square.rotation=time%Math.PI*2;
    
    }).play();
  }

  title = 'BabyShark';

}
