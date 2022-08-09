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
  constructor(private authDataService: AuthDataService) {}
  onSubmit(data: NgForm) {
    this.authDataService.addUser(data.value).subscribe((data) => {});
  }
  ngOnInit(): void {}
}
