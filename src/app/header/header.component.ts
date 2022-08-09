import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../auth/auth-data.service';
import { DataServiceService } from '../data-service.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [],
})
export class HeaderComponent implements OnInit {
  user: string;
  constructor(
    public dataService: DataServiceService,
    private authDataService: AuthDataService,
    private router: Router
  ) {}
  changeCategory() {
    this.dataService.category.next(false);
  }

  logOut() {
    this.authDataService.isAuth = false;
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.user = this.dataService.userLoggedIn.displayName;
  }
}
