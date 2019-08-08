import { GET_ITEMS, DELETE_ITEMS, CREATE_ITEM, UPDATE_ITEM} from "../actions/types.js";

const initialState = {
    items: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case DELETE_ITEMS:
            let newState = {};
            for (let a in state.items) {
                if (a == "data"){
                    let newData = state.items["data"].filter(item => item.id !== action.payload)
                    newState[a] = newData;
                } else {
                    newState[a] = state.items[a]
                }
            }
            return {
                ...state,
                items: newState
            };
        case CREATE_ITEM:
            return {
                    ...state,
                    items: action.payload
                };
        case UPDATE_ITEM:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}