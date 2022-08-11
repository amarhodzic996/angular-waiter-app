import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthDataService } from '../auth/auth-data.service';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  @ViewChild('f') signUp: NgForm;
  successfulPost = false;
  isPosting = false;
  postError = false;
  constructor(private authDataService: AuthDataService) {}
  onSubmit(data: NgForm) {
    this.isPosting = true;
    this.authDataService.addUser(data.value).subscribe({
      next: () => {
        this.successfulPost = true;
        this.isPosting = false;
        setTimeout(() => (this.successfulPost = false), 3000);
      },
      error: (err) => (this.postError = true),
    });
  }
  ngOnInit(): void {}
}
