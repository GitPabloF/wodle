import { Routes, Route } from 'react-router-dom'
import Wodle from './components/Wodle/Wodle';



const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Wodle />} />
    </Routes>
  </>
  );
};

export default App;