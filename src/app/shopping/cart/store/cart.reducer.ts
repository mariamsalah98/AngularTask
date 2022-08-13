import { CartItem } from "src/app/shared/Services/CartService/cart.service";
import *as fromCart from "./cart.actions";

export interface State {
  cart:{
    cart :CartItem[]
  },
}

const initialstate:{cart:CartItem[]}={
    cart : []
}

export function CartReducer (state= initialstate , action : fromCart.CartActions) {
    let newCart:CartItem[];
    let Item:CartItem ;
    let newItem:CartItem;
    switch(action.type){
        case fromCart.AddTOCART:
            if(state.cart.findIndex(item=>item.id==action.payload.id) > -1){
                console.log("product already in cart");
                newCart = [...state.cart];
                Item = state.cart.find(item=>item.id==action.payload.id);
                newItem={
                       name : Item.name ,
                       id : Item.id ,
                       price : Item.price ,
                       category : Item.category ,
                       image: Item.image ,
                       quantity : Item.quantity+1                  
                    }
                    newCart[action.payload.id-1]=newItem
                }
              else{
                 newCart = [
                    ...state.cart ,
                    {
                        id : action.payload.id,
                        name : action.payload.name ,
                        image : action.payload.image ,
                        price : action.payload.price ,
                        quantity : 1 ,
                        category : action.payload.category
                      
                    }
                ]
              }
            return{
                ...state,
                cart : newCart
            }
        case fromCart.DELETECARTITEM:
            newCart= [...state.cart]
            newCart.splice(action.payload-1 ,1)
            return{
                ...state,
                cart : newCart
            }
        case fromCart.CARTITEMPLUSONE:
            newCart = [...state.cart];
            Item = state.cart.find(item=>item.id==action.payload);
            newItem ={
                       name : Item.name ,
                       id : Item.id ,
                       price : Item.price ,
                       category : Item.category ,
                       image: Item.image ,
                       quantity : Item.quantity+1                  
                    }
                    newCart[action.payload-1]=newItem
            return{
                ...state ,
                cart : newCart
            }
        case fromCart.CARTITEMMINUSONE:
            newCart = [...state.cart];
            Item = state.cart.find(item=>item.id==action.payload);
             newItem={
                       name : Item.name ,
                       id : Item.id ,
                       price : Item.price ,
                       category : Item.category ,
                       image: Item.image ,
                       quantity : Item.quantity-1                  
                    }
                    newCart[action.payload-1]=newItem
            return{
                ...state,
                cart : newCart
            }
        default :
            return state ;
    }
}