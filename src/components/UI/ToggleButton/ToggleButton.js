import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpRounded from '@material-ui/icons/KeyboardArrowUpRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classes from "./ToggleButton.module.css";


const toggleButton = (props) => {
  const switched = [ ["ON", "green"], ["OFF", "red"] ];
  let btnType;
  switch(props.type){
    case "arrowUp":
      btnType =  (<IconButton 
        className={classes.ShowBtn}
        aria-label={props.label}
        onClick={props.clicked}>
        <KeyboardArrowUpRounded 
              color="secondary"
              fontSize="large"
            />
      </IconButton>);
      break;
  
    case "normal":
        btnType = (<ListItem onClick={props.clicked}>
            <ListItemIcon >{props.icon} </ListItemIcon>
            <ListItemText>
                <span style={{color: switched[props.switch][1]}}>
                {switched[props.switch][0]}
                </span> 
                : {props.label}
            </ListItemText>
          </ListItem>);
        break;

    default:
      btnType = null;
  }
    return (
      <>
       {btnType}
      </>
    );
};

export default toggleButton;