import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';

import ReceivedMessage from './ReceivedMessage'
import SentMessage from './SentMessage'

import { db } from '../config/firebase';

const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	margin: {
	  margin: theme.spacing(1),
	},
	withoutLabel: {
	  marginTop: theme.spacing(3),
	},
	textField: {
	  width: '25ch',
	},
	content: {
		height: '78vh',
		[theme.breakpoints.down('sm')]: {
			height: '67vh',
		},
		overflow: 'scroll',
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	messageInput: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		left: 0,
		marginRight: theme.spacing(2),
		backgroundColor: '#303030',
		[theme.breakpoints.up('sm')]: {
			marginLeft: '240px',
		},
	},
	messageContainer: {
		display: 'flex',
	},
  }));

export default function ChatWindow(props) {
	const classes = useStyles();
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState([])

	useEffect(() => {
		db.collection(`/${props.currentRoom.toLowerCase()}`)
			.orderBy('createdAt')
			.onSnapshot( qs => {
				setMessages(qs.docs.map( doc => ({
					sender: doc.data().sender,
					text: doc.data().message,
				})))
			})
	}, [props.currentRoom]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let msgObj = {
			createdAt: new Date().toISOString(),
			sender: props.userId,
			message: inputMessage,
		}
		db.collection(`/${props.currentRoom.toLowerCase()}`).add(msgObj)
		setInputMessage('');
	}
	// TODO: Random colors for each text sender
	// const rand = () => {
	// 	return Math.round(Math.random() * 6);
	// }
	// const colors = ['#09FBD3', '#F5D300', '#FDC7D7', '#A5D8F3', '#FFDEF3',
	//  				'#CE96FB', '#01FFC3'];

	const messageComponents = messages.map((msg, index) => {
		if (msg.sender === props.userId)
			return (
				<div className={classes.messageContainer} key={index}>
					<SentMessage sender={msg.sender} text={msg.text} />
					<br />
				</div>
			)
		else
			return (
				<div key={index}>
					<ReceivedMessage sender={msg.sender} text={msg.text} />
					<br />
				</div>
			)
	});
	return (
		<div>
			<div className={classes.content} id='message-container'>
				{messageComponents}
			</div>
			<form onSubmit={handleSubmit} className={classes.messageInput}>
				<FormControl fullWidth className={classes.margin} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-amount">Message</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={inputMessage}
						onChange={e => {
							setInputMessage(e.target.value);
						}}
						startAdornment={<InputAdornment position="start" style={{color: '#00cfc1'}} > {'>'} </InputAdornment>}
						labelWidth={60}
						autoComplete='off'
					/>
				</FormControl>
			</form>
		</div>
	)
}
