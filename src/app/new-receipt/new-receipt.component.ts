import { Component, OnChanges, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Item } from './item-interface';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.css'],
  providers: [],
})
export class NewReceiptComponent implements OnInit {
  items: Item[];
  categorySelected: string | boolean;
  isFetching = false;
  isPosting = false;
  receipt: Item[];
  receiptSum: number;
  receiptAddedMessage = false;

  constructor(private dataService: DataServiceService) {
    this.receipt = this.dataService.receipt;
    this.receiptSum = this.dataService.receiptSumCalculator();
  }

  changeCategory(e: string) {
    this.isFetching = true;
    this.dataService.category.next(e);
    this.dataService.fetchData(e).subscribe((response) => {
      this.items = response;
      this.isFetching = false;
    });
  }

  changeCategoryOnGoBack() {
    this.dataService.category.next(false);
  }

  addItemToReceipt(item: Item) {
    this.dataService.addItemToReceiptList(item);
    this.receiptSum = this.dataService.receiptSumCalculator();
  }

  deleteReceipt() {
    this.dataService.receipt = [];
    this.receipt = this.dataService.receipt;
  }

  saveReceipt() {
    this.isPosting = true;
    this.dataService
      .postNewReceipt(this.receipt, this.receiptSum)
      .subscribe((data) => {
        this.deleteReceipt();
        this.isPosting = false;
        this.receiptAddedMessage = true;
        setTimeout(() => {
          this.receiptAddedMessage = false;
        }, 5000);
      });
  }

  ngOnInit(): void {
    this.dataService.category.subscribe((data) => {
      this.categorySelected = data;
      if (this.categorySelected === false) this.items = [];
    });
  }
}
