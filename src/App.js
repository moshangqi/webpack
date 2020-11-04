/*global module*/

import React from 'react';
import {hot,setConfig} from 'react-hot-loader';


class App extends React.Component{
  render() {
    return(
      <div>我的weboack</div>
    )
  }
}

setConfig({showReactDomPatchNotification: false})
export default hot(module)(App)