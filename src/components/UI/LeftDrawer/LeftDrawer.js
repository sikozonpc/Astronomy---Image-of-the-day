import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Hd from '@material-ui/icons/Hd';
import classes from "./LeftDrawer.module.css";
import ToggleButton from "../ToggleButton/ToggleButton"

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const leftDrawer = (props) => {
    // Reference the ToggleButton.js.
    const hdImagesSwitchState = props.isHD ? 0 : 1;

    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem button>
                <ToggleButton
                    type="normal"
                    clicked={props.hdImages}
                    label="HD Images"
                    icon={<Hd/>}
                    switch={hdImagesSwitchState}
                />
            </ListItem>
        </List>
        <Divider />
        <List>

        </List>
      </div>
    );


    return (
      <div>
        <Drawer open={props.isOpen} onClose={props.close}>
          <div
            tabIndex={0}
            role="button"
            onClick={props.close}
            onKeyDown={props.close}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
}


export default withStyles(styles)(leftDrawer);