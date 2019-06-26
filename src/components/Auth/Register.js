import React from "react";
import {Grid,Form,Segment,Button,Header, Message, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"
import firebase from "../../firebase"
import md5 from "md5"

class Register extends React.Component{

    state={
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users")
    };

    isFormValid = () =>{
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)){
            error = {message:"Fill in all fields"};
            this.setState({errors: errors.concat(error)});
            return false
        } else if (!this.isPasswordValid(this.state)) {
            error = {message: "Password is invalid"};
            this.setState({errors: errors.concat(error)});
            return false
        } else {
            return true
        }
    };

    isFormEmpty = ({username, email, password, passwordConfirmation}) =>{
        return !username || !email || !password || ! passwordConfirmation
    };

    isPasswordValid = ({password, passwordConfirmation})=>{
        if (password.length<6 || passwordConfirmation.length<6){
            return false
        } else return password === passwordConfirmation;
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
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                    .then(()=>{
                        this.saveUser(createdUser).then(()=>{
                            console.log("User saved")
                        });
                        this.setState({loading:false})
                    })
                    .catch(err => {
                        this.setState({errors: this.state.errors.concat(err),loading:false})
                    })
                })
                .catch(err=>{
                    console.log(err)
                })

        }
    };

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        })
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error=>error
            .message
            .toLowerCase()
            .includes(inputName))? "error" : ""
    };

    render(){
        const {username, email, password, passwordConfirmation, errors, loading}=this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth:450}}>
                    <Header as="h1" icon color="orange" textAlign="center">
                        <Icon name="user secret" color="orange"/>
                        Register for DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username"
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Username"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={username}
                            />
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
                            <Form.Input fluid name="passwordConfirmation"
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password Confirmation"
                                        onChange={this.handleChange}
                                        type="password"
                                        value={passwordConfirmation}
                                        className={this.handleInputError(errors, "password")}
                            />
                            <Button disabled={loading} className={loading ? "loading" : ""}
                                    color="orange" fluid size="large">
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
                    <Message>Already a user?<Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;