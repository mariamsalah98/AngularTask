import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ProductListComponent } from './Product/product-list/product-list.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge'
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './shopping/categories/categories.component';
import { CategorizedproductsComponent } from './shopping/categorizedproducts/categorizedproducts.component';
import { CartComponent } from './shopping/cart/cart.component';
import { ProductdetailsComponent } from './shopping/productdetails/productdetails.component';
import { ConfirmationDialogueComponent } from './Product/confirmation-dialogue/confirmation-dialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    CategoriesComponent,
    CategorizedproductsComponent,
    CartComponent,
    ProductdetailsComponent ,
    ConfirmationDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule ,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
