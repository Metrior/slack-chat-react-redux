import React from "react";
import {Grid,Form,Segment,Button,Header, Message, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"
import firebase from "../../firebase"

class Login extends React.Component{

    state={
        email: "",
        password: "",
        errors: [],
        loading: false,
    };

    // displayErrors = (errors) => {
    //     errors.map((error, i)=>
    //         <p key={i}>
    //             {error.message}
    //         </p>
    //     )
    // };

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    };

    handleSubmit = (e)=>{
        e.preventDefault();

        if (this.isFormValid()) {
            this.setState({errors:[], loading:true});
        }
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error=>error
            .message
            .toLowerCase()
            .includes(inputName))? "error" : ""
    };

    render(){
        const {email, password, errors, loading}=this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth:450}}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet"/>
                        Login for DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="email"
                                        icon="mail"
                                        iconPosition="left"
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                        type="email"
                                        value={email}
                                        className={this.handleInputError(errors, "email")}
                            />
                            <Form.Input fluid name="password"
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                        type="password"
                                        value={password}
                                        className={this.handleInputError(errors, "password")}
                            />
                            <Button disabled={loading} className={loading ? "loading" : ""}
                                    color="violet" fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors && errors.length>0 ? (
                        <Message error>
                            <h3>Error</h3>
                            {errors.map((error, i)=>
                                <p key={i}>
                                    {error.message}
                                </p>
                            )}
                            {/*{this.displayErrors(errors)}*/}
                        </Message>
                    ): null}
                    <Message>Don't have an account?<Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;