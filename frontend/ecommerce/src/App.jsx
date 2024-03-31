import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductByCategoryPage from './pages/ProductByCategoryPage';
import SuccessPage from './components/Payment/SuccessPage';
import CancelPage from './components/Payment/CancelPage';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/products/:productId" element={<ProductDetailPage/>} />
        <Route path="/categories/:categoryId/products/" element={<ProductByCategoryPage/>}/>
        <Route path="checkout/success" element={<SuccessPage/>} />
        <Route path="checkout/cancel" element={<CancelPage/>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
