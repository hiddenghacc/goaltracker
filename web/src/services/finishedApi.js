import api from "./axios"

const finishedApi = {
  get: (date) => {
    return api.get("finished", { params: { date } })
  },
  post: (date, note, goalId) => {
    return api.post("finished", { date, note, goalId })
  },
  update: (id, date, note, goalId) => {
    return api.put(`finished/${id}`, { name, note, goalId })
  },
  delete: (id) => {
    return api.delete(`finished/${id}`)
  }
}

export default finishedApi
