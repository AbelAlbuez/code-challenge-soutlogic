import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Customers from './components/Customers'
import AddCustomer from './components/AddCustomer'
import EditCustomer from './components/EditCustomer'
import GetCustomer from './components/GetCustomer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Customers/>}></Route>
        <Route path='/add' element={<AddCustomer/>}></Route>
        <Route path='/:id' element={<GetCustomer/>}></Route>
        <Route path='/edit/:id' element={<EditCustomer/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
