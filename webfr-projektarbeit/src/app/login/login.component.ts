import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor() { }

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
   
    let username ="test@test.at";
    let pword = "12345678";
 

    if(this.email.value  == username && pword == this.pw.value){
      alert("Login erfolgreich!");
      console.log("login successful");
    }
    else{
      alert("Login fehlgeschlagen!");
      console.log("login failed");
    }

  }

}
