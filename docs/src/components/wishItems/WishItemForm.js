import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';

import axios from 'axios';
import { Upload } from 'antd';
import { Button } from 'antd';
import { Icon} from 'antd';
import 'antd/dist/antd.css'

import { createItem, updateItem } from '../../actions/items'
import './index.css';

// const API_URL = 'https://wishlist-backend-server.herokuapp.com';
const API_URL = 'http://127.0.0.1:8000';

class WishItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img_url: null,
            startDate: new Date(),
            wantness: '',
            uploadData: {
                token: null,
                key: null
            }
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWantnessChange = this.handleWantnessChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this)
        this.handleAvatarChange = this.handleAvatarChange.bind(this)
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
            'img_url': this.state.img_url
        }
        console.log("handleCreate")
        console.log(item)
        this.props.createItem(item);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.props.item) {
            let newItem = {
                'id': this.props.item.id,
                'name': this.refs.name.value,
                'wantness': this.state.wantness,
                'price': parseFloat(this.refs.price.value),
                'date_created': this.state.startDate,
                'result': this.refs.result.value,
                'img_url': this.state.img_url
            }
            console.log("handlesubmit")
            console.log(newItem)
            this.props.updateItem(newItem);
        } else {
            this.handleCreate();
        }
    }

    handleAvatarChange(info) {
        console.log("handleAvatarChange")

        if (info.file.status === 'done'){
            console.log(info.file)
            const img_url = `http://pzvxbm20p.bkt.clouddn.com/${info.file.response.key}`
            console.log(img_url)
            this.setState({
                img_url: img_url
            })
        } else {
            console.log(info.file.response)
        }
    }

    async fetchKey(name) {
        this.setState({
            uploadData: {
                ...this.state.uploadData,
                key: name
            }
        })
        // console.log("1. fetchUploadToken key: " + this.state.uploadData.key)
    }

    async fetchUploadToken() {
        await axios({
            url: `${API_URL}/qiniu/token/`,
            method:'get',   
            params: {
                key: this.state.uploadData.key
                }  
            })
            .then(res=>{
                this.setState({
                    uploadData: {
                        ...this.state.uploadData,
                        token: res.data
                    }
                })
                // console.log("2. fetchUploadToken token: " + this.state.uploadData)
            }).catch(err=>{
                console.log(err)
            })
    }

    async beforeUpload(file) {
        console.log("beforeupload")
        await this.fetchKey(file.name)
        await this.fetchUploadToken()
    }

    render() {
        const item = this.props.item;
        const options = this.props.options;

        console.log(item)
        const imgLayout = (
            <div>
                {item || this.state.img_url ?
                    (<div className="form-img-preview"> 
                        <img src={this.state.img_url} height="200" width="200"/>
                    </div>) :
                    (
                        <Upload 
                            name="file"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            action="https://upload-z2.qiniup.com"
                            data={this.state.uploadData}
                            onChange={this.handleAvatarChange}
                            >
                                <Button>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                        </Upload>
                    )
                }
            </div>
        )

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
                    {imgLayout}
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