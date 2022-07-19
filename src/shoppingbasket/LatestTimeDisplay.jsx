import React from 'react';
import Typography from 'material-ui/Typography';
import moment from 'moment';

const timeStyles = {
  title: {
    display: "table",
    background: "white",
    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    borderRadius: "5px",
    padding: "10px",
  }
}
class LatestTimeDisplay extends React.Component{

  render(){
    let formattedTime = "";
    if(this.props){
     let timeUnix = this.props.time;
     formattedTime = moment.unix(timeUnix).format('MMMM Do YYYY, h:mm:ss a');
    }
    return(
      <React.Fragment>
        <Typography type="headline" gutterBottom style={timeStyles.title}>Rates last updated: {formattedTime}</Typography>
      </React.Fragment>
    )
  }
}

export default LatestTimeDisplay;
