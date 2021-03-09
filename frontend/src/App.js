import {BrowserRouter as Router , Route} from 'react-router-dom'
import './App.css';

import Header from './componenets/layouts/Header'
import Footer from './componenets/layouts/Footer'
import Home from './componenets/Home'
import ProductDetails from './componenets/product/ProductDetails'
function App() {
  return (
    <Router>
    <div className="App">
    <Header />
    <div className = "container container-fluid">
    <Route path = "/" component = {Home} exact />
    <Route path = "/product/:id" component = {ProductDetails} exact />


    </div>

    <Footer />
    </div>
    </Router>
  );
}

export default App;
