import React from 'react';
import {connect} from "react-redux";
import {
    cancelOrder,
    getAllOrders, sortOrders, updateDeliveryStatusTo1
} from "../../../actions/orders.action";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import {InputLabel} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const heads = [
    {id: 'id', label: 'Order ID', minWidth: 150},
    {id: 'firstname', label: 'First Name', minWidth: 150},
    {id: 'lastname', label: 'Last Name', minWidth: 150},
    {id: 'purchaseDate', label: 'Purchase Date', minWidth: 150},
    {id: 'deliveryStatus', label: 'Delivery Status', minWidth: 150},
    {id: 'editDeliveryStatus', label: 'Ship Order', minWidth: 100},
    {id: 'cancelRemove', label: 'Cancel Order', minWidth: 100}
];

const deliveryMessage = ['Not Yet Shipped', 'Has Been Shipped', 'Delivered'];

class ManageOrders extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            search: '',
            toSort: ''
        }
    }


    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0
        })
    };

    componentDidMount() {
        this.props.getAllOrders(() => {}, () => {})
    }

    updateDeliveryStatusTo1 = (event, order) => {
        order.deliveryStatus = 1;
        console.log("to backend", this.state);
        event.preventDefault();
        this.props.updateDeliveryStatusTo1(
            order,
            () => {},
            () => {}
        )
    }

    cancelOrder = (event, order_id) => {
        event.preventDefault();
        this.props.cancelOrder(
            order_id,
            () => {},
            () => {}
        )
    }

    updateSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    updateToSort = (event) => {
        this.setState({
            toSort: event.target.value
        })
        this.props.sortOrders(this.props.orders, event.target.value);
    }

    render(){

        return this.props.orders && (
            <Container style={{flexGrow: 1, marginTop: 40, marginBottom: 80}}>
                <div style={{margin: 10}}>
                    <h4>Order History</h4>
                </div>

                {/*<div style={{margin: 10}}>*/}
                {/*    <FormControl className="MuiFormControl" style={{margin: "5px"}}>*/}
                {/*        <InputLabel>Order Number</InputLabel>*/}
                {/*        <Input value={this.state.search}*/}
                {/*               onChange={this.updateSearch}/>*/}
                {/*    </FormControl>*/}
                {/*</div>*/}

                <div style={{marginTop: 10, marginBottom: 30, marginLeft: 10}}>
                    <FormControl className="MuiFormControl">
                        <InputLabel htmlFor="age-customized-select">Sort</InputLabel>
                        <Select value={this.state.toSort}
                                onChange={this.updateToSort}
                                input={<Input name="age" id="age-customized-select" />}
                                style={{width:"200px"}}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="recent">
                                View Most Recent
                            </MenuItem>
                            <MenuItem value="old">
                                View Earliest
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>


                <Paper>
                    <div style={{maxHeight: 440, overflow: 'auto'}}>
                        <Table stickyHeader>
                            <TableHead>
                                {
                                    heads.map(head => {
                                        return(
                                            <TableCell
                                                key={head.id}
                                                align={head.align}
                                                style={{ minWidth: head.minWidth}}
                                            >
                                                {head.label}
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableHead>
                            <TableBody>

                            </TableBody>

                            {
                                this.props.orders && Array.isArray(this.props.orders) && this.props.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((order, index) => {
                                    if(this.state.search !== "" && Number(this.state.search) !== order.id){
                                        return null;
                                    }
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell>
                                                {order.id}
                                            </TableCell>
                                            <TableCell>
                                                {order.firstname}
                                            </TableCell>
                                            <TableCell>
                                                {order.lastname}
                                            </TableCell>
                                            <TableCell>
                                                {order.purchaseDate.substring(0,10)}
                                            </TableCell>
                                            <TableCell>
                                                {deliveryMessage[order.deliveryStatus]}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    style={{display: order.deliveryStatus===0 ? 'inherit' : 'none'}}
                                                    onClick={event => this.updateDeliveryStatusTo1(event, order)}>
                                                    Ship
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    style={{display: order.deliveryStatus===0 ? 'inherit' : 'none'}}
                                                    onClick={event => this.cancelOrder(event, order.id)}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </Table>
                    </div>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.props.orders.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />

                </Paper>
            </Container>
        );
    }
}


function mapStateToProps(appState){
    return {
        orders: appState.orders
    }
}


export default connect(mapStateToProps, {getAllOrders, updateDeliveryStatusTo1, cancelOrder, sortOrders})(ManageOrders);
