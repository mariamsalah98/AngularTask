import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {StoreModule} from '@ngrx/store'

import { AppComponent } from './app.component';

import { CartReducer } from './shopping/cart/store/cart.reducer';
import { ProductModule } from './Product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({cart : CartReducer}),
    ProductModule  
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
