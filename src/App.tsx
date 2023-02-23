
import * as React from 'react';
import './App.css';

import ImageList from './component/Giflist';
import Search from './component/SearchInput';
import {FunctionComponent} from 'react'

const App: FunctionComponent<{}> = () => {
  return (
    <>
      <h1>Giphy Search </h1>
      <Search />
      <ImageList />
    </>
  );
};

export default App;