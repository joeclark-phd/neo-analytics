import { Component, OnInit, Input } from '@angular/core';
import { Order } from "../order";

@Component({
  selector: '[app-product-row]',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {

  @Input() product: any;
  @Input() rownum: number;

  constructor() { }

  ngOnInit() { }

}
