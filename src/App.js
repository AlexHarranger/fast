import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ScrollToTop from './ScrollToTop';
import PageProduct from './pages/PageProduct';
import Cart from './pages/Cart';
import logIn from './pages/LogIn';
import SignUp from './pages/SignUp';

export default function App () {

  return (
    <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' Component={Layout}>
            <Route index Component={Home}/>
            <Route path='/produits' Component={Products}/>
            <Route path='/produits/:id' Component={PageProduct}/>
            <Route path='*' Component={Home}/>
            <Route path='/about' Component={About}/>
            <Route path='/panier' Component={Cart}/>
            <Route path='/login' Component={logIn}/>
            <Route path='/signup' Component={SignUp}/>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}