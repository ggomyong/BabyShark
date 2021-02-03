
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
    let params = {fullscreen: true};
    let two = new Two(params).appendTo(elem);

    let rectangle = two.makeRectangle(100, 100, 500, 300);
    rectangle.fill = '#6598A2';
    let circle = two.makeCircle(500, 300, 100);
    circle.fill = `red`;
    circle.stroke = 'blue';
    circle.linewidth = 10 ;
    circle.opacity = 2;
    two.update();
  }

  title = 'BabyShark';

}
