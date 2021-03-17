import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './components/fullCover/cover/cover.component';
import { HomeComponent } from './components/home/home.component';
import { LetscollabComponent } from './components/letscollab/letscollab.component';
import { LoginComponent } from './components/fullCover/login/login.component';
import { RegisterComponent } from './components/fullCover/register/register.component';
import { UserComponent } from './components/fullUser/user/user.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', component: CoverComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'collab', component: LetscollabComponent },
  { path: 'collab/new', component: PostFormComponent },
  { path: 'user', component: UserComponent },
  { path: 'messages', component: MessagesComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
