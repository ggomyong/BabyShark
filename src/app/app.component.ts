import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  
  x: number = 200;
  y: number = 200;

  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

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
    
    let texture = new Two.Texture('../assets/images/gold.jpg', function () {
      let circle1 = two.makeCircle(400, 400, texture.image.width)
      circle1.fill=texture
      circle1.scale=.2
    })

    // Textures fill as patterns on any Two.Path
    
    //texture.scale = 0.125;
    
    // It also has an API to define a sprite sheet
    let sprite = two.makeSprite('../assets/sprites/Megaman moving.png',this.x, this.y, 3, 1, 10);
    sprite.scale=5;
    // Which does the math to single out the dimensions of a cell and can then animate
    sprite.play();
    
    two.bind('update', function(frameCount) {
      //console.log('hi');
      // Sprites are Rectangles underneath so they have the same properties as Two.Path's
      sprite.translation.x = this.x;
    
    });
        
  }

  title = 'BabyShark';

}
