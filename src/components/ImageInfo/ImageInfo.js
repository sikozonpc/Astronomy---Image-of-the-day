import React from 'react';

import classes from "./ImageInfo.module.css";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const imageInfo = (props) => {
    return (
        <div className={classes.Bar}>

            <div className={classes.Desc}>
                <p>{props.data.explanation}</p>
                <IconButton 
                    className={classes.button}
                    aria-label="Hide bar"
                    onClick={props.hideBar}>
                    <KeyboardArrowDown 
                        color="secondary"
                        className={classes.button}
                        />
                </IconButton>
            </div>
        </div>
    );
};

export default imageInfo;