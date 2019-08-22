import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import MyComics from './components/MyComics';
import MarvelComics from './components/MarvelComics';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home}/>
        <Route path='/my-comics' component={MyComics}/>
        <Route path='/marvel-comics' component={MarvelComics}/>
      </Layout>
    );
  }
}
