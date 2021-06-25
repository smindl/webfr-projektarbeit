import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.sass']
})
export class HighscoreComponent implements OnInit {

  testdata: string = "";
  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<{ message: string}>("http://localhost:3000/test", this.httpOptions).subscribe({
      next: (responseData) => {
        this.testdata = responseData.message
        // do something
      },
      error: (err) => {
        // do something with the error
      },
    });

  }

}
