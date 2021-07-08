import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {

  imageArray: number[];
  selectedImages: number[];
  minutes: string;
  seconds: string;
  timerInterval: any;
  chosenPuzzle: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.selectedImages = [-1, -1];
  }

  ngOnInit(): void {
    this.choosePuzzle();
  }

  // create menu for puzzle choice
  choosePuzzle(): void {
    let that = this; // make 'this' available in onclick functions

    let puzzle1 = document.getElementById('puzzle1');
    puzzle1?.addEventListener('click', function () {
      that.chosenPuzzle = 'puzzle1';
      that.startPuzzle();
    });
    
    let img1 = document.createElement('img');
    img1.setAttribute('id', 'img1');
    img1.setAttribute('src', 'assets/img/puzzle1.png');
    puzzle1?.appendChild(img1);

    let puzzle2 = document.getElementById('puzzle2');
    puzzle2?.addEventListener('click', function () {
      that.chosenPuzzle = 'puzzle2';
      that.startPuzzle();
    });

    let img2 = document.createElement('img');
    img2.setAttribute('id', 'img2');
    img2.setAttribute('src', 'assets/img/puzzle2.png');
    puzzle2?.appendChild(img2);
  }

  startPuzzle(): void {
    document.getElementById("choosePuzzle")!.remove();
    this.imageArray = this.shufflePuzzleParts();
    this.placeImages();
    this.timer();
    this.checkWin(); // detect random win
  }

  // given function
  shufflePuzzleParts(): number[] {
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

  // this function is called throughout the entire game
  placeImages(): void {
    const puzzle = document.getElementById('puzzle');

    // overwrite current puzzle pictures
    if (puzzle?.firstChild) {
      puzzle.removeChild(puzzle.firstChild);
    }

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'mdc-image-list puzzle-grid');
    puzzle!.appendChild(ul);

    for (let i = 0; i < this.imageArray.length; i++) {
      const li = document.createElement('li');
      li.setAttribute('class', 'mdc-image-list__item');
      const div = document.createElement('div');
      div.setAttribute('class', 'mdc-image-list__image-aspect-container');
      const imgSrc =
        'assets/' +
        this.chosenPuzzle +
        '_imgs/img' +
        this.imageArray[i] +
        '.jpg';
      const img = document.createElement('img');
      img.setAttribute('class', 'mdc-image-list__image');
      img.setAttribute('src', imgSrc);
      img.setAttribute('id', String(this.imageArray[i]));
      img.setAttribute('pos', String(i));
      let that = this; 
      img.addEventListener('click', function () {
        img.setAttribute('style', 'border-style:solid;');
        that.select(i);
      });
      div.appendChild(img);
      li.appendChild(div);
      ul.appendChild(li);
    }
  }

  // save selected pictures in array to swap
  select(i: number): void {
    if (this.selectedImages[0] == -1) this.selectedImages[0] = i;
    else if (this.selectedImages[1] == -1) {
      this.selectedImages[1] = i;
      this.swapPictures();
    }
  }

  // swap selected pictures and reset selectedImages array
  swapPictures(): void {
    let tmp = this.imageArray[this.selectedImages[0]];
    this.imageArray[this.selectedImages[0]] =
      this.imageArray[this.selectedImages[1]];
    this.imageArray[this.selectedImages[1]] = tmp;
    this.selectedImages[0] = this.selectedImages[1] = -1;
    this.placeImages();
    this.checkWin();
  }

  // checks if image id's and locations match
  checkWin(): void {
    for (let i = 0; i < this.imageArray.length; i++) {
      if (this.imageArray[i] != i + 1) return;
    }

    var self = this;

    clearInterval(this.timerInterval);
    setTimeout(function () {
      if (sessionStorage.getItem("login") == "true") {
        let data = {
          username: sessionStorage.getItem("username"),
          seconds: self.seconds,
          mins: self.minutes,
        };

        self.http
          .post<{ message: String }>(
            'http://localhost:3000/updatehighscore',
            data,
            self.httpOptions
          )
          .subscribe({
            next: (responseData) => {
              alert(responseData.message);
            },
            error: (err) => {
              // do something with the error
            },
          });
      }
      else {
        alert('YOU WIN');
      }
    }, 500);
  }

  // timer is invoked every second and updates time on html page
  timer(): void {
    clearInterval(this.timerInterval);
    let timerText = document.getElementById('timer');
    let minutes = 0;
    let seconds = 0;
    timerText!.textContent = '00:00';
    this.timerInterval = setInterval(() => {
      if (seconds == 59) {
        minutes += 1;
        seconds = 0;
      } else {
        seconds += 1;
      }
      this.minutes = ('0' + minutes).slice(-2);
      this.seconds = ('0' + seconds).slice(-2);

      timerText!.textContent = this.minutes + ':' + this.seconds;
    }, 1000);
  }
}
