import { 
  useState,
  useReducer,
  useEffect,
  // useLayoutEffect,
  // useContext,
  // useCallback,
  // useMemo
} from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {

  const [ inputValue, setInputValue ] = useState('')
  const [ name, setName ] = useState('')
  const [ currency, setCurrency ] = useState('')
  const [ currencyData, setCurrencyData ] = useState(null)

  const [sum, dispatch] = useReducer((state, action) => { return state + action }, 0)

  useEffect(() => {
    axios
      // .get('https://api.jikan.moe/v3/search/anime?q=naruto')
      // .then(({data}) => console.log(data.results))

      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(({data}) => data.bpi)
      .then(data => setCurrencyData(data[currency]))

    // fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  }, [currency])

  useEffect(() => {
    console.log('currency', currency)
  }, [currency])



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        { name && <p>  My name is {name}. </p> }
        {sum}
        <form>

          <input name='myInput' value={inputValue} onChange={e => setInputValue(e.target.value)} />

          <button 
            type='submit' 
            onClick={(e) => {
              e.preventDefault()
              setName(inputValue)
              setInputValue('')
            }}
          >
            Submit
          </button>
        </form>

        <button onClick={() => dispatch(1)}>
        Add 1
      </button>
        
      <select onChange={(e) => setCurrency(e.target.value)}>
        <option></option>
        <option>EUR</option>
        <option>GBP</option>
        <option>USD</option>
      </select>

      {
        currencyData && (
          <div>
            <p>Currency: {currencyData.code} {currencyData.symbol}</p>
            <p>Description: {currencyData.description}</p>
            <p>Rate: {currencyData.rate}, Ratefloat: {currencyData.rate_float}</p>
          </div>
        )
      }

      {/* <button onClick={(e) => setCurrency(e.target.value)}>
        Euro
      </button>
      <button onClick={(e) => setCurrency(e.target.value)}>
        GBP
      </button>
      <button onClick={(e) => setCurrency(e.target.value)}>
        USD
      </button> */}

      </header>


    </div>
  );
}

export default App;
