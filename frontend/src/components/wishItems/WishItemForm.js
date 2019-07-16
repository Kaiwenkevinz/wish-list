import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';

import { createItem, updateItem } from '../../actions/items'

class WishItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            wantness: '',
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWantnessChange = this.handleWantnessChange.bind(this);
    }

    componentDidMount() {
        let item = this.props.item;

        if (item) {
            this.setState({ wantness: item.wantness })
        }
    }

    handleWantnessChange(selectedOption) {
        this.setState({ wantness: selectedOption.value });
    }

    handleDateChange(date) {
        this.setState({ startDate: date });
    }

    handleCreate() {
        let item = {
            'name': this.refs.name.value,
            'wantness': this.state.wantness,
            'price': parseFloat(this.refs.price.value),
            'date_created': this.state.startDate,
            'result': this.refs.result.value,
        }
        this.props.createItem(item);
    }

    handleSubmit(event) {
        // event.preventDefault();
        window.location.reload();
        if (this.props.item) {
            let newItem = {
                'id': this.props.item.id,
                'name': this.refs.name.value,
                'wantness': this.state.wantness,
                'price': parseFloat(this.refs.price.value),
                'date_created': this.state.startDate,
                'result': this.refs.result.value,
            }
            this.props.updateItem(newItem);
        } else {
            this.handleCreate();
        }
    }

    render() {
        const item = this.props.item;
        const options = this.props.options;

        const nameLayout = (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                    {item ?
                        (<input type="text" className="form-control" ref='name' defaultValue={item.name} />) :
                        (<input type="text" className="form-control" ref='name' />)}
                </div>
            </div>
        );

        const wantnessLayout = (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">How bad do you want it?</label>
                <div className="col-sm-9">
                    {item ?
                        (<Select
                            options={options}
                            onChange={this.handleWantnessChange}
                            defaultValue={options.filter(option => option.value == item.wantness)}
                        />) :
                        (<Select
                            options={options}
                            onChange={this.handleWantnessChange}
                        />)}
                </div>
            </div>
        );

        const priceLayout = (
            <div className="form-group row">
                <div className="col-sm-3">Price</div>
                <div className="col-sm-9">
                    {item ?
                        (<input type="text" className="form-control" ref="price" defaultValue={item.price} />) :
                        (<input type="text" className="form-control" ref="price" />)}
                </div>
            </div>
        );

        const dateLayout = (
            <div className="form-group row">
                <div className="col-sm-3">Date</div>
                <div className="col-sm-9">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleDateChange}
                    />
                </div>
            </div>
        );

        const resultLayout = (
            <div className="form-group row">
                <div className="col-sm-3">Result</div>
                <div className="col-sm-9">
                    {item ?
                        (<input type="text" class="form-control" ref="result" defaultValue={item.result} />) :
                        (<input type="text" class="form-control" ref="result" />)}
                </div>
            </div>
        );

        const buttonsLayout = (
            <div className="form-group row">
                <div className="col-sm-10">
                    {item ?
                        (<button type="submit" className="btn btn-primary">Update</button>) :
                        (<button type="submit" className="btn btn-primary">Create</button>)}
                </div>
            </div>
        );

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {nameLayout}
                    {wantnessLayout}
                    {priceLayout}
                    {dateLayout}
                    {resultLayout}
                    {buttonsLayout}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items.items
});

export default connect(mapStateToProps, { createItem, updateItem })(WishItemForm);