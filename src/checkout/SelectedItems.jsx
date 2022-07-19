import React from 'react';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

class SelectedItems extends React.Component {
  render(){

    let totalPrice = 0;
    let price = 0;

    let finalList = this.props.products.map((product, index) => {
      this.props.baseCurrency === "USDGBP" ? price = product.price * this.props.baseCurrencyRate.toFixed(2) : price = product.price;

      if(this.props.data.finalItems.includes(index)){
        totalPrice += price;

        return (
          <ListItem button key={index}>
            <ListItemText primary={product.name} />
            <ListItemText primary={this.props.baseCurrency === "USDGBP" ? (product.price * this.props.baseCurrencyRate.toFixed(2)).toFixed(2) : (product.price.toFixed(2))} />
          </ListItem>
        );
      }
    });

    return(
      <React.Fragment>
        <Paper style={{padding: "10px"}}>
          <Typography type="display3">Final Choice</Typography>
          <Divider />
          <List>
            {finalList}
          </List>
          <Divider />
          <Typography type="headline" gutterBottom>
            Total: <span style={{float: "right"}}> {this.props.baseCurrency === "USDGBP" ? "£" : "$"}{totalPrice.toFixed(2)}</span>
          </Typography>
        </Paper>
      </React.Fragment>
    );
  }
}
export default SelectedItems;
