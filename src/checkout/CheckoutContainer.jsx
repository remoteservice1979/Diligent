import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CurrencySelector from './CurrencySelector';
import SelectedItems from './SelectedItems';
import ConvertedItems from './ConvertedItems';

const styles = {
  title: {
    textDecoration: "underline",
    textDecorationColor: "#4742B8"
  }
}
class CheckoutContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chosenCurrency: "",
      chosenCurrencyCode: "",
      chosenCurrencyRate: 0
    }
    this.handleChosenCurrency = this.handleChosenCurrency.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleChosenCurrency(code){
    let apiCode = `USD${code}`;
    let apiRates = this.props.data.currencyquotes.quotes;
    if(apiRates){
      Object.keys(apiRates).map(rate => {
        if(rate === apiCode){
        console.log("found it")
        this.setState({
          chosenCurrencyCode: apiCode,
          chosenCurrencyRate: apiRates[rate]
        });
      }
    });
    let countries = this.props.data.countries;
    Object.keys(countries).map(country => {
      if(code === country){
        this.setState({
          chosenCurrency: countries[country]
        })
      }
    });
  }
}
  handleLinkClick(){
    console.log(this.props);
    this.props.changeCurrency("USD");
  }



  render(){
    return(
      <React.Fragment>
        <Link to="/basket"><span onClick={this.handleLinkClick}><i className="material-icons">arrow_back</i>  back to products</span></Link>
        <Typography style={styles.title} type="display3">Checkout</Typography>
        <CurrencySelector onSelect={this.handleChosenCurrency} data={this.props.data}/>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <SelectedItems {...this.props}
              baseCurrency={this.props.data.baseCurrency}
              baseCurrencyRate={this.props.data.baseCurrencyRate}/>
          </Grid>
          <Grid item xs={6}>
            <ConvertedItems {...this.props}
              baseCurrency={this.props.data.baseCurrency}
              baseCurrencyRate={this.props.data.baseCurrencyRate}
              chosenCurrency={this.state.chosenCurrency}
              chosenCurrencyRate={this.state.chosenCurrencyRate}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CheckoutContainer;
