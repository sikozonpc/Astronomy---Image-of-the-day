import React from "react";

import classes from "./Controls.module.css";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Fullscreen from "@material-ui/icons/Fullscreen";

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: "none",
	},
});

const controls = (props) => {
	return (
		<div className={classes.Controls}>
			<div>
				<IconButton
					className={classes.button}
					aria-label="Fullscreen"
					onClick={() => props.changeFullscreen()}
				>
					<Fullscreen className={classes.button} color="primary" />
				</IconButton>
			</div>

			<div className={classes.BtnSection}>
				<div>
					<IconButton
						className={classes.button}
						aria-label="Next Image"
						onClick={() => props.changeImage("next")}
					>
						<ArrowForward
							className={classes.button}
							color="primary"
						/>
					</IconButton>
				</div>
				<hr />
				<div>
					<IconButton
						className={classes.button}
						aria-label="Previous Image"
						onClick={() => props.changeImage("back")}
					>
						<ArrowBack className={classes.button} color="primary" />
					</IconButton>
				</div>
			</div>
			<IconButton
				className={classes.button}
				aria-label="Download Image"
				href={props.currImg}
				target="_blank"
			>
				<CloudDownload className={classes.button} color="primary" />
			</IconButton>
		</div>
	);
};

export default withStyles(styles)(controls);
