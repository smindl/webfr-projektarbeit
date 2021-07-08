import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';


export interface signupResponse {
  username: String,
  status : Boolean,
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  checkoutForm = this.formBuilder.group({
    username : ['', Validators.required],
    pw: ['', Validators.required],
    pwwh: ['', Validators.required],
    street: '',
    city: '',
    firma: 'FH Technikum Wien',
    PLZ: ['', Validators.pattern('[0-9]{4}')],
  });

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type':'application/json'})
  };

  ngOnInit(): void {}

  //Email Validierung
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //für Passwort sichtbarkeit
  hide = true;

  onSubmit() { 

    if (this.checkoutForm.controls['pw'].value !=this.checkoutForm.controls['pwwh'].value) {
      alert('Passwörter sind nicht ident!');
      return;
    }  

    if(this.checkoutForm.valid && this.email.valid){
      let data = {
        email : this.email.value,
        username : this.checkoutForm.controls['username'].value,
        password : this.checkoutForm.controls['pw'].value,
        street : this.checkoutForm.controls['street'].value,
        city : this.checkoutForm.controls['city'].value,
        company : this.checkoutForm.controls['firma'].value,
        postcode : this.checkoutForm.controls['PLZ'].value
      }

      this.http.post<{ answer: signupResponse}>("http://localhost:3000/signup", data, this.httpOptions).subscribe({
        next: (responseData) => {

          console.log(responseData.answer.status)
          console.log(responseData.answer.username)

          if(responseData.answer.status) {
            alert("Sign-up successfull!")
            //store session here
          }
          else {
            alert("Email or username already in use")
          }
        },
        error: (err) => {
          console.log(err)
        },
      });
      
    }
   
  }

}
