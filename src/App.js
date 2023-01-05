import React from 'react'

// ROUTER
import { BrowserRouter } from 'react-router-dom'
import { RouterConfig } from './navigation/RouterConfig'
import { AuthProvider } from './contexts'
// Redux
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './App.scss'
import 'toastr/build/toastr.min.css'

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <RouterConfig />
              {/* <Footer /> */}
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </div>
    </>
  )
}

export default App
