import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, Switch

import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductByCategoryPage from './pages/ProductByCategoryPage';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/products/:productId" element={<ProductDetailPage/>} />
        <Route path="/categories/:categoryId/products/" element={<ProductByCategoryPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
