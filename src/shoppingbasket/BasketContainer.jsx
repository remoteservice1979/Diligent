import React from 'react';
import ProductList from './ProductList';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Basket from './Basket';
import { Link }  from 'react-router-dom';
import Button from 'material-ui/Button';

const styles = {
  formStyles: {
    border: "1px solid grey",
    borderRadius: "5px",
    background: "lightgray",
    padding: "5px",
    marginBottom: "10px"
  },
  button: {
    width: "150px",
    height: "80px",
    marginTop: "10px",
    marginRight: "50px",
    float: "right"
  }
}

class BasketContainer extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      basketContents: [],
      currencyCode: "",
      currencySwitch: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  handleChange(event, checked){
    this.setState({
      currencySwitch: checked
    })
    if(!this.state.currencySwitch){
      this.props.changeCurrency("USDGBP");
    } else {
      this.props.changeCurrency("USD");
    }
  }

  handleProducts(arr){
    this.setState({
      basketContents: arr
    })
  }

  deleteItem(index){
    let items = this.state.basketContents;
    if(items.includes(index)){
      items.splice(items.indexOf(index), 1)
    }
    this.setState({
      basketContents: items
    })
    console.log(this.state.basketContents)
  }

  updateList(){
    console.log('button clicked')
    console.log(this.props)
    var chosen = this.state.basketContents
    console.log(chosen)
    this.props.handleBasketItems(chosen)
  }

  render(){
    return(
      <React.Fragment>
        <Grid container xs={12}>
          <Grid item xs={2}>
          <FormGroup style={styles.formStyles}>
            <Typography type="title">Switch to £</Typography>
            <FormControlLabel
              control={ <Switch
              checked={this.state.currencySwitch}
              onChange={this.handleChange}
            />
            }
              label={<span>GBP</span>}
            />
        </FormGroup>
      </Grid>
      <Grid item xs={10}>
        <Link to="/checkout">
          <Button style={styles.button} raised color="primary" onClick={this.updateList}>Checkout</Button>
        </Link>
      </Grid>
      </Grid>
          <Typography type="display1" gutterBottom style={{textDecoration: "underline"}}>Product list</Typography>
        <Grid container spacing={24} >
            <ProductList {...this.props} handleProducts={this.handleProducts} />
            <Grid item xs={4}>
              <Basket
                      chosenProducts={this.state.basketContents}
                      allProducts={this.props.products}
                      deleteItem={this.deleteItem}
                      baseCurrency={this.props.data.baseCurrency}
                      baseCurrencyRate={this.props.data.baseCurrencyRate}/>
            </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default BasketContainer;
