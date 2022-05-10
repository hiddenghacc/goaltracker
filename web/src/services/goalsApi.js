import api from "./axios"

const goalsApi = {
  get: () => {
    return api.get("goals")
  },
  post: (name, note) => {
    return api.post("goals", { name, note })
  },
  update: (id, name, note) => {
    return api.put(`goals/${id}`, { name, note })
  },
  delete: (id) => {
    return api.delete(`goals/${id}`)
  }
}

export default goalsApi
