import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : string[]

  constructor(private productService:ProductsServiceService) { 
    this.productService.getCategories().subscribe(
      categories=>this.categories=categories
    );
  }

  ngOnInit(): void {
  }

}
