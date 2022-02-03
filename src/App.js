import './App.css';
import React, { Component } from 'react';
import crypto from './crypto.png';

class App extends Component {

  constructor() {
    super()
    this.state = {
      currency: 'INR',
      BTC: 0,
      ETH: 0,
      BNB: 0,
      data: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  //Funxtion to handle the change in input and update the state
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    let crypto_list = ['BTC', 'ETH', 'BNB'];
    let i;
    this.setState({ data: true })
    for (i = 0; i < 3; i++) {
      let temp = i
      fetch("https://rest.coinapi.io/v1/exchangerate/" + crypto_list[i] + "/" + this.state.currency + "?apikey=0AACD1C0-85E9-4341-85CC-DF13EE1A3D2A")
        .then(response => response.json())
        .then(data => {
          if (temp === 0) {
            this.setState({ BTC: data['rate'].toFixed(2) })
          }
          else if (temp === 1) {
            this.setState({ ETH: data['rate'].toFixed(2) })
          }
          else {
            this.setState({ BNB: data['rate'].toFixed(2) })
          }
        })
    }

    console.log(this.state.currency)
  }

  render() {
    return (
      <div className='card'>
        <div>
          <form onSubmit={this.handleSubmit}>
            <h2>Crypto Convertor</h2>
            <label>Choose the currency: </label>
            <select
              className='custom_select'
              value={this.state.currency}
              onChange={this.handleChange}
              name="currency"
            >
              {/* <option value="none">Click here</option> */}
              <option value="INR">Indian Rupees INR</option>
              <option value="USD">U.S. Dollar USD</option>
              <option value="EUR">European Euro EUR</option>
              <option value="GBP">UK Pound Sterling GBP</option>
              <option value="AUD">Australian Dollar AUD</option>
              <option value="CHF">Swiss Franc CHF</option>
              <option value="CAD">Canadian Dollar CAD</option>
              <option value="SGD">Singapore Dollar SGD</option>
              <option value="JPY">Japanese Yen JPY</option>
              <option value="CNY">Chinese Renminbi (Yuan) CNY</option>
              <option value="SAR">Saudi Arabian Riyal SAR</option>
              <option value="AED">UAE Dirham AED</option>
              <option value="THB">Thai Bhat THB</option>
              <option value="MYR">Malaysian Ringgit MYR</option>
              <option value="KRW">South Korean Won KRW</option>
              <option value="NPR">Nepali Rupees NPR</option>
            </select>
            <button className='button'>Go!</button>
          </form>
          {this.state.data ?
            <div>
              <p>1 BTC Bitcoin: {this.state.BTC} {this.state.currency}</p>
              <p>1 ETH Ethereum: {this.state.ETH} {this.state.currency}</p>
              <p>1 BNB Binance Coin: {this.state.BNB} {this.state.currency}</p>
            </div> :
            <div>
              <p>1 BTC Bitcoin: </p>
              <p>1 ETH Ethereum: </p>
              <p>1 BNB Binance Coin: </p>
            </div>
          }
          
        </div>
        <img src={crypto} alt='Crypto Image'/>
      </div>
    )
  };
}

export default App;
