import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { ProductData } from './ProductData';
import currencies from './images/currencies.jpg';
import LatestTimeDisplay from './shoppingbasket/LatestTimeDisplay';

const styles = {
    currencyImage: {
        backgroundImage: `url(${currencies})`,
        opacity: "0.8",
        filter: "grayscale(100%)"
    },
    title: {
      display: "table",
      background: "white",
      border: "10px solid black",
      borderRadius: "8px",
      padding: "10px"
    }
};
var myHeaders = new Headers();
myHeaders.append("apikey", "CLN9OCEb1dTBHsk4N4Yt1hXKz7BLh5jl");
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currencyquotes: [],
      countries: [],
      baseCurrency: "",
      baseCurrencyRate: null,
      finalItems: []
    }
    this.apiRequest = this.apiRequest.bind(this);
    this.countriesApiRequest = this.countriesApiRequest.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.handleBasketItems = this.handleBasketItems.bind(this);
  }

  apiRequest(){
    
    fetch("https://apilayer.com/api/live",requestOptions)
    .then(function(response){
      if(response.ok){
        console.log("Successful request");
        return response.json();
      }
      throw new Error("Network response not OK")
    })
    .then(data => {
      this.setState({currencyquotes: data});
    })
    .catch(error => {
      console.log(error.message);
    });
    this.countriesApiRequest();
  }

  countriesApiRequest(){
    // const url = "http://apilayer.net/api/list?access_key=CLN9OCEb1dTBHsk4N4Yt1hXKz7BLh5jl"
    fetch("https://api.apilayer.com/currency_data/list", requestOptions)
    .then(function(response){
      if(response.ok){
        console.log("Successful request");
        return response.json();
      }
      throw new Error("Network response not OK")
    })
    .then(data => {
      this.setState({countries: data.currencies});
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  changeCurrency(code){
    let rates = this.state.currencyquotes.quotes;
    Object.keys(rates).map(rate => {
      if(code === rate){
        this.setState({
          baseCurrencyRate: rates[rate],
          baseCurrency: rate,
          finalItems: []
        });
      } else if(code.length === 3) {
        this.setState({
          baseCurrency: "USD",
          baseCurrencyRate: null,
          finalItems: []
        });
      }
    });
 }

  componentDidMount(){
    this.apiRequest();
  }

  handleBasketItems(arr){
    var finalChoice = this.state.finalItems;
    var finalData = finalChoice.concat(arr)
    this.setState({
      finalItems: finalData
    });
  }

  render() {
    let time = this.state.currencyquotes.timestamp;

    return (
      <div  xs={12} className="App">
          <Paper style={{marginBottom: "30px"}}>
            <Grid container style={styles.currencyImage}>
              <Grid item xs={4}>
                <Typography type="display3" gutterBottom style={styles.title}>
                Diligent Basket <i style={{fontSize: "1em"}} className="material-icons">shopping_basket</i>
                </Typography>
              </Grid>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={4}>
                <LatestTimeDisplay time={time}/>
                <Button raised onClick={this.apiRequest}>Update</Button>
              </Grid>
            </Grid>
          </Paper>
          <Divider style={{marginBottom: "20px"}}/>
        <Router finaliseList={this.handleBasketItems}
                data={this.state}
                products={ProductData}
                changeCurrency={this.changeCurrency}/>
      </div>
    );
  }
}

export default App;
