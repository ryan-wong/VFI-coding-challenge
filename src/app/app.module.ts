import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MentionModule } from 'angular-mentions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';

import { ContentComponent } from './content/content.component';
import { AuthService } from './auth/auth.service';
import { SafeHtmlPipe } from './shared/safehtml.pipe';
import { LogoutComponent } from './auth/logout/logout.component';
import { ResetComponent } from './auth/reset/reset.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HighlighttextDirective } from './content/highlighttext.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    LogoutComponent,
    ContentComponent,
    HighlighttextDirective,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    MentionModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
