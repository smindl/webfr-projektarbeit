import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;

  constructor() { }

  logout() : void {
    sessionStorage.clear();
  }
  
  ngOnInit(): void {
    document.getElementById("logout")?.addEventListener("click", this.logout);  
  }

}
