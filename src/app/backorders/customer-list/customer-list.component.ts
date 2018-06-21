import { Component, OnInit } from '@angular/core';
import { BackordersDataService} from "../backorders-data.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private data:BackordersDataService) { }

  ngOnInit() {
  }

}
