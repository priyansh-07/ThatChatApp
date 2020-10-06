import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
	root: {
		display: 'inline-block',
		padding: '0.5em 1em 0.5em 1em',
		marginTop: '0.8em',
		marginRight: '1em',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '1em 1em 0 1em',
		marginLeft: 'auto',
		color: '#303030',
	},
	title: {
		color: '#303030'
	},
}))

export default function SentMessage(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{props.text}
		</div>
	)
}
