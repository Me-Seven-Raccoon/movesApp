export default class ApiFilmsService {
  async getFilms() {
    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=913e9234e511db682e401b187e1be26b&query=return'
    )

    if (!res.ok) {
      throw new Error('Err')
    }
    return await res.json()
  }
  async getSearchFilms() {
    const res = await this.getFilms(
      'https://api.themoviedb.org/3/search/movie?api_key=913e9234e511db682e401b187e1be26b&query=return'
    )
    return res.results
  }
}

// const getFimls = async (url) => {
//   const res = await fetch(url)
//
//   // if (!res.ok) {
//   //   throw new Error(`Err ${url}`)
//   // }
//   return await res.json()
// }
// getFimls('https://api.themoviedb.org/3/search/movie?api_key=913e9234e511db682e401b187e1be26b&query=return').then(
//   (body) => {
//     console.log(body.results)
//   }
// )
