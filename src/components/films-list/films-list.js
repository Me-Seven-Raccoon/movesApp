// import React, { Component, Fragment } from 'react'
//
// import FilmItem from '../film-item'
// import './films-list.css'
//
// export default class FilmsList extends Component {
//   render() {
//     const { test } = this.props
//     return (
//       <div className="film-list-container">
//         {test.map(({ id, ...allFilms }) => (
//           <Fragment key={id}>
//             <FilmItem {...allFilms} />
//           </Fragment>
//         ))}
//       </div>
//     )
//   }
// }
import React, { Component, Fragment } from 'react'

import ApiFilmsService from '../../services/films-services'
import FilmItem from '../film-item'
import Spiner from '../spiner'
import ErrorIndicator from '../error-indicator'
import './films-list.css'

export default class FilmsList extends Component {
  state = {
    dataFilms: [],
    loading: true,
    error: false,
  }

  films = new ApiFilmsService()

  constructor() {
    super()
    this.updateFilms()
  }
  updateFilms() {
    this.films
      .getSearchFilms()
      .then((films) => {
        films.map((el) => {
          this.setState(({ dataFilms }) => {
            const newArr = [...dataFilms, el]
            return {
              dataFilms: newArr,
            }
          })
        })
        this.setState({
          loading: false,
        })
      })
      .catch(this.onError)
  }
  onError = (err) => {
    console.log(err)
    this.setState({
      error: true,
      loading: false,
    })
  }
  render() {
    const { dataFilms, loading, error } = this.state

    const loadData = !(loading || error)
    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spiner /> : null
    const content = loadData ? <FilmsView dataFilms={dataFilms} /> : null
    return (
      <div className="film-list-container">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const FilmsView = ({ dataFilms }) => {
  return (
    <Fragment>
      {dataFilms.map(({ id, ...allFilms }) => (
        <Fragment key={id}>
          <FilmItem {...allFilms} />
        </Fragment>
      ))}
    </Fragment>
  )
}
