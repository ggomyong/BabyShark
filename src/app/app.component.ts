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
    let x = 100;

    //initialization
    let circle=two.makeCircle (x, 200, 150);

    two.bind('update', (framesPerSecond)=>{
      // this is where animatoin happens
      circle.translation.set(x++, 200);
      
    }).play();
  }

  title = 'BabyShark';

}
