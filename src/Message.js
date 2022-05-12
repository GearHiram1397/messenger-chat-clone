import React, { forwardRef } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import './Message.css'
const Message = forwardRef(({msg, username}, ref ) => {
  /* Checking if the username is the same as the message username. */
    const isUser = username === msg.username
  return (
      <div ref={ref} className={`message ${isUser && "message__user"}`}>
        <Card className={isUser ? "message__userCard" : "message__guestCard"}>
            <CardContent>
                <Typography 
                variant="h5"
                color="white" 
                component="h2"
                >
                    {!isUser && `${msg.username || "Unknow User"}:`} {msg.message}
                </Typography>
            </CardContent>
        </Card>
      </div>
  )
})

export default Message