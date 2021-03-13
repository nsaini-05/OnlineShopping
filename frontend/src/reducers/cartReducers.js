import {ADD_TO_CART} from '../constants/cartConstants'


export const cartReducer = (state = {cartItems : []} , action)=>{
    switch(action.type)
    {
        case ADD_TO_CART:
            const item = action.payload //action.payload will be the product 


            //to avoid the copy of same item first check if the product exist in cart or not


            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if(isItemExist)
            {
                    return{
                        ...state,
                        cartItems :  state.cartItems.map( i=> i.product === isItemExist.product ? item : i)
                    }
            }

            else{
                return{
                    ...state,
                    cartItems:[...state.cartItems , item]
                }
            }

        


        default : 
            return state




    }
}