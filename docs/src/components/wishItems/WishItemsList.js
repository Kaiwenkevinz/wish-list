import  React, { Component } from  'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material-UI
import NestedGrid from './../NestedGrid';
import Container from '@material-ui/core/Container';

// user defined
import WishItemForm from './WishItemForm';
import { getItems, deleteItems } from '../../actions/items'

// const API_URL = 'https://wishlist-backend-server.herokuapp.com';
const API_URL = 'http://127.0.0.1:8000';
 
export class WishItemsList extends Component {
    constructor() {
        super();
        this.state = {
            uploadData: {
                token: null,
                key: null
            }
        }

        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.props.getItems();
    }

    nextPage() {
        this.props.getItems(this.props.items['next page']);
    }

    previousPage() {
        this.props.getItems(this.props.items['previous page']);
    }

    handleDelete(id) {
        this.props.deleteItems(id);
    }

    render() {
        const wantnessOptions = [
            { value: 1, label: '不重要的东西，可以再等等' },
            { value: 2, label: '过几天看看' },
            { value: 3, label: '很想要也很需要' }
        ];

        const navigationLayout = (
            <div className="nav-buttons">
                <Popup trigger={<button type="button" className="btn btn-outline-info">Add</button>} modal>
                    <WishItemForm options={wantnessOptions}/>
                </Popup>
                <div className="page-buttons">
                    <button type="button" className="btn btn-outline-primary" onClick = {(e) => this.previousPage(e)}>Prev</button>
                    <button type="button" className="btn btn-outline-primary" onClick = {(e) => this.nextPage(e)}>Next</button>
                </div>
            </div>
        );
        
        let items = null;
        let itemsListLayout = null;

        try {
            items = this.props.items.data;
            let props = {
                items: items,
                func: this.props.deleteItems
            }
            if (items != null) {
                itemsListLayout = <NestedGrid props={props}/>;
            }
         } catch(error) {
            console.log(error)
        }

        return (
            <div>
                <Container className="grid-container" maxWidth="md">
                    {itemsListLayout}
                </Container>    
                {navigationLayout}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items.items
});

export default connect(mapStateToProps, { getItems, deleteItems })(WishItemsList);