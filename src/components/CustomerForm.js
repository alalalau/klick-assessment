import React, { useState } from 'react';
import { styles, useStyles, ColorButton } from './CustomerFormStyle.js';
import { Box, TextField, Button } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addCustomer, doesEmailExist, updateCustomer, getUserDetails } from '../api/CustomerAPI.js';

export function CustomerForm(props) {
    const classes = useStyles();

    const [date, setDate] = useState(moment(new Date()).format("DD-MM-YYYY"));
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    const [emailValid, setEmailValid] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [page, setPage] = useState(0);
    const [button, setButton] = useState("");

    const handleEmailChange = event => {
        const val = event.target.value;
        const valid = isEmail(val) ? true : false;
        setEmailValid(valid);
        setEmail(val);
    }

    const goToDetailsPage = () => {
        var val_button = doesEmailExist(props.users, email) ? "update" : "create";
        if (val_button === "update") {
            const details = getUserDetails(props.users, email);
            setFirstName(details["firstname"]);
            setLastName(details["lastname"]);
            var dob = moment(details["dob"], 'DD-MM-YYYY')
            setDate(dob.year() + '-' + (dob.month() + 1) + '-' + dob.date());
        }
        setButton(val_button);
        setPage(1);
    }

    const handleSubmit = e => {
        goToDetailsPage();
    };

    const EmailForm = () => {
        return (
            <Box style={styles.box}>
                <h1>Klick Customer</h1>
                <TextField
                    className={classes.root}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    style={styles.textField}
                    onChange={(e) => handleEmailChange(e)}
                    error={dirty && emailValid === false}
                    onBlur={() => setDirty(true)}
                    value={email}
                />
                <ColorButton variant="contained" disabled={!emailValid} onClick={handleSubmit}>
                    Enter
                </ColorButton>
            </Box>
        )
    }

    const DetailForm = () => {
        return (
            <Box style={styles.box}>
                <p style={{ fontWeight: 'bold' }}>{email}</p>
                <TextField
                    className={classes.root}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    style={styles.textField}
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    className={classes.root}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    style={styles.textField}
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date of Birth"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} className={classes.root} style={styles.textField} />}
                        inputFormat="dd/MM/yyyy"
                    />
                </LocalizationProvider>

                <Box>
                    <Button variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        style={{ margin: 10 }}
                        onClick={() => { setPage(0); clearDetails(); }}>
                        Back
                    </Button>
                    {button === "update"
                        ? <ColorButton
                            variant="contained"
                            style={{ margin: 10, width: '45%' }}
                            disabled={!(firstname && lastname && date)}
                            onClick={() => props.setUsers(updateCustomer(props.users, firstname, lastname, email, date))}
                        >Update</ColorButton>
                        : <ColorButton
                            variant="contained"
                            style={{ margin: 10, width: '45%' }}
                            disabled={!(firstname && lastname && date)}
                            onClick={() => {
                                props.setUsers(addCustomer(props.users, firstname, lastname, email, date));
                                setButton("update");
                            }}
                        >Create</ColorButton>
                    }
                </Box>
            </Box>
        )
    }

    function clearDetails() {
        setFirstName("");
        setLastName("");
        setDate("");
        setEmail("")
    }

    function chooseForm() {
        if (page === 0) {
            return EmailForm()
        } else {
            return DetailForm()
        }
    }

    return (
        <div style={styles.formContainer}>
            <Box style={styles.box}>
                {chooseForm()}
            </Box>
        </div>
    )
}