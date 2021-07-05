import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MatTable } from '@angular/material/table';

export interface ScoreElement {
  username: string;
  position: number;
  score: number;
}

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.sass']
})
export class HighscoreComponent implements OnInit {

  displayedColumns: string[] = ['position', 'username', 'score'];
  src : ScoreElement[] = [];
  testdata: string = "";

  @ViewChild(MatTable) table : MatTable<ScoreElement>;

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  testdb() : void {
    this.http.post<{ message: string}>("http://localhost:3000/test", this.httpOptions).subscribe({
      next: (responseData) => {
        //this.testdata = responseData.message
      },
      error: (err) => {
      },
    });
  }


  ngOnInit(): void {

    this.http.get<{ data: ScoreElement[]}>("http://localhost:3000/highscore", this.httpOptions).subscribe({
      next: (responseData) => {
        this.src = responseData.data
        this.table.renderRows();
        // do something
      },
      error: (err) => {
        // do something with the error
      },
    });

  }

}
