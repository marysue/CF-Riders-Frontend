export const SET_BICYCLE_LIST = 'products/bicycles/bicycleList';
export const SET_BICYCLE_DETAIL = 'products/bicycles/bicycleDetail';
export const SET_BICYCLES_LOADED = 'products/bicycles/bicyclesLoaded';

//actions
export const setBicycleList = bicycleList => ({ type: SET_BICYCLE_LIST, bicycleList });
export const setBicycleDetail = bicycleId => ({ type: SET_BICYCLE_DETAIL, bicycleId });
export const setBicyclesLoaded = bicyclesLoaded => ({ type: SET_BICYCLES_LOADED, bicyclesLoaded });

//reducer
export default function reducer(state = { bicyclesLoaded: false }, action) {
    switch (action.type) {
      case SET_BICYCLE_LIST: {
          const newState = {...state};
          newState.bicycleList = action.bicycleList;
          return newState
      };

      case SET_BICYCLE_DETAIL: {
          const newState = {...state};
          newState.bicycleDetail = action.bicycleId;
          return newState;
      }

      case SET_BICYCLES_LOADED: {
          const newState = { ...state};
          newState.bicyclesLoaded = action.bicyclesLoaded;
          return newState;
      }

      default:
          return state;
    }
};
