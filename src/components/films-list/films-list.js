import React, { Component, Fragment } from 'react'

import FilmItem from '../film-item'
import './films-list.css'

export default class FilmsList extends Component {
  render() {
    const { test } = this.props
    return (
      <div className="film-list-container">
        {test.map(({ id, ...allFilms }) => (
          <Fragment key={id}>
            <FilmItem {...allFilms} />
          </Fragment>
        ))}
      </div>
    )
  }
}
