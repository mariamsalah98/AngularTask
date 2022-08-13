import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, IFiltersToolPanel  , SetFilterModel} from 'ag-grid-community';
import { Product } from 'src/app/shared/Models/product.model';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';
import { ConfirmationDialogueComponent } from '../confirmation-dialogue/confirmation-dialogue.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(AgGridAngular)grid:AgGridAngular ;
  

  rowData:Product[]=[]
  colDefs:ColDef[]=[
    {field : "name" , sortable : true , filter: true  , checkboxSelection: true,},
    {field:"description"},
    {field: "category" , sortable : true,filter :'agSetColumnFilter' ,
    filterParams: {
      buttons: ['reset', 'apply'],
      excelMode: 'windows',
    }},
    {field : "availableQuantity", sortable : true,filter: 'agNumberColumnFilter' },
    {field: "price", sortable : true ,  filter: 'agNumberColumnFilter'  ,
    cellRenderer : params=>{
      return `$${params.value}.00`
    }},
    {field : "image" ,
     autoHeight : true,
     cellRenderer : (params : ICellRendererParams)=>{
        return `<img class="img-fluid" src= ${params.value} />`
    }
  }
  ]
  
  

  constructor(private productService:ProductsServiceService, 
                private router:Router ,public dialog: MatDialog,
              ) {
                this.productService.getProducts().subscribe(data=>this.rowData=data);
              }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>this.rowData=data);
  }

  EditProduct(){
    this.productService.productSelected.next(this.grid.api.getSelectedRows()[0]);
    this.productService.editMode=true ;
    this.router.navigateByUrl("/product/add");
  }

  deleteProduct(){
    let indexes=[] 
    for(let item of this.grid.api.getSelectedRows()){
      indexes.push(item.id)
    }
    const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="ok"){
          this.productService.deleteProducts(indexes);
          this.grid.api.setRowData(this.rowData);  
      }
    });
  }

  }


