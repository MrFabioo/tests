import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Tours } from './Tours';
import { Navigation } from './Navigation';
import { Expenses } from './Expenses';
import { ExpensDetail } from './ExpensDetail';
// import { Redux } from './Redux/Redux';
import './App.css';

// import { Home } from './Redux/Home';
// import { Login } from './Redux/Login';
// import { Contact } from './Redux/Contact';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { Bag } from './Bag/Bag';

function App() {
  return (
    <div className='App'>
      {/*  */}
      <Provider store={store}>
        {/*  */}
        <Router>
          {/* <Link to={'/redux/home'}>Redux</Link>
          <Link to={'/redux/login'}>Login</Link>
          <Link to={'/redux/contact'}>Contact</Link> */}
          <Navigation />
          <Routes>
            <Route path='/' />
            <Route path='/bag' element={<Bag />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/tours/:id' element={<Expenses />} />
            <Route path='/tours/:id/:idDetail' element={<ExpensDetail />} />
            {/*  */}
            {/* <Route path='/redux' element={<Redux />} />
            <Route path='/redux/home' element={<Home />} />
            <Route path='/redux/login' element={<Login />} />
            <Route path='/redux/contact' element={<Contact />} /> */}
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
