import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'community-user-card',
  templateUrl: './community-user-card.component.html',
  styleUrls: ['./community-user-card.component.css']
})
export class CommunityUserCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
