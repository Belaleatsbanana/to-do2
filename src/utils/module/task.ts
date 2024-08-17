import axios from 'axios'
import { ref } from 'vue'
import { API_URL } from '../constants'
import { TOKEN } from './user'

export type Task = {
  title: string
  description: string
  status: string
  id?: string
  updated_at?: string
  created_at?: string
  editMode?: boolean
}

export const TASKS = ref<Task[]>([])

export const importTasks = async (): Promise<Task[]> => {
  try {
    TOKEN.value = localStorage.getItem('token')
    console.log(TOKEN.value)
    const response = await axios.get('/tasks', {
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${TOKEN.value}`
      }
    })
    console.log(response.data)

    return response.data
  } catch (err) {
    console.log(err)
    return []
  }
}
