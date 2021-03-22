import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profileImg: string;

  constructor(private usersService: UsersService) {
  }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    const user = await this.usersService.getById(id);
    console.log(user);

    user.profile_picture ? this.profileImg = user.profile_picture :
      this.profileImg = 'default-user-image.png'

    console.log(this.profileImg);

  }

}
