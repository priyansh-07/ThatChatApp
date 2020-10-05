import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

// function rand() {
// 	return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '330px',
		[theme.breakpoints.up('md')]: {
			width: '400px',
		},
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	container: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	button: {
		marginLeft: '65%',
		marginTop: '1em',
	}
}));

export default function SimpleModal() {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(true);

	// const handleOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Before you proceed!</h2>
			<ul id="simple-modal-description">
				<li>This is a simple app where you can talk to different people in different chat rooms. Nothing Fancy! But hey! I'm learning xD!</li>
				<li>The App is still under development, so if you find any bugs or have a suggestion, feel free to drop an email at <br />
	priyanshjain@acm.org.
				</li>
				<li>If you want to create an account use fake id and password.
				</li>
				<li>Otherwise login with the following credentials:<br />
					<b>email: test@example.com</b><br />
					<b>password: test123456</b>
				</li>
				<li>
					In case it breaks Please do let me know, it'll be easier for me to reproduce and debug the issue.
				</li>
			</ul>
			Thank you for testing it out!<br />
			<Button 
				onClick={handleClose} 
				variant='contained' 
				color='primary'
				className={classes.button}>
			CONTINUE!
			</Button>
		</div>
	);

	return (
		<div className={classes.container}>
			{/* <Button variant='contained' color='primary' onClick={handleOpen} className={classes.button}>
        Click Me before proceeding
      </Button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
