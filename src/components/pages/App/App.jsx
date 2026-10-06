import './App.css';
import Welcome from '../Welcome/welcome'
import Quiz from '../Quiz/Quiz'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <title>Gov1074 Practice</title>
      <link rel="icon" type="image/x-icon" href="src/assets/react.svg"></link>
      <Routes>
        <Route path="/" element = {<Welcome />} />
        <Route path="/quiz" element = {<Quiz />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;