import './Header.css';

export function Header() {  
  return (
    <div className="Header">
      <div className='Title'>
        Restaurant Review Sentiment Analysis
      </div>
      <div className='Course'>
        Release Engineering for Machine Learning Applications
      </div>
      <div className='Members'>
        <div className='Team'>Team 13</div>
        <div className='Member'>Gaspar Rocha</div>
        <div className='Member'>Giulio Piva</div>
        <div className='Member'>Isa Rethans</div>
        <div className='Member'>Sara Op den Orth</div>
      </div>
    </div>
  )
}