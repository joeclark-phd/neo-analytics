import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { BackordersComponent } from './backorders/backorders/backorders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DataSourceService } from "./services/data-source.service";

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './backorders/product-list/product-list.component';
import { CustomerListComponent } from './backorders/customer-list/customer-list.component';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'backorders', component: BackordersComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'customers', component: CustomerListComponent }
    ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    BackordersComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    ProductListComponent,
    CustomerListComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [DataSourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
