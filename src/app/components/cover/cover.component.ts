import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  isDisabled: boolean;

  constructor(private router: Router) {

    this.isDisabled = true;
  }

  ngOnInit(): void {
  }

}
