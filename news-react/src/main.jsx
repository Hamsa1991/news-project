import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'

import '../lib/owlcarousel/assets/owl.carousel.min.css'
import './style.css'
import {RouterProvider} from "react-router-dom"
import router from "./router.jsx"
import { ContextProvider } from './contexts/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
