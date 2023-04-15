import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,ORDER_DELIVER_REQUEST, 
    ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAIL,ORDER_DELIVER_RESET,
    ORDER_APPROVE_REQUEST,
     ORDER_APPROVE_SUCCESS, 
     ORDER_APPROVE_FAIL,
     ORDER_UNAPPROVE_REQUEST, 
     ORDER_UNAPPROVE_SUCCESS, 
     ORDER_UNAPPROVE_FAIL,
     PRODUCTS_ORDER_REQUEST,
     PRODUCTS_ORDER_SUCCESS,
     PRODUCTS_ORDER_FAIL
} from './orderConstants.js'
import { CART_REMOVE_ITEM } from '../cartredux/cartconstant'
import axios from 'axios'
import { Logout } from '../userredux/useraction'
export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`http://localhost:5000/api/orders`, order, config)
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: CART_REMOVE_ITEM,
        payload: data,
      })
      localStorage.removeItem('cartItems')
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(Logout())
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      })
    }
  }



  export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, config)
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(Logout())
      }
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      })
    }
  }


  //Pay Order



  export const payOrder = (orderId,paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`,paymentResult, config)
  
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(Logout())
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      })
    }
  }
  //orderDeliver
  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${order._id}/deliver`,
        {},
        config
      )
  
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(Logout())
      }
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: message,
      })
    }
  }

  //listOrders
 
  export const listOrders = (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ORDER_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`http://localhost:5000/api/orders/getAll/${userId}`, config);
  
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
  
      if (message === 'Unauthorized') {
        dispatch(Logout());
      }
  
      dispatch({
        type: GET_ORDER_FAIL,
        payload: message,
      });
    }
  };

  export const getOrderByIdAndUserId = ( idUser) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'GET_ORDER_DASHBOARD_REQUEST' });
  
      const { data } = await axios.get(`http://localhost:5000/api/orders/getOrderbyIdUser/${idUser}`);
  
      dispatch({
        type: 'GET_ORDER_DASHBOARD_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_ORDER_DASHBOARD_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
export const approveOrder = (orderId) => async (dispatch,getState) => {
  try {
    dispatch({ type: ORDER_APPROVE_REQUEST })
    const response = await fetch(      `http://localhost:5000/api/orders/approveOrder/${orderId}`,

    {
      method: 'PUT',
      headers: {
        accept: 'multipart/form-data',
      }
    })
    
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await response.json()
    if (response.ok) {
      dispatch({
        type: ORDER_APPROVE_SUCCESS,
        payload: data
      })
    } else {
      dispatch({
        type: ORDER_APPROVE_FAIL,
        payload: data.message
      })
    }
  } catch (error) {
    dispatch({
      type: ORDER_APPROVE_FAIL,
      payload: error.message
    })
  }
}
export const UnapproveOrder = (orderId) => async (dispatch,getState) => {
  try {
    dispatch({ type: ORDER_UNAPPROVE_REQUEST })
    const response = await fetch(      `http://localhost:5000/api/orders/NotapproveOrder/${orderId}`,

    {
      method: 'DELETE',
      headers: {
        accept: 'multipart/form-data',
      }
    })
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await response.json()
    if (response.ok) {
      dispatch({
        type: ORDER_UNAPPROVE_SUCCESS,
        payload: data
      })
    } else {
      dispatch({
        type: ORDER_UNAPPROVE_FAIL,
        payload: data.message
      })
    }
  } catch (error) {
    dispatch({
      type: ORDER_UNAPPROVE_FAIL,
      payload: error.message
    })
  }
}

export const getProductsOrderItemsById = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_ORDER_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/api/orders/ProductsOrderByIdOrder/${orderId}`);

    dispatch({
      type: PRODUCTS_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }}
