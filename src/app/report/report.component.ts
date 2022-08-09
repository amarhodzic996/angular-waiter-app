import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { User } from '../user-interface';
import { Item } from '../new-receipt/item-interface';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  user: User;
  allReceipts: any = [];
  total: number;
  receiptFromReceipts: Item[] = [];
  selected: number;
  receiptSum: number | undefined;
  isFetching = false;
  constructor(private dataService: DataServiceService) {}

  showReceipt(receipt: Item[], i: number) {
    this.receiptSum = receipt[0].receiptSum;
    this.receiptFromReceipts = receipt.slice(1);
    this.selected = i;
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.user = this.dataService.userLoggedIn;
    this.dataService.user.subscribe((data) =>
      this.dataService.getReport(data).subscribe((data) => {
        this.isFetching = false;
        this.allReceipts = data;
        this.total = this.allReceipts.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue[0].receiptSum,
          0
        );
      })
    );
  }
}
