import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {}

  checkoutForm = this.formBuilder.group({
    pw: ['', Validators.required],
    pwwh: ['', Validators.required],
    street: '',
    city: '',
    firma: 'FH Technikum Wien',
    PLZ: ['', Validators.pattern('[0-9]{4}')],
    address: '',
  });

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
      alert('Registrierung erfolgreich!');
    }
   
  }

}
