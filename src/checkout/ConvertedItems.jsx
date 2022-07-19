import React from 'react';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

class ConvertedItems extends React.Component {

  render(){
    let convertedTotal = 0;

    let convertedList = this.props.products.map((product, index) => {

      if(this.props.data.finalItems.includes(index)){
        convertedTotal += (product.price * this.props.chosenCurrencyRate)

        return (
          <ListItem button key={index}>
            <ListItemText primary={product.name} />
            <ListItemText primary={<span>{(product.price * this.props.chosenCurrencyRate).toFixed(2)} - {this.props.chosenCurrency}</span>} />
          </ListItem>
        );
      }
    });
    return(
      <React.Fragment>
        <Paper style={{padding: "10px"}}>
          <Typography type="display3">Converted Items</Typography>
          <Divider />
          <List>
            {convertedList}
          </List>
          <Divider />
          <Typography type="headline" gutterBottom>
            Total: <span style={{float: "right"}}> {convertedTotal.toFixed(2)} {this.props.chosenCurrency}</span>
          </Typography>
        </Paper>
      </React.Fragment>
    );
  }
}

export default ConvertedItems;
