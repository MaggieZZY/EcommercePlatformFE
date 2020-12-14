import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function AddressForm(props) {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        fullWidth
                        autoComplete="fname"
                        value={props.info.firstname}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        fullWidth
                        autoComplete="lname"
                        value={props.info.lastname}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="billing address-line1"
                        value={props.info.address1}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="billing address-line2"
                        value={props.info.address2}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="billing address-level2"
                        value={props.info.city}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        value={props.info.state}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="billing postal-code"
                        value={props.info.zip}
                        onChange={props.updateInfoFormControl}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use profile address"
                        onChange={props.fillInfoFormControl}
                    />
                </Grid>
                <Link to="/cart">
                    <Button onClick={props.handleBack} style={{marginTop: 30,
                        marginLeft: 10}}>
                        Back to Cart
                    </Button>
                </Link>
            </Grid>
        </React.Fragment>
    );
}
