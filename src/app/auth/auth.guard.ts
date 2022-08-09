import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { AuthDataService } from './auth-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthDataService,
    private router: Router,
    private dataService: DataServiceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userCurrentStatus = Object.assign({}, this.dataService.userLoggedIn);
    let isLoggedIn = this.authService.isAuthenticated();

    if (
      new Date().getTime() - userCurrentStatus.time >
      +userCurrentStatus.expiresIn * 1000
    ) {
      this.authService.isAuth = false;
      isLoggedIn = false;
      window.localStorage.removeItem('user');
    }

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
