import './index.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import store from './Redux/Store.js';

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <BrowserRouter>
    {/* <Toaster position="top-right" /> */}
    <App />
   </BrowserRouter>
   </Provider>
)
