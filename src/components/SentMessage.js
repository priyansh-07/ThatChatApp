import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
	root: {
		alignSelf: 'flex-end',
		display: 'flex',
		flexDirection: 'column',
		padding: '0.5em 1em 0.5em 1em',
		marginTop: '0.8em',
		// marginRight: '1em',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '1em 1em 0 1em',
		color: theme.palette.background.default,
		width: 'fit-content',
		marginLeft: 'auto',
		marginRight: '1.1em',
	},
	text: {
		margin: 0
	},
}))

export default function SentMessage(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<p className={classes.text}>
				{props.text}
			</p>
		</div>
	)
}
