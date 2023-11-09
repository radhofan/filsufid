import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import { store } from "./Store";
import { Provider } from "react-redux";

import Akun from './akun/Akun'
import Artikel from './artikel/Artikel'
import Katalog from './katalog/Katalog'
import Komunitas from './komunitas/Komunitas'
import CreatePost from './create/CreatePost';
import Profil from './akun/Profil';
import PostContent from './content/PostContent';
import ArticleContent from './content/ArticleContent';
import CreateArticle from './create/CreateArticle';
import Book from './katalog/Book';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Akun",
    element: <Akun />,
  },
  {
    path: "/Artikel",
    element: <Artikel />,
  },
  {
    path: "/Katalog",
    element: <Katalog />,
  },
  {
    path: "/Komunitas",
    element: <Komunitas />,
  },
  {
    path: "/CreatePost",
    element: <CreatePost />,
  },
  {
    path: "/CreateArticle",
    element: <CreateArticle />,
  },
  {
    path: "/Profil",
    element: <Profil />
  },
  {
    path: '/Komunitas/:postId', 
    element: <PostContent /> 
  },
  {
    path: '/Artikel/:articleId',
    element: <ArticleContent/>
  },
  {
    path: 'Book/:bookId',
    element: <Book/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


