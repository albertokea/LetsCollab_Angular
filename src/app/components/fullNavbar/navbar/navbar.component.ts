import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faPowerOff = faPowerOff;

  user: User;

  constructor(private usersService: UsersService) {
  }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id);
  }

  onShutDown() {
    localStorage.removeItem('token_auth')
  }
}
