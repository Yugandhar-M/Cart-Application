import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import CardDetails from './components/CardDetails';
import Cards from './components/Cards';
import {Route,Routes} from 'react-router-dom';


function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Cards />}/>
      <Route path='/cart/:id' element={<CardDetails />}/>
    </Routes>
    </>
  );
}

export default App;
