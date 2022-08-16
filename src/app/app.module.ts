import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './features/users/users/users.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/loginComponent/login.component';
import { TestComponent } from './features/test/testComponent/test.component';
import { CoreModule } from './core/core.module';
import { LoginService } from './features/login/login.service';

@NgModule({
  declarations: [AppComponent, TestComponent, TopBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
