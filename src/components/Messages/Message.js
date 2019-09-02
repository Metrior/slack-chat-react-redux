import React from 'react';
import moment from "moment"
import {Comment} from "semantic-ui-react"

const timeFromNow = timestamp => {
    moment(timestamp).fromNow();
};

const isOwnMessage = (message, user) => {
    return message.user.id === user.uid ? "message__self" : ""
};

const Message = ({message, user}) => {
    return (
        <div>
            <Comment>
                <Comment.Avatar src={message.user.avatar}/>
                <Comment.Content classname={isOwnMessage(message, user)}>
                    <Comment.Author as="a">
                        {message.user.name}
                    </Comment.Author>
                    <Comment.Metadata>
                        {timeFromNow(message.timestamp)}
                    </Comment.Metadata>
                    <Comment.Text>
                        {message.content}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        </div>
    );
};

export default Message;