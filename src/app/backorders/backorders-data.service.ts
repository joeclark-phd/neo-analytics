import { Injectable } from '@angular/core';
import { Order } from "./order";
import {DataSourceService} from "../services/data-source.service";


const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

const arraysum = function(items, prop){
  return items.reduce( function(a, b){
    return a + b[prop];
  }, 0);
};

@Injectable({
  providedIn: 'root'
})
export class BackordersDataService {

  orders: Order[] = [];
  displayCategory: string = 'main';
  customerType: string = null;
  warehouse: string = 'FR';
  productsort: string = 'sku';
  productsort_ascending: boolean = true;
  customersort: string = 'amount';
  customersort_ascending: boolean = false;
  ordersort: string = 'planned_date';
  ordersort_ascending: boolean = true;

  constructor( private datasource: DataSourceService ) { }

  load(): void {
    this.datasource.getBackorders().subscribe(ords => {ords.backorders.forEach(b=>{
      this.orders.push(b);
    });});
  }

  setDisplayCategory(cat: string) {
    if (cat) { this.displayCategory=cat; }
    else { this.displayCategory='main'; }
  }

  get filteredOrders(): Order[] {
    return this.orders.filter(o => this.displayCategory == 'all' || o.category == this.displayCategory).filter(o => this.customerType == null || o.wholesale && this.customerType == 'wholesale' || !o.wholesale && this.customerType == 'retail').filter(o => o.warehouse == this.warehouse);
  }

  get productGroups(): any {

    let ct = this.customerType;
    let gs = this.productsort;
    let gsa = this.productsort_ascending;
    let os = this.ordersort;
    let osa = this.ordersort_ascending;
    let rawcategorygroups = groupBy(this.filteredOrders,'category');
    let categories = [];
    Object.keys(rawcategorygroups).forEach((key,index)=>{
      let products = [];
      let rawproducts = groupBy(rawcategorygroups[key],'sku');
      Object.keys(rawproducts).forEach((k,i)=> {
        let orders = rawproducts[k].sort(function (a, b) {
          return (a[os] < b[os]) ? -1 : (a[os] > b[os]) ? 1 : 0;
        });
        products.push({
          sku: k,
          quantity: arraysum(rawproducts[k], 'quantity'),
          amount: arraysum(rawproducts[k], 'amount'),
          oldest: new Date(Math.min.apply(null, rawproducts[k].map(o => new Date(o.planned_date)))),
          orders: osa ? orders : orders.reverse()
        });
      });
      products.sort(function (a, b) {
        return (a[gs] < b[gs]) ? -1 : (a[gs] > b[gs]) ? 1 : 0;
      });
      categories.push({
        category: key,
        customerType: ct,
        products: gsa ? products : products.reverse()
      });
    });

    return categories;
  }

  get customerGroups(): any {
    let gs = this.customersort;
    let gsa = this.customersort_ascending;
    let os = this.ordersort;
    let osa = this.ordersort_ascending;
    let rawgroups = groupBy(this.filteredOrders,'customer');
    let customergroups = [];
    Object.keys(rawgroups).forEach((key,index)=>{
      //console.log(key);
      customergroups.push({
        'customer':key,
        'quantity':arraysum(rawgroups[key],'quantity'),
        'amount':arraysum(rawgroups[key],'amount'),
        'oldest': new Date(Math.min.apply(null,rawgroups[key].map(o => new Date(o.planned_date)))),
        'orders':rawgroups[key].sort(function (a,b) {
          return(a[os]<b[os]) ? -1 : (a[os]>b[os]) ? 1 : 0;
        })
      });
    });
    customergroups.sort(function (a,b) {
      return(a[gs]<b[gs]) ? -1 : (a[gs]>b[gs]) ? 1 : 0;
    });
    return gsa ? customergroups : customergroups.reverse();
  }

}
