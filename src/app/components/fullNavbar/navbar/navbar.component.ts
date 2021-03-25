import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faPowerOff = faPowerOff;

  user: User;
  id: number
  constructor(
    private usersService: UsersService,
    private router: Router) {
  }

  async ngOnInit() {
    this.id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(this.id);

  }

  onShutDown() {
    localStorage.removeItem('token_auth')
    this.router.navigate(['/'])
  }
}
