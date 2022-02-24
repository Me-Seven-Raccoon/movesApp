export default class ApiFilmsService {
  apiBase = 'https://api.themoviedb.org/3/'
  apiKey = '913e9234e511db682e401b187e1be26b'

  async getFilms(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Err')
    }
    return await res.json()
  }

  async sendData(url, value) {
    try {
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value,
        }),
      })

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`)
      }

      try {
        return await res.json()
      } catch (error) {
        throw new Error(`Could not get a JSON object from ${url}`)
      }
    } catch (error) {
      throw new Error('Could not connect to API')
    }
  }
  getSearchFilms(valueSearch, page) {
    return this.getFilms(
      `${this.apiBase}search/movie?api_key=${this.apiKey}&query=${valueSearch}
      &page=${page}`
    )
  }
  async getSessionId() {
    const data = await this.getFilms(`${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`)
    if (data.success) {
      this.gustId = data.guest_session_id
      return this.gustId
    }
    return false
  }
  getRated() {
    return this.getFilms(`${this.apiBase}guest_session/${this.gustId}/rated/movies?api_key=${this.apiKey}`)
  }
  rateMovie(value, id) {
    return this.sendData(
      `${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.gustId}`,
      value
    )
  }
  getGenres() {
    return this.getFilms(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}`)
  }
}
