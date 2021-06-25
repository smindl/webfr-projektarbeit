import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FaqComponent } from './faq/faq.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "sign-up", component: SignUpComponent},
  {path: "faq", component: FaqComponent},
  {path: "highscore", component: HighscoreComponent},
  {path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
