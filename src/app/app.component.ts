import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //declarations
  x: number = 200;
  y: number = 200;

  constructor() {}

  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key =='ArrowLeft') {
      //left arrow key has been pressed
      this.x=this.x-10;
    }
    else if (event.key =='ArrowRight') {
      //right arrow key has been pressed
      this.x=this.x+10;
    }
    console.log(this.x)
  }
  
  ngOnInit(): void {
    let elem = document.getElementById('draw-shapes');
    let params = {fullscreen: true,
      autostart: true};
    let two = new Two(params).appendTo(elem);
    

    // Textures fill as patterns on any Two.Path
    
    //texture.scale = 0.125;
    
    // It also has an API to define a sprite sheet
    let sprite = two.makeSprite('../assets/sprites/Megaman moving.png',200, 200, 3, 1, 10);
    
    sprite.scale=5;
    // Which does the math to single out the dimensions of a cell and can then animate
    sprite.play();
    console.log(sprite)
    console.log('x: '+this.x)
    
    two.bind('update', (frameCount) => {
      //console.log('hi');
      // Sprites are Rectangles underneath so they have the same properties as Two.Path's
      //console.log(this.x)
      sprite.translation.x = this.x;
    });
        
  }

  title = 'BabyShark';

}
