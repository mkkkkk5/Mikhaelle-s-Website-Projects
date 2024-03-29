import React, { useState,useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useHistory } from 'react-router-dom';

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/AUCTIONpng.png";

import fb from '../fb'

const useStyles = makeStyles(styles);

export default function Login() {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    useEffect(() => {
        const clear = setTimeout(() => setCardAnimation(""), 700)
        return () => clearTimeout(clear) // function that cancels the timeout
    }, [])
    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const login = async () => {
        await fb.auth().signInWithEmailAndPassword(email, password)
        // redirect to home page
        history.push("/")
    }

    return (
        <div>
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>

                                <CardHeader color="info" className={classes.cardHeader}>
                                    <h4>Login</h4>
                                </CardHeader>
                                <p className={classes.divider}>Please enter email and password</p>
                                <CardBody>
                                    <CustomInput
                                        onChange={event => setEmail(event.target.value)}
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: event => setEmail(event.target.value),
                                            value: email,
                                            type: "email",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputIconsColor} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <div>
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => setPassword(event.target.value),
                                                value: password,
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                    </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button simple color="success" size="lg" onClick={login}>
                                        Login
                                    </Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
