import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let elem = document.getElementById('draw-shapes');
    let params = {fullscreen: true,
      autostart: true};
    let two = new Two(params).appendTo(elem);
    console.log('hi');
    var star = two.makeRectangle(two.width / 2, two.height / 2, 250, 200);
    var texture = new Two.Texture('https://i.imgur.com/DRmh6S9.jpg')
    
    // Textures fill as patterns on any Two.Path
    star.fill = texture;
    texture.scale = 0.125;
    
    // It automatically inherits the dimensions of the texture.
    
    var columns = 10;
    var rows = 1;
    var frameRate = 15;
    
    // It also has an API to define a sprite sheet
    var sheet = two.makeSprite('https://storage.googleapis.com/archive.jono.fyi/projects/two-js/junk/images/ken-sprite.png', two.width * 0.5, two.height * 0.75, columns, rows, frameRate);
    
    // Which does the math to single out the dimensions of a cell and can then animate
    sheet.play();
    
    var mouse = new Two.Vector();
    
    window.addEventListener('mousemove', function(e) {
      mouse.set(e.clientX, e.clientY);
    });
    
    two.bind('update', function(frameCount) {
      console.log('hi');
      // Sprites are Rectangles underneath so they have the same properties as Two.Path's
      sheet.translation.x = mouse.x || two.width * 0.5;
    
    });
        
  }

  title = 'BabyShark';

}
