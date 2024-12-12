import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/Landing/index.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const router = createBrowserRouter([  
  {
    path: "/",
    element: <LandingPage />
  }, {
    path:"*",
    element: <NotFoundPage />
  }
], {
  // basename: '/mapsitrab'
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
