import React, { Component, Fragment } from 'react'
import { Tabs } from 'antd'
import { Row } from 'antd'

import { Provider } from '../context'
import ApiFilmsService from '../../Services/films-services'
import FilmItem from '../FilmItem'
import Spiner from '../Spiner'
import ErrorIndicator from '../ErrorIndicator'
import SearchFilms from '../SearchFilms/SearchFilms'
import './FilmsList.css'
import PaginationPage from '../Pagination'

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export default class FilmsList extends Component {
  films = new ApiFilmsService()
  state = {
    dataFilms: ' ',
    filmsRated: null,
    genresList: 1,
    loading: true,
    error: false,
    errorSearch: false,
    valueSearch: 'return',
    page: 1,
    totalPages: null,
    rating: {},
  }

  componentDidMount = () => {
    this.films.getGenres().then((data) => {
      this.setState({
        genresList: data.genres,
      })
    })
    this.films.getSessionId().then(() => {})
    this.updateFilms()
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.valueSearch !== prevProps.valueSearch || this.state.page !== prevProps.page) {
      this.updateFilms()
    }
  }

  updateFilms = () => {
    const { valueSearch, page } = this.state
    this.films
      .getSearchFilms(valueSearch, page)
      .then((films) => {
        if (films.results.length === 0) {
          this.setState({
            errorSearch: true,
            totalPages: null,
          })
        } else {
          this.setState({
            dataFilms: films.results,
            totalPages: films.total_pages,
            loading: false,
            errorSearch: false,
          })
        }
      })
      .catch(this.onError)
  }

  searchFilms = (text) => {
    if (text === '') {
      text = 'return'
    }
    this.setState({
      valueSearch: text,
    })
    this.searchPage(1)
  }

  onError = (err) => {
    console.log(err)
    this.setState({
      error: true,
      loading: false,
    })
  }

  searchPage = (page) => {
    this.setState({
      page: page,
    })
  }

  testSt = (val, id) => {
    this.films
      .rateMovie(val, id)
      .then(async () => {
        await delay(500)
        this.films.getRated().then((el) => {
          this.setState({
            filmsRated: el.results,
            rating: { ...this.state.rating, [id]: val },
          })
        })
      })
      .catch(console.log)
  }

  render() {
    const { TabPane } = Tabs
    const { dataFilms, loading, error, errorSearch, page, totalPages, valueSearch, genresList, filmsRated, rating } =
      this.state
    const loadData = !(loading || error || errorSearch)
    const errSearch = errorSearch ? <p>Фильмы не найдены</p> : null
    const errRate = <p>Фильмы не оценены</p>
    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spiner /> : null
    const content = loadData ? (
      <FilmsView
        dataFilms={dataFilms.map((film) => {
          if (rating[film.id]) {
            film.rating = rating[film.id]
          }
          return film
        })}
        testSt={this.testSt}
      />
    ) : null
    const search = <SearchFilms resultSearch={this.searchFilms} valueSearch={valueSearch} />
    const pageLink = !(totalPages === null) ? (
      <PaginationPage searchPage={this.searchPage} page={page} totalPages={totalPages} />
    ) : null
    const resRet = filmsRated !== null ? <FilmsView dataFilms={filmsRated} testSt={this.testSt} /> : errRate
    return (
      <Provider value={genresList}>
        <Tabs defaultActiveKey="1" className="film-list-container">
          <TabPane tab="Search" key="1">
            <Row className="films-list">
              {search}
              {errSearch}
              {errorMessage}
              {spinner}
              {content}
              {pageLink}
            </Row>
          </TabPane>
          <TabPane tab="Rate" key="2">
            <Row className="films-list">{resRet}</Row>
          </TabPane>
        </Tabs>
      </Provider>
    )
  }
}
const FilmsView = (props) => {
  return (
    <Fragment>
      {props.dataFilms.map(({ id, ...allFilms }) => (
        <Fragment key={id}>
          <FilmItem {...allFilms} el={props.testSt} id={id} />
        </Fragment>
      ))}
    </Fragment>
  )
}
