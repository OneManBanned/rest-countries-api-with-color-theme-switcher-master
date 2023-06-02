import React from 'react'
import ReactDOM from 'react-dom/client'
import ListView from './routes/listView.jsx'
import '../dist/css/index.css'
import Error from "./routes/error-page.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        path: 'listView',
        element: <ListView />
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
