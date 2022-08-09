import { Component } from '@angular/core';
import { AuthDataService } from './auth/auth-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Waiter-app';

  constructor(public authService: AuthDataService) {}
}
