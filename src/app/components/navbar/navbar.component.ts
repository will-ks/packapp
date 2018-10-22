import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  handleNavbarToggle() {
    const navbar = document.getElementById('navbarMenu');
    navbar.classList.toggle('is-active');
  }
}
