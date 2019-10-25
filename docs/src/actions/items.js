import axios from 'axios';

import {GET_ITEMS, DELETE_ITEMS, UPDATE_ITEM, CREATE_ITEM, GET_ERRORS} from './types';
import { createMessage } from './messages';
import { tokenConfig } from './auth';

// const API_URL = 'https://wishlist-backend-server.herokuapp.com';
const API_URL = 'http://127.0.0.1:8000';

// GET ITEMS
export const getItems = (link) => (dispatch, getState) => {
    
    let url = `${API_URL}/api/items/`;

    if(link) {
        url = `${API_URL}${link}/`;
    }

    axios.get(url, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// DELETE_ITEMS
export const deleteItems = (id) => (dispatch, getState) => {
    const url = `${API_URL}/api/items/${id}/`;

    axios.delete(url, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({
                deleteItem: 'Item deleted'
            }));
            dispatch({
                type: DELETE_ITEMS,
                payload: id
            });
        })
        .catch(err => console.log(err));
}

// CREATE_ITEM
export const createItem = (item) => (dispatch, getState) => {
    let url = `${API_URL}/api/items/`;
    axios.post(url, item, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({
                createItem: 'Item created'
            }));
            dispatch({
                type: CREATE_ITEM,
                payload: res.data
            });
        })
        .catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}

// UPDATE_ITEM
export const updateItem = (item) => (dispatch, getState) => {
    let url = `${API_URL}/api/items/${item.id}/`;

    axios.put(url, item, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_ITEM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}
