import React from 'react';

import classes from "./ImageInfo.module.css";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


// Button component to close the info bar
const CloseBarButton = (props) => (
    <IconButton 
    className={classes.button}
    aria-label="Hide bar"
    onClick={props.hideBar}>
    <KeyboardArrowDown 
        color="secondary"
        className={classes.button}
        />
</IconButton>);


const imageInfo = (props) => {
    const copyright = props.data.copyright ? 
        <span style={{fontSize:"14px"}}>, by <span className={classes.Author}> {props.data.copyright}</span></span> 
        : null;


    return (
        <div className={classes.Bar} >
            <div className={classes.Title}>
                <div>
                    <p className={classes.Date}>{props.formatedDate}</p>
                    <h3>{props.data.title} {copyright}</h3>
                </div>
                <CloseBarButton hideBar={props.hideBar} />
            </div>
            <div className={classes.Desc}>
                <p>{props.data.explanation}</p>
             
            </div>
        </div>
    );
};



export default imageInfo;