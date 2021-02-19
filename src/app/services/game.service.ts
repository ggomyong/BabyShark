import { Injectable } from '@angular/core';
import { Sprite, SpriteService } from './sprite.service';
import Two from '../../assets/two.min.js';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _spriteService: SpriteService) { }
  private _william: any;
  private _score: any
  private _defaultX: number = 1400
  private _defaultY: number = 20
  private _maxY: number = 330
  private _maxX: number = 3400

  private _scoreXOffset = 60
  private _scoreYOffset = 5

  public numberOfWilliams: 15

  init(two: any) {
    this._william = two.makeSprite(this._spriteService.william.url,this._defaultX, this._defaultY, this._spriteService.william.columns, this._spriteService.william.rows, this._spriteService.william.fps);
    this._william.scale = .3;
    this._william.play(0, 0)
    this._score = new Two.Text('X '+this.numberOfWilliams, this._defaultX+this._scoreXOffset, this._defaultY+this._scoreYOffset, 'normal')
    this._score.fill = '#ddddFF';
    this._score.stroke ='#FFFFFF';
    this._score.scale=1.75;
    two.add(this._score);
  }

  displayScore(two: any, x: number, y: number, num: number) {
    //calculate the top-right corner
    y=y-285
    if (y<this._defaultY) y=this._defaultY
    if (y>this._maxY) y = this._maxY
    x=x+680
    if (x<this._defaultX) x =this._defaultX
    if (x>this._maxX) x = this._maxX
    
    this._william.translation.x=x
    this._william.translation.y=y
    this._score.translation.x = x+this._scoreXOffset
    this._score.translation.y = y+this._scoreYOffset
    this._score.value = 'X '+num
  }
}
