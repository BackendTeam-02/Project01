import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ListPage from './components/ListPage';
import DocumentPage from './components/DocumentPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/document/:documentId",
    element: <DocumentPage />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
