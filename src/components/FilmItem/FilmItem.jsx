import React, { Component } from 'react'
import { format } from 'date-fns'
import './FilmItem.css'
import { Rate } from 'antd'

import { Consumer } from '../context'
import ApiFilmsService from '../../Services/films-services'

export default class FilmItem extends Component {
  films = new ApiFilmsService()
  state = {
    testReit: null,
  }

  onChange = (value) => {
    const { el, id } = this.props
    this.setState({
      testReit: value,
    })
    if (value !== 0) {
      el(value, id)
    }
  }
  render() {
    const { release_date, title, overview, poster_path, vote_average, genre_ids, rating } = this.props
    const data = !release_date ? <p>Дата не известна</p> : format(new Date(release_date), 'MMMM dd, yyyy')
    const poster = !poster_path ? (
      <img className="img-films" src={'https://serial-go.org/uploads/no_poster.jpg'} />
    ) : (
      <img className="img-films" src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
    )
    let className = 'rate-film'
    if (vote_average >= 0 && vote_average <= 3) {
      className += ' rate-on'
    }
    if (vote_average > 3 && vote_average < 5) {
      className += ' rate-to'
    }
    if (vote_average >= 5 && vote_average <= 7) {
      className += ' rate-the'
    }
    if (vote_average > 7) {
      className += ' rate-last'
    }
    return (
      <div className="blockFilms">
        <div className="block-image">{poster}</div>
        <div className="blockInfo">
          <div className="blockInfo-title">
            <div className="title-info">
              <h5>{title}</h5>
            </div>
            <div className={className}>{vote_average}</div>
          </div>
          <div className="blockInfo-data">{data}</div>
          <Consumer>
            {(data) => {
              const newRes = data.filter((x) => genre_ids.some((y) => x.id === y))
              const result = newRes.map((el) => {
                return <p key={el.id} className="genreEl">{`${el.name}`}</p>
              })
              return <div className="genreParent">{result}</div>
            }}
          </Consumer>
          <div className="blockInfo-text">
            <p className="blockInfo-overview">{overview}</p>
          </div>
          <div className="rate-style">
            <Rate count={10} className={'rr'} onChange={this.onChange} value={rating} />
          </div>
        </div>
      </div>
    )
  }
}
