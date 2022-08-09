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
  constructor(private dataService: DataServiceService) {}

  onSubmit(form: NgForm) {
    this.dataService.postNewItem(form.value);
    this.addItem.reset();
  }

  ngOnInit(): void {}
}
