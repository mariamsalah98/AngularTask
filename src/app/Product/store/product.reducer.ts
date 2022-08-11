import { Product } from "src/app/shared/Models/product.model";
import { ADDPRODUCT, DELETEPRODUCT, EDITPRODUCT, GETPRODUCTS, ProductActions } from "./product.actions";

const initialState={
    products:[]
}
export function ProductReducer (state = initialState , action : ProductActions){
switch(action.type){
 case ADDPRODUCT:
    return{
        ...state ,
        products:[
            ...state.products,
            action.payload
        ]
    }
 case GETPRODUCTS:
 case EDITPRODUCT:
case DELETEPRODUCT:
    let deletedProduct = state.products.find(p=>p.id==action.payload)
    let products = state.products;
    return{

    }
}
}