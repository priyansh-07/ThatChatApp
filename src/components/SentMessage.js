import React from 'react'

const messageStyle = {
	padding: '2px 5px'
}

export default function SentMessage(props) {
	return (
		<div style={messageStyle}>
			<span style={{color: props.textColor}} ><b>{props.sender}</b></span>: {props.text}
		</div>
	)
}
