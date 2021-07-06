import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    

  }
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  pw = new FormControl('', [Validators.required]);


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagepw() {
    if (this.pw.hasError('required')) {
      return 'You must enter a password';
    }
    else{
      return
    }
  }

  onSubmit(){  
   
    let user = {
      email : this.email.value,
      password : this.pw.value
    }

    this.http.post<{ confirm: boolean}>("http://localhost:3000/login",user, this.httpOptions).subscribe({
      next: (responseData) => {
  
        console.log(responseData.confirm)
        //response Data.confirm is true upon successfull login, false otherwise
        //code after successfull login is still missing

        if(responseData.confirm) {
          alert("Login successfull!")
        }
        else {
          alert("Email or password incorrect")
        }

      },
      error: (err) => {
        // do something with the error
      },
    });

  }

}
