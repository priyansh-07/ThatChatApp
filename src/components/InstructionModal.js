import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

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
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	container: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	button: {
		marginTop: '5em',
	}
}));

export default function SimpleModal() {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(true);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Before you proceed!</h2>
			<p id="simple-modal-description">
				<ul>
					<li>This App is still under development, If you find any bugs or have a suggestion, feel free to drop an email at <br />
		priyanshjain@acm.org.
					</li>
					<li>If you want to create an account just click on 'Don't have an account? Sign Up' but make sure you're using throw away
		id and password.
					</li>
					<li>Otherwise login with the following credentials<br />
						<b>email: test@example.com</b><br />
						<b>password: test123456</b>
					</li>
				</ul>
			</p>
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
