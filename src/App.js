import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Burger from './components/Burger/Burger';

class App extends Component {
  state = {
    ingredients: {
      salad:0,
      bacon:0,
      cheese:0,
      meat:2
    }
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Burger ingredients = {this.state.ingredients}/>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
