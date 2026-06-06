// Copyright 2026 Harsha Krishne Gowda
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  // JWT takes priority over API key
  const jwt = localStorage.getItem('nb_token')
  const apiKey = localStorage.getItem('nb_api_key')
  const token = jwt || apiKey
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isDemo = localStorage.getItem('nebeso_demo') === 'true'
      if (!isDemo) {
        localStorage.removeItem('nb_token')
        localStorage.removeItem('nb_api_key')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
