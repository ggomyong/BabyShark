import { Injectable } from '@angular/core';
import { Sprite, SpriteService } from './sprite.service';
import Two from '../../assets/two.min.js';
import { BehaviorSubject } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

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

  //title
  private _title: any
  private _subtitle: any
  private _increment: number =.2;

  private _gameover: any
  private _gameover2: any

  private _gameClear: any;
  private _gameClear2: any;

  private _state = new BehaviorSubject<string>('opening')
  public stateObservable = this._state.asObservable()

  private _stage = new BehaviorSubject<number>(0);
  public stageObservable = this._stage.asObservable();

  get state() {
    return this._state.getValue()
  }
  set state(value) {
    this._state.next(value)
  }

  get stage() {
    return this._stage.getValue();
  }

  set stage(value) {
    this._stage.next(value);
  }

  initScore(two: any) {
    this._william = two.makeSprite(this._spriteService.william.url,this._defaultX, this._defaultY, this._spriteService.william.columns, this._spriteService.william.rows, this._spriteService.william.fps);
    this._william.scale = .3;
    this._william.play(0, 0)
    this._score = new Two.Text('X '+this.numberOfWilliams, this._defaultX+this._scoreXOffset, this._defaultY+this._scoreYOffset, 'normal')
    this._score.fill = '#ddddFF';
    this._score.stroke ='#FFFFFF';
    this._score.scale=1.75;
    two.add(this._score);
  }

  hideScore() {
    if (this._william) this._william.scale=0
    if (this._score) this._score.scale =0
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

  displayTitle(two: any) {
    this._title = new Two.Text('Baby Shark', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal')
    this._title.fill = 'yellow'
    this._title.stroke = 'orange'
    this._title.scale = 11
    two.add(this._title);
    this._subtitle = new Two.Text('Click anywhere to begin', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal')
    this._subtitle.fill='orange'
    this._subtitle.stroke ='yellow'
    this._subtitle.scale = 5
    two.add(this._subtitle)
  }

  hideTitle() {
    this._title.scale =0
    this._subtitle.scale =0
    if (this._gameover) this._gameover.scale = 0
    if (this._gameover2) this._gameover2.scale = 0
    if (this._gameClear) this._gameClear.scale =0
    if (this._gameClear2) this._gameClear2.scale= 0
    if (this._william) this._william.scale =0
    if (this._score) this._score.scale = 0
  }

  animateTitle(){
    if (this._title.scale>12) {
      this._increment=-.02
    }
    else if (this._title.scale<10) {
      this._increment=.02
    }
    this._title.scale=this._title.scale+this._increment
    this._subtitle.scale= this._subtitle.scale+this._increment
  }

  displayGameOver(two: any) {
    this._gameover = new Two.Text('Game Over', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal')
    this._gameover.fill = 'yellow'
    this._gameover.stroke = 'orange'
    this._gameover.scale = 11
    two.add(this._gameover);
    this._gameover2 = new Two.Text('Click anywhere to restart', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal')
    this._gameover2.fill='orange'
    this._gameover2.stroke ='yellow'
    this._gameover2.scale = 5
    two.add(this._gameover2)
  }

  displayGameClear(two: any, stage:number, maxStage:number) {
    this._gameClear = new Two.Text('Game Clear', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal')
    this._gameClear.fill = 'yellow'
    this._gameClear.stroke = 'orange'
    this._gameClear.scale = 11
    two.add(this._gameClear);
    let textToSay='';
    if (stage+1<=maxStage) {
      textToSay = 'Click anywhere to advance to Stage '+(stage+1);
    }
    else {
      textToSay= 'Click anywhere to restart'
    }

    this._gameClear2 = new Two.Text(textToSay, window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal')
    this._gameClear2.fill='orange'
    this._gameClear2.stroke ='yellow'
    this._gameClear2.scale = 5
    two.add(this._gameClear2)
  }
}
