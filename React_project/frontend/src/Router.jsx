import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Top from './components/index';

const router = createBrowserRouter([
  { path: "/", element: <Top /> },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Router;
