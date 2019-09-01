import React, {Component} from 'react';
import {Segment, Button, Input} from "semantic-ui-react"
import firebase from "firebase";

class MessagesForm extends Component {
    state = {
      message: "",
      loading:false,
      channel: this.props.currentChannel,
      user: this.props.currentUser,
      errors: []
    };

    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    };

    sendMessage=()=>{
        const {messagesRef} =this.props;
        const {message, channel}=this.state;

        if (message){
            this.setState({loading:true });
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(()=>{
                    this.setState({loading:false, message: "", errors:[]})
                })
                .catch((err)=>{
                    this.setState({
                        loading:false,
                        errors: this.state.errors.concat(err)
                    })
                })
        } else {
            this.setState({
                errors: this.state.errors.concat({message: "Add a message"})
            })
        }
    };

    createMessage=()=>{
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
            content: this.state.message
        };
        return message
    };

    render() {
        const {errors} = this.state;
        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    style={{marginBottom:"0.7em"}}
                    label={<Button icon={"add"} />}
                    labelPosition="left"
                    className={
                        errors.some(error=> error==="message") ? "error" : ""
                    }
                    placeholder="Write your message"
                />
                <Button.Group fluid icon width="2">
                    <Button
                        onClick={this.sendMessage}
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                    /><Button
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>

            </Segment>
        );
    }
}

export default MessagesForm;