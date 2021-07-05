import { Component, OnInit} from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.placeImages();
  }

  shufflePuzzleParts() {
    const puzzleParts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let counter = puzzleParts.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = puzzleParts[counter];
      puzzleParts[counter] = puzzleParts[index];
      puzzleParts[index] = temp;
    }
    return puzzleParts;
  }

  placeImages() {
    let imageArray = this.shufflePuzzleParts();

    const puzzle = document.getElementById("puzzle");
    const ul = document.createElement("ul");
    ul.setAttribute("class", "mdc-image-list puzzle-grid");
    puzzle!.appendChild(ul);

    for (let i = 0; i < 9; i++){
      const li = document.createElement("li");
      li.setAttribute("class", "mdc-image-list__item");
      const div = document.createElement("div");
      div.setAttribute("class", "mdc-image-list__image-aspect-container");
      const imgSrc = "assets/puzzle1_imgs/img" + imageArray[i] + ".jpg";
      const img = document.createElement("img");
      img.setAttribute("class", "mdc-image-list__image");
      img.setAttribute("src", imgSrc);
      img.setAttribute("id", String(i+1));
      img.setAttribute("pos", String(imageArray[i]));
      div.appendChild(img);
      li.appendChild(div);
      ul.appendChild(li);
    }

    /*let html = "<mat-grid-list cols='3' rowHeight='3:1'>";
  
    for (let i = 0; i < 9; i++){
      console.log(i);
      html += "<mat-grid-tile> <img onclick='select("
      + i+1 + ")' pos='" 
      + String(imageArray[i]) + "' id = '"
      + String(i+1) + "' src='assets/puzzle1_imgs/img"
      + String(imageArray[i]) + ".jpg'> </mat-grid-tile>"
    }
    html += "</mat-grid-list>";*/

    //$("#puzzle").html(html);
  }

}
