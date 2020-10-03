import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';

import ReceivedMessage from './ReceivedMessage'
import SentMessage from './SentMessage'

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
  }));

export default function ChatWindow(props) {
	let test_messages = [
		{
			type: 'received',
			sender: 'shit 1',
			text: 'Hey!',
		},
		{
			type: 'received',
			sender: 'shit 2',
			text: 'How are you?'
		},
		{
			type: 'sent',
			sender: 'shit 3',
			text: 'fucked!'
		},
	]
	const classes = useStyles();
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState(test_messages)

	const handleSubmit = (e) => {
		e.preventDefault();
		let msgObj = {
			sender: props.userId,
			type: 'sent',
			text: inputMessage
		}
		setMessages([...messages, msgObj])
		setInputMessage('');
	}

	const messageComponents = messages.map((msg, index) => {
		if (msg.type === 'sent')
			return <SentMessage sender={msg.sender} text={msg.text} key={index} />
		else
			return <ReceivedMessage sender={msg.sender} text={msg.text} key={index} />
	});
	return (
		<div>
			<div style={{height: '80vh'}}>
				{messageComponents}
			</div>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth className={classes.margin} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-amount">Message</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={inputMessage}
						onChange={e => {
							setInputMessage(e.target.value);
						}}
						startAdornment={<InputAdornment position="start"> {'>'} </InputAdornment>}
						labelWidth={60}
						autoComplete='off'
					/>
				</FormControl>
			</form>
		</div>
	)
}
