import React from 'react'

const messageStyle = {
	padding: '2px 5px',
}

export default function ReceivedMessage(props) {
	return (
		<div style={messageStyle}>
			{props.sender}: {props.text}
		</div>
	)
}
