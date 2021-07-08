import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;

  //visability = sessionStorage.getItem('login')

  constructor() { }

  logout() : void {
    sessionStorage.clear();
  }

  userIsLoggedIn() : boolean {
    //document.getElementById("logout")?.addEventListener("click", this.logout); 
    return sessionStorage.getItem("login") == "true" ? true : false;
  }
  
  ngOnInit(): void {}

}
