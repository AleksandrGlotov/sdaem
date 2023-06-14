import React from 'react';
import './styles/global.scss';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { NewsListpage } from './Components/NewsListpage/NewsListPage';
import { NewsPage } from './Components/NewsListpage/NewsPage/NewsPage';
import { Route, Routes } from 'react-router-dom';
import { Error404 } from './Components/404/404';
import { Contacts } from './Components/Contacts/Contacts';
import { Registration } from './Components/Login/Registration';
import { Login } from './Components/Login/Login';
import { Catalog } from './Components/Catalog/Catalog';
import { Main } from './Components/Main/Main';

function App() {
  return (
    <div className='minHeight'>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news" element={<NewsListpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/news/:newsId" element={<NewsPage />} />
        <Route path="/catalog/*" element={<Catalog />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
