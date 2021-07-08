import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;

  visability = sessionStorage.getItem('login')

  constructor() { }

  logout() : void {
    sessionStorage.clear();
  }
  
  ngOnInit(): void {
    document.getElementById("logout")?.addEventListener("click", this.logout);  
  }

}
