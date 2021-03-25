import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './components/fullCover/cover/cover.component';
import { HomeComponent } from './components/home/home.component';
import { LetscollabComponent } from './components/letscollab/letscollab.component';
import { UserComponent } from './components/fullUser/user/user.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PostFormComponent } from './components/posts/post-form/post-form.component';
import { LoginGuard } from './guards/login.guard';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', component: CoverComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'collab', component: LetscollabComponent, canActivate: [LoginGuard] },
  { path: 'collab/new', component: PostFormComponent, canActivate: [LoginGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [LoginGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [LoginGuard] },
  { path: '**', component: Error404Component }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
