import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { SpriteService } from './services/sprite.service.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //declarations
  x: number = 200;
  y: number = 200;

  constructor(private _spriteService: SpriteService) {}

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
    this._spriteService.sprites[0].spriteReference = two.makeSprite(this._spriteService.sprites[0].url,
      this._spriteService.sprites[0].x,
      this._spriteService.sprites[0].y, 
      this._spriteService.sprites[0].columns,
      this._spriteService.sprites[0].rows,
      this._spriteService.sprites[0].fps);
  
    this._spriteService.sprites[0].spriteReference.play();

    
    two.bind('update', (frameCount) => {
      //console.log('hi');
      // Sprites are Rectangles underneath so they have the same properties as Two.Path's
      //console.log(this.x)

    });
        
  }

  title = 'BabyShark';

}
