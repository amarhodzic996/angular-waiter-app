import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timestamp, VirtualTimeScheduler } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { AuthDataService } from './auth-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private authDataService: AuthDataService,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  onSubmit(data: NgForm) {
    this.authDataService
      .logIn(data.value.email, data.value.password)
      .subscribe((data) => {
        this.dataService.user.next(data);
        this.dataService.userLoggedIn = data;
        this.authDataService.isAuth = true;
        window.localStorage.setItem(
          'user',
          JSON.stringify({
            ...data,
            time: new Date().getTime(),
          })
        );
        this.router.navigate(['/newreceipt']);
      });
  }

  checkSession() {
    const userLoggedIn = window.localStorage.getItem('user');
    if (typeof userLoggedIn === 'string') {
      setTimeout(() => {
        this.dataService.userLoggedIn = JSON.parse(userLoggedIn);
        this.dataService.user.next(JSON.parse(userLoggedIn));
        this.authDataService.isAuth = true;
        this.router.navigate(['/newreceipt']);
      });
    } else {
      this.authDataService.isAuth = false;
    }
  }

  ngOnInit(): void {
    this.checkSession();
  }
}
