import React from 'react';

import classes from "./Navbar.module.css";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import Share from '@material-ui/icons/Share';



const styles = theme => ({
    button: {
      margin: theme.spacing.unit
    },
    input: {
      display: 'none',
    },
  });

const navbar = (props) => {
    return (
        <nav className={classes.Navbar} >
            <div>
                <IconButton className={classes.button}
                  aria-label="Dashboard"
                  onClick={props.openDrawer}
                  >
                    <Menu 
                        className={classes.button}
                        color="primary" 
                       
                        />
                </IconButton>
            </div>
            <div>
                <IconButton className={classes.button}  aria-label="Search">
                    <Search 
                        className={classes.button}
                        color="primary" 
                        />
                </IconButton>
            </div>
            <div>
                <IconButton className={classes.button}  aria-label="Share">
                    <Share 
                        className={classes.button}
                        color="primary" 
                        />
                 </IconButton>
            </div>
        </nav>
    );
};

export default withStyles(styles)(navbar);