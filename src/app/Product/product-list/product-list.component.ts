import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Product } from 'src/app/shared/Models/product.model';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(AgGridAngular)grid:AgGridAngular ;

  rowData:Product[]=[]
  colDefs:ColDef[]=[
    {field : "name" , sortable : true , filter: true },
    {field:"description"},
    {field: "category" , sortable : true, filter: true},
    {field : "availableQuantity", sortable : true,filter: true},
    {field: "price", sortable : true ,  filter: true },
    {field : "image" ,
     autoHeight : true,
     cellRenderer : (params : ICellRendererParams)=>{
        return `<img class="img-fluid" src= ${params.value} />`
    }
  }
  ]

  constructor(private productService:ProductsServiceService, private router:Router) {
    this.rowData=this.productService.getProducts();
   }

  ngOnInit(): void {
    this.productService.productListChanged.subscribe((list)=>{
      this.rowData=list;
    })
  }

  EditProduct(){
    this.productService.productSelected.next(this.grid.api.getSelectedRows()[0]);
    this.router.navigateByUrl("/product/add");
  }

  refresh(){
    console.log(this.rowData)
    this.grid.api.setRowData(this.rowData);
  }


}
