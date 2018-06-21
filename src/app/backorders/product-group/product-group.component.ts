import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  @Input() group: any;

  show: boolean;

  constructor() { }

  ngOnInit() {
    this.show = true;
  }

  toggle() {
    console.log(this.show);
    this.show = !this.show;
    console.log(this.show);
  }

}
