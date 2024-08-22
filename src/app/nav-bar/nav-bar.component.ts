import { Component, OnInit } from '@angular/core';

/**
 * Represents the navigation bar component.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  /**
   * The menu items for the navigation bar.
   */
  menuItems = [
    {
      name: 'Home',
    },
    {
      name: 'Gallery',
    },
    {
      name: 'About Us',
    },
    {
      name: 'Contact Us',
    },
  ];

  constructor() {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {}
}
