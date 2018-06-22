import { Component, OnInit } from '@angular/core';
import {BackordersDataService} from "../backorders-data.service";

@Component({
  selector: 'app-productlist',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private showproduct;

  constructor(private data:BackordersDataService) { }

  ngOnInit() {
  }

  get productGroups(): any {
    return this.data.productGroups(this.showproduct);
  }

  toggle(product: number) {
    this.showproduct = (product==this.showproduct) ? null : product;
  }

}
