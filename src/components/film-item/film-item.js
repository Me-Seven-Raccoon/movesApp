import React, { Component } from 'react'
import { format } from 'date-fns'
import './film-item.css'

export default class FilmItem extends Component {
  render() {
    const { release_date, title, overview, poster_path } = this.props

    return (
      <div className="blockFilms">
        <div className="block-image">
          <img className="img-films" src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        </div>
        <div className="blockInfo">
          <div className="blockInfo-title">
            <h5>{title}</h5>
          </div>
          {/*<div className="blockInfo-data">{release_date}</div>*/}
          <div className="blockInfo-data">{format(new Date(release_date), 'MMMM dd, yyyy')}</div>
          <p className="blockInfo-overview">{overview}</p>
        </div>
      </div>
    )
  }
}
