import { axiosIsntance } from "../config"

export const placeOrder=(token, total)=> async (dispatch, getState)=>{

    dispatch({type: 'PLACE_ORDER_REQUEST'})
    const currentUser = getState().loginUserReducer.currentUser
    const cartItems = getState().cartReducer.cartItems

    try {
        
        const response = await axiosIsntance.post('/api/orders/placeorder', {token, total, currentUser, cartItems})
        dispatch({type: 'PLACE_ORDER_SUCCESS'})
        // console.log(response)
    } catch (error) {
        dispatch({type: 'PLACE_ORDER_FAILED'})
        console.log(error)
    }
}


export const getUserOrders = () => async (dispatch, getState)=>{

    const currentUser = getState().loginUserReducer.currentUser

    dispatch({type: 'GET_USER_ORDERS_REQUEST'})

    try{
        const response = await axiosIsntance.post('/api/orders/getuserorders', {userid : currentUser._id})
        // console.log(response)
        dispatch({type:'GET_USER_ORDERS_SUCCESS', payload : response.data})
    }catch(error){
        dispatch({type:'GET_USER_ORDERS_FAILED', payload : error})

    }

}

export const getAllOrders = () => async (dispatch, getState)=>{

    dispatch({type: 'GET_ALL_ORDERS_REQUEST'})

    try{
        const response = await axiosIsntance.get('/api/orders/getallorders')
        // console.log(response)
        dispatch({type:'GET_ALL_ORDERS_SUCCESS', payload : response.data})
    }catch(error){
        dispatch({type:'GET_ALL_ORDERS_FAILED', payload : error})

    }

}


export const markOrderAsReady = (orderId) => async (dispatch) => {
    try {
      await axiosIsntance.put(`/api/orders/${orderId}/readyForPickup`);
      dispatch({ type: 'ORDER_MARK_READY_FOR_PICKUP_SUCCESS' });
    } catch (error) {
      dispatch({
        type: 'ORDER_MARK_READY_FOR_PICKUP_FAIL',
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };