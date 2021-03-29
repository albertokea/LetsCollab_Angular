import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  faUpload = faUpload;
  images = []
  constructor() {
    this.images = ["http://localhost:3000/images/profile_pictures/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png", "../../../assets/images/default-user-image.png"]
  }

  ngOnInit(): void {
  }

}
