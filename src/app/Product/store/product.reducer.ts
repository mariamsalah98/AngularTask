import { Product } from "src/app/shared/Models/product.model";
import { ADDPRODUCT, DELETEPRODUCT,  EDITPRODUCT, ProductActions } from "./product.actions";

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
 case EDITPRODUCT:
    let product = state.products.find(product=>{
        product.id==action.payload.id
    })
    let updatedproduct = {
        ...product,
        ...action.payload.product
    }
    let updatedProducts= [...state.products]
    updatedProducts[action.payload.id]=updatedproduct
    return{
        ...state ,
        products:updatedProducts
    }
case DELETEPRODUCT:
    return{
        ...state ,
        products : state.products.filter(product=>{
                    product.id==action.payload;
                })
    }
}
}