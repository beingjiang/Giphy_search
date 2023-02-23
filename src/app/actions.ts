// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Image Typing
import { IImage, IImageState } from '../app/reducer';

// Create Action Constants
export enum ImageActionTypes {
  GET_ALL = 'GET_ALL',
  GET_IMAGE = 'GET_IMAGE',
}

// Interface for Get All Action Type
export interface IImageGetAllAction {
  type: ImageActionTypes.GET_ALL;
  images: IImage[];
}

// Interface for Get Image Action Type
export interface IImageGetAction {
  type: ImageActionTypes.GET_IMAGE;
  image: IImage;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type ImageActions = IGetAllAction | IGetOneAction ... 
*/
export type ImageActions = IImageGetAllAction | IImageGetAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllImages: ActionCreator<
  ThunkAction<Promise<any>, IImageState, null, IImageGetAllAction>
> = (query, page = 0) => {
  const limit = 10;
  const offset = page * limit;

  return async (dispatch: Dispatch) => {
    try {
      const searchTerm = query ? query : '';
      const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=97shnO9k9oi39WpUuMw19lvbt1zXKcih&limit=${limit}&offset=${offset}`);

      const images = response.data.data;
      const action: IImageGetAllAction = {
        type: ImageActionTypes.GET_ALL,
        images,
      };
      dispatch(action);
    } catch (err) {
      console.error(err);
    }
  };
};

/* Get Single Image Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getImage: ActionCreator<
  ThunkAction<Promise<any>, IImageState, null, IImageGetAction>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`http://api.giphy.com/v1/gifs/${id}?api_key=97shnO9k9oi39WpUuMw19lvbt1zXKcih`);
      const image = response.data.data;
      const action: IImageGetAction = {
        type: ImageActionTypes.GET_IMAGE,
        image,
      };
      dispatch(action);
    } catch (err) {
      console.error(err);
    }
  };
};
