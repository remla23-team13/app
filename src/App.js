import './App.css';
import { Body } from './body/Body';
import { Header } from './header/Header';
import { VersionUtil } from '@remla23-team13/remla-lib'

function App() {
  console.log("Using version " + VersionUtil.getVersion() + " of the remla-lib.");

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