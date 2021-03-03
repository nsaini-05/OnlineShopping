import {BrowserRouter as Router , Route} from 'react-router-dom'
import './App.css';

import Header from './componenets/layouts/Header'
import Footer from './componenets/layouts/Footer'
import Home from './componenets/Home'
function App() {
  return (
    <Router>
    <div className="App">
    <Header />
    <div className = "container container-fluid">
    <Route path = "/" component = {Home} exact />
    </div>

    <Footer />
    </div>
    </Router>
  );
}

export default App;
