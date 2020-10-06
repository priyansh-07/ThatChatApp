import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
	root: {
		display: 'inline-block',
		padding: '0.5em 1em 0.5em 0.8em',
		marginTop: '0.8em',
		marginRight: '1em',
		backgroundColor: theme.palette.background.paper,
		borderRadius: '0 1em 1em 1em',		
	},
	title: {
		color: theme.palette.primary.main,
	},
}))

export default function ReceivedMessage(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<span className={classes.title} ><b>{props.sender}</b></span> <br/>
			{props.text}
		</div>
	)
}
