import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation.jsx';
import CarDetailsPage from './pages/CarDetalisPage.jsx';
import Catalog from './pages/Catalog.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { store } from './redux/store.js';
function App() {
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={'Loading.....'}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<CarDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Provider>
    </>
  );
}

export default App;
