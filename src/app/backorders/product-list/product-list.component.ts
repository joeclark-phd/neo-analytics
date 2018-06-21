import { Component, OnInit } from '@angular/core';
import {BackordersDataService} from "../backorders-data.service";

@Component({
  selector: 'app-productlist',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private data:BackordersDataService) { }

  ngOnInit() {
  }

}
