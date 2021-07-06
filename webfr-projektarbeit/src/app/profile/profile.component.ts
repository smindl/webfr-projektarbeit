import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


export interface ProfileData {
  email : string,
  username: string,
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
    let user = {username : "test0r"}

    this.http.post<{ data: ProfileData}>("http://localhost:3000/profile",user, this.httpOptions).subscribe({
      next: (responseData) => {
        this.profileData = responseData.data
        console.log(this.profileData)
      },
      error: (err) => {
        // do something with the error
      },
    });
    
  }

}
