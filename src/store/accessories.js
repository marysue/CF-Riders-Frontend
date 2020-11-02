export const SET_ACCESSORY_LIST = 'products/accessory/accessoryList';
export const SET_ACCESSORY_DETAIL = 'products/accessory/accessoryDetail';
export const SET_ACCESSORY_LOADED = 'products/accessory/accessoryLoaded'
//actions
export const setAccessoryList = accessoryList => ({ type: SET_ACCESSORY_LIST, accessoryList });
export const setAccessoryDetail = accessoryDetail => ({ type: SET_ACCESSORY_DETAIL, accessoryDetail });
export const setAccessoriesLoaded = accessoriesLoaded => ({ type: SET_ACCESSORY_LOADED, accessoriesLoaded });
//reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
      case SET_ACCESSORY_LIST: {
          const newState = {...state};
          newState.accessoryList = action.accessoryList;
          return newState
      };

      case SET_ACCESSORY_DETAIL: {
          const newState = {...state};
          newState.accessoryDetail = action.accessoryDetail;
          return newState;
      }

      case SET_ACCESSORY_LOADED : {
          const newState = { ...state};
          newState.accessoriesLoaded = action.accessoriesLoaded;
          return newState;
      }

      default:
          return state;
    }
};
