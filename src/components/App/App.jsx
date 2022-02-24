import React, { Component } from 'react'

import 'antd/dist/antd.css'
import 'offline-js/offline.min'
import 'offline-js/themes/offline-language-english.css'
import 'offline-js/themes/offline-theme-default.css'
import FilmsList from '../FilmsList'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="element">
        <FilmsList />
      </div>
    )
  }
}
