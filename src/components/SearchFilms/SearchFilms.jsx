import React, { Component } from 'react'
import { debounce } from 'lodash'
import { Input } from 'antd'
import './SearchFilms.css'

export default class SearchFilms extends Component {
  state = {
    searchText: '',
  }

  search = debounce(() => {
    const { resultSearch } = this.props
    const { searchText } = this.state
    resultSearch(searchText)
  }, 1000)
  onChange = (e) => {
    this.setState({
      searchText: e.target.value,
    })
    this.search()
  }

  render() {
    return (
      <Input
        type={'text'}
        className="containerSearch-input"
        onChange={this.onChange}
        value={this.state.searchText}
        placeholder="Place enter film"
      />
    )
  }
}
