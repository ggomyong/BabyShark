import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }
  private _isBGMPlaying = false;
  playBackgroundMusic(){
    if (this._isBGMPlaying) return;
    this._isBGMPlaying = true;
    let audio = new Audio();
    audio.src = "../../assets/audio/babyshark.wav";
    audio.load();
    audio.play();
    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
  }
}
