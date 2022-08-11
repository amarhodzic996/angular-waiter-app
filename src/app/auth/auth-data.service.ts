import { Injectable } from '@angular/core';
import { NewUser } from '../interfaces/new-user-interface';
import { HttpClient } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  isAuth = false;
  constructor(
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}

  isAuthenticated() {
    return this.isAuth;
  }

  logIn(email: string, password: string) {
    this.dataService.user.subscribe(
      (data) => (this.dataService.userLoggedIn = data)
    );

    return this.http.post<User>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAryFOAgxuws5XOV68pthdqWEm7CnMg7k',
      { email: email, password: password, returnSecureToken: true }
    );
  }

  addUser(user: NewUser) {
    let newUserProfile;
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAryFOAgxuws5XOV68pthdqWEm7CnMg7k',
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        take(1),
        exhaustMap((res) => {
          newUserProfile = res.idToken;
          return this.http.post<any>(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAryFOAgxuws5XOV68pthdqWEm7CnMg7k',
            { displayName: user.name, idToken: newUserProfile }
          );
        }),
        map((res) => {
          return res;
        })
      );
  }
}
