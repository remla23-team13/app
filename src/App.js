import './App.css';
import { Body } from './body/Body';
import { Header } from './header/Header';

function App() {
  return (
    <div className="App">
      <div className='Wrapper'>
        <Header/>
        <Body/>
      </div>
    </div>
  );
}

export default App;