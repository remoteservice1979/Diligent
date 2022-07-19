import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';


class Basket extends React.Component{
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event, index){
    this.props.deleteItem(index);
  }

  render(){

    let totalProducts = this.props.allProducts;
    let productsChosen = this.props.chosenProducts;

    let listDisplay = totalProducts.map((product, index) => {

      if(productsChosen.includes(index)){
        return (
          <ListItem button key={index}>

            <ListItemAvatar>
              <Avatar>
                <img alt="avatar" src={product.image} />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={product.name}
              secondary={
                <span>{this.props.baseCurrency === "USDGBP" ? "£" : "$" }
                      {this.props.baseCurrency === "USDGBP" ? (product.price * this.props.baseCurrencyRate).toFixed(2) : product.price.toFixed(2)}
                </span>
              }/>

            <ListItemSecondaryAction
              onClick={(e) => this.handleDelete(e, index)}>

              <IconButton aria-label="Delete">
                <Icon  style={{ fontSize: 36 }}>
                    delete
                </Icon>
              </IconButton>

            </ListItemSecondaryAction>
        </ListItem>
       );
      }
    });

    return(
      <Paper style={{padding: "10px"}}>
        <Typography type="headline" component="h3">
          You've chosen:
        </Typography>
        <List>
          {listDisplay}
        </List>
      </Paper>
    );
  }
}

export default Basket;
