import { Component, OnInit } from '@angular/core';
import {BackordersDataService} from "../backorders-data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-backorders',
  templateUrl: './backorders.component.html',
  styleUrls: ['./backorders.component.css']
})
export class BackordersComponent implements OnInit {

  groupby: string = 'product';

  constructor(private data: BackordersDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.data.load();
    this.route.queryParams.subscribe((params:Params)=>{
      this.data.customerType=params['customer'] || null;
      this.data.warehouse=params['warehouse'] || 'FR';
      this.data.displayCategory=params['category'] || 'main';
    });
  }

}
