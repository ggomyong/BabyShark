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

    let startTime = Date.now();
    //initialization
    let circle=two.makeCircle (x, y, 150);
    let square = two.makeRectangle (x,y, 200, 200);
    let ellipse = two.makeEllipse(250, 250, 40, 20);
    let star = two.makeStar(500, 250, 40, 120, 0);
    let star1 = two.makeStar(800, 250, 40, 120, 0);
    square.rotation = 3.14;
    star.fill='gold';
    star1.fill = 'silver';

    two.bind('update', (framesPerSecond)=>{
      // this is where animatoin happens
      circle.translation.set(x--, y);
      circle.rotation = (Date.now()-startTime)%Math.PI;
      star.rotation = (Date.now()-startTime)%Math.PI;
      star1.rotation = ((Date.now()-startTime)/500)%Math.PI;
      square.rotation= (Date.now()-startTime)%Math.PI;
    }).play();
  }

  title = 'BabyShark';

}
