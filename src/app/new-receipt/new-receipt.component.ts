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
  paginationItems: Item[];
  paginationNumbers: number[];
  currentPage: number;
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
      this.pagination(0);
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

  pagination(pageNumber: number) {
    this.currentPage = pageNumber + 1;
    this.paginationItems = this.items.slice(
      this.currentPage === 1 ? 0 : (this.currentPage - 1) * 12,
      this.currentPage * 12
    );
    this.paginationNumbers = Array(Math.ceil(this.items.length / 12))
      .fill(1)
      .map((x, i) => i + 1);
    console.log(Math.ceil(this.items.length / 12));
  }

  ngOnInit(): void {
    this.dataService.category.subscribe((data) => {
      this.categorySelected = data;
      if (this.categorySelected === false) this.items = [];
    });
  }
}
