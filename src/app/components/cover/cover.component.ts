import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  isDisabled: boolean;
  loginisDisabled: boolean;
  registerisDisabled: boolean;

  constructor(private router: Router) {

    this.isDisabled = false;
  }

  ngOnInit(): void {
  }

  onClick() {
    this.isDisabled = true;
    console.log(this.isDisabled);
  }
}
