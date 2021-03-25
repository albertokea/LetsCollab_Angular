import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverComponent } from './components/fullCover/cover/cover.component';
import { NavbarComponent } from './components/fullNavbar/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarCoverComponent } from './components/fullNavbar/navbar-cover/navbar-cover.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/fullCover/register/register.component';
import { LoginComponent } from './components/fullCover/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LetscollabComponent } from './components/letscollab/letscollab.component';
import { UserComponent } from './components/fullUser/user/user.component';
import { UserEditComponent } from './components/fullUser/user-edit/user-edit.component';
import { CollabPostComponent } from './components/posts/collab-post/collab-post.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PostFormComponent } from './components/posts/post-form/post-form.component';
import { LabComponent } from './components/lab/lab.component';
import { Error404Component } from './components/error404/error404.component';
import { PostMessageComponent } from './components/post-message/post-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    NavbarComponent,
    FooterComponent,
    NavbarCoverComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LetscollabComponent,
    UserComponent,
    UserEditComponent,
    CollabPostComponent,
    MessagesComponent,
    PostFormComponent,
    LabComponent,
    Error404Component,
    PostMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
