import React, { useState, useEffect, useRef } from 'react'

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
	  marginRight: '1.1em',
	},
	withoutLabel: {
	  marginTop: theme.spacing(3),
	},
	textField: {
	  width: '25ch',
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		maxHeight: '92vh',
		[theme.breakpoints.down('sm')]: {
			maxHeight: '93vh',
		},
		justifyContent: 'flex-end',
		justifySelf: 'flex-end',
		paddingBottom: '0.3em',
		width: '100%',
	},
	content: {
		maxHeight: 'auto',
		overflow: 'scroll',
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	messageInputForm: {
		alignSelf: 'flex-end',
		width: '98%',
		[theme.breakpoints.down('sm')]: {
			width: '96%',
		},		
		margin: 'auto',
		marginTop: '0.4em',
	},
	outlinedInput: {
		backgroundColor: theme.palette.background.default,
	},
  }));

export default function ChatWindow(props) {
	const classes = useStyles();
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(scrollToBottom);

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

	const messageComponents = (
		<div style={{display: 'flex', flexDirection: 'column'}}>
			{messages.map((msg, index) => {
				if (msg.sender === props.userId)
					return (
						<div className={classes.messageContainer} key={index}>
							<SentMessage sender={msg.sender} text={msg.text} />
						</div>
					)
				else
					return (
						<div key={index}>
							<ReceivedMessage sender={msg.sender} text={msg.text} />
							<br />
						</div>
					)
			})}
			<div ref={messagesEndRef} />
		</div>
	)

	return (
		<div style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-end',
			}}>
		<div className={classes.contentContainer}>
			<div className={classes.content}>
				{messageComponents}
			</div>
			<form onSubmit={handleSubmit} className={classes.messageInputForm}>
				<FormControl fullWidth className={classes.margin} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-amount">Message</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						className={classes.outlinedInput}
						value={inputMessage}
						onChange={e => {
							setInputMessage(e.target.value);
						}}
						startAdornment={<InputAdornment position="start" style={{color: '#00cfc1'}} > {'>'} </InputAdornment>}
						labelWidth={67}
						autoComplete='off'
					/>
				</FormControl>
			</form>
		</div>
		</div>
	)
}
