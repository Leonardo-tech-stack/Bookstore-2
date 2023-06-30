import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from 'react-redux';
// import store from "../src/components/store";
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './index.css';
import NavbarNavigation from './components/Navbar/NavbarNavigatio';
import Footer from '../src/components/Footer/Footer';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
        <QueryClientProvider client={queryClient}>
          <NavbarNavigation />
          <Routes />
          <Footer />
        </QueryClientProvider>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);
