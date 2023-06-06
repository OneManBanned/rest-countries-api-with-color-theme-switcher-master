import React from 'react'
import ReactDOM from 'react-dom/client'
import '../dist/css/index.css'
import Error from "./routes/error-page.jsx"
import Root from "./routes/root"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailView from './routes/detailView'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
  {
    path: '/:country/:borders',
    element: <DetailView />,
    errorElement: <Error />,
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
