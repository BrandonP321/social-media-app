import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Profilepage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/user/:username'>
            <Profilepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
