import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Hd from "@material-ui/icons/Hd";
import Favorite from "@material-ui/icons/Favorite";
import classes from "./LeftDrawer.module.css";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

const styles = {
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
};

const leftDrawer = (props) => {
	const sideList = (
		<div className={classes.list}>
			<List>
				<ListItem>
					<h3>AstroPicture</h3>
				</ListItem>
				<Divider />
				<ListItem button>
					<Hd />
					<ListItemText primary="Hd Images" />
					<Switch
						checked={props.isHD}
						onChange={props.changeResolution}
						value={props.isHD}
					/>
				</ListItem>
				<ListItem button>
					{/* NOTE: when using router see: https://material-ui.com/guides/composition/#react-routers */}
					<Favorite />
					<ListItemText primary="Favorites" />
				</ListItem>
				<ListItem button>
					<Dashboard />
					<ListItemText primary="Change to grid" />
				</ListItem>
				<Divider />
				<ListItem button>
					<Person />
					<ListItemText primary="About" />
				</ListItem>
			</List>
			<Divider />
			<List />
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
};

export default withStyles(styles)(leftDrawer);
