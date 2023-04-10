import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Customers from './components/Customers'
import AddOrUpdateCustomer from './components/AddOrUpdateCustomer'
import GetCustomer from './components/GetCustomer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Customers/>}></Route>
        <Route path='/add' element={<AddOrUpdateCustomer/>}></Route>
        <Route path='/add/:id' element={<AddOrUpdateCustomer/>}></Route>
        <Route path='/:id' element={<GetCustomer/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
