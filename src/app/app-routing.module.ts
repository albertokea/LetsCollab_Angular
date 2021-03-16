import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './components/cover/cover.component';
import { HomeComponent } from './components/home/home.component';
import { LetscollabComponent } from './components/letscollab/letscollab.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: CoverComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }]
  },
  { path: 'home', component: HomeComponent },
  { path: 'collab', component: LetscollabComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
