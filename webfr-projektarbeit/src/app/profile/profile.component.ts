import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


export interface ProfileData {
  email : String,
  username: String,
  highscore : Number,
  company : String,
  street : String,
  city : String,
  postcode : Number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type':'application/json'})
  };

  profileData : ProfileData;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //hard coded username will be replaced by active user when finished
    let user = {username : "test0r1"}

    this.http.post<{ data: ProfileData}>("http://localhost:3000/profile",user, this.httpOptions).subscribe({
      next: (responseData) => {
        this.profileData = responseData.data
      },
      error: (err) => {
        // do something with the error
      },
    });
    
  }

}
