import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Item } from '../new-receipt/item-interface';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  @ViewChild('f') addItem: NgForm;
  successfulPost = false;
  postError = false;
  isPosting = false;
  constructor(private dataService: DataServiceService) {}

  onSubmit(form: NgForm) {
    this.isPosting = true;
    this.dataService.postNewItem(form.value).subscribe(
      () => {
        this.successfulPost = true;
        this.isPosting = false;
        setTimeout(() => (this.successfulPost = false), 1500);
      },
      (err) => {
        this.postError = true;
      }
    );
    this.addItem.reset();
  }

  ngOnInit(): void {}
}
