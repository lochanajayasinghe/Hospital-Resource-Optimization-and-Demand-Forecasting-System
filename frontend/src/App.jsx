
import './App.css'
import { Outlet } from 'react-router-dom'
import MyFooter from './components/MyFooter'

function App() {
  return (
    <div className='min-h-screen'>
      <Outlet />
      <MyFooter />
    </div>
  )
}

export default App
