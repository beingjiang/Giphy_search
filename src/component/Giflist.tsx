import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../app/store';

import { IImage } from '../app/reducer';
import './gift.css';



interface IProps {
  images: IImage[];
}

class ImageList extends React.Component<IProps> {
  public render() {
    const { images } = this.props;

    return (
      <div className="giphy-container">
        {images &&
          images.map((image, i) => {
            return (
              <div className="giphy-item" key={i}>
                <p>{image.title}</p>
                <img src={image.images.original.url} alt={image.title} />
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    images: store.imageState.images,
  };
};

export default connect(mapStateToProps)(ImageList);
