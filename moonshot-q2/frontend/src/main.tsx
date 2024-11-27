import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
      </CookiesProvider>
    </Provider>
  </StrictMode>,
)
