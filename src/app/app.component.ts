import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  collapsed = true;
  ready = false;

  constructor (private authService: AuthService) {
  }

  ngOnInit () {
    var self = this;
    this.authService.subject.subscribe(() => {
      self.ready = true;
    })
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
