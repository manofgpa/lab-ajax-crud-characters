class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl
  }

  async getFullList() {
    return await axios.get('http://localhost:8000/characters')
  }

  async getOneRegister(id) {
    return await axios.get(`http://localhost:8000/characters/${id}`)
  }

  async createOneRegister(character) {
    return await axios.post('http://localhost:8000/characters', character)
  }

  async deleteOneRegister(id) {
    return axios.delete(`http://localhost:8000/characters/${id}`)
  }

  async updateOneRegister(character) {
    return axios.put(`http://localhost:8000/characters/${character.id}`, character)
  }
}
