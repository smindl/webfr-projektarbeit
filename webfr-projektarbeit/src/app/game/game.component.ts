import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  
  imageArray : number[];
  selectedImages : number[];
  minutes : string;
  seconds : string;
  timerInterval : any;

  constructor() {
    this.imageArray = this.shufflePuzzleParts();
    this.selectedImages = [-1, -1];
  }

  ngOnInit(): void {
    this.placeImages();
    this.timer();
  }

  shufflePuzzleParts() : number[] {
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

  placeImages() : void {
    const puzzle = document.getElementById("puzzle");
    
    if (puzzle?.firstChild){
      puzzle.removeChild(puzzle.firstChild);
    }

    const ul = document.createElement("ul");
    ul.setAttribute("class", "mdc-image-list puzzle-grid");
    puzzle!.appendChild(ul);

    for (let i = 0; i < 9; i++){
      const li = document.createElement("li");
      li.setAttribute("class", "mdc-image-list__item");
      const div = document.createElement("div");
      div.setAttribute("class", "mdc-image-list__image-aspect-container");
      const imgSrc = "assets/puzzle1_imgs/img" + this.imageArray[i] + ".jpg";
      const img = document.createElement("img");
      img.setAttribute("class", "mdc-image-list__image");
      img.setAttribute("src", imgSrc);
      img.setAttribute("id", String(this.imageArray[i]));
      img.setAttribute("pos", String(i));
      var that = this; //ugly as hell
      img.addEventListener("click", function() {
        img.setAttribute("style", "border-style:solid;");
        that.select(i);
      });
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

  select(i: number) : void  {
    if (this.selectedImages[0] == -1)
      this.selectedImages[0] = i;
    else if (this.selectedImages[1] == -1){
      this.selectedImages[1] = i;
      this.swapPictures();
    }
  }

  swapPictures() : void {
    let tmp = this.imageArray[this.selectedImages[0]];
    this.imageArray[this.selectedImages[0]] = this.imageArray[this.selectedImages[1]];
    this.imageArray[this.selectedImages[1]] = tmp;
    this.selectedImages[0] = this.selectedImages[1] = -1;
    this.placeImages();
    this.checkWin();
  }

  checkWin() : void {
    for (let i = 0; i < 9; i++) {
      if (this.imageArray[i] != i+1)
        return;
    }
    clearInterval(this.timerInterval);
    setTimeout(function () {
      alert('win');
    }, 500);
  }

  timer() : void {
    let timerText = document.getElementById("timer");
    let minutes = 0;
    let seconds = 0;
    this.timerInterval = setInterval(() => {
      if (seconds == 59) {
        minutes += 1;
        seconds = 0;
      } else {
        seconds += 1;
      }
      this.minutes = ("0" + minutes).slice(-2);
      this.seconds = ("0" + seconds).slice(-2);
      timerText!.textContent = this.minutes + ":" + this.seconds;
    }, 1000)
  }

}
