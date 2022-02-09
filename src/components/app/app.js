import React, { Component } from 'react'

import ApiFilmsService from '../../services/films-services'
// import Header from '../header/header'
// import SearchFilms from '../search-films/search-films'
import FilmsList from '../films-list'

export default class App extends Component {
  state = {
    dataFilms: [],
  }

  swapi = new ApiFilmsService()

  constructor() {
    super()
    this.updateFilms()
  }
  updateFilms() {
    this.swapi.getSearchFilms().then((films) => {
      films.map((el) => {
        this.setState(({ dataFilms }) => {
          const newArr = [...dataFilms, el]
          return {
            dataFilms: newArr,
          }
        })
      })
    })
  }
  render() {
    return (
      <div>
        {/*<Header />*/}
        {/*<SearchFilms />*/}
        <FilmsList test={this.state.dataFilms} />
      </div>
    )
  }
}
