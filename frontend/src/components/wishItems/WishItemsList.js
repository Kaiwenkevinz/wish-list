import  React, { Component } from  'react';
import Popup from "reactjs-popup";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// user defined
import WishItemForm from './WishItemForm';
import { getItems, deleteItems } from '../../actions/items'

export class WishItemsList extends Component {

    // static propTypes = {
    //     data: PropTypes.array.isRequired
    // }

    constructor() {
        super();

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
            itemsListLayout = items.map(item =>
                <tr key={item.id+'6'}>
                    <td key={item.id+item.name+'1'}>{item.name}</td>
                    <td key={item.id+item.wantness+'2'}>{wantnessOptions.filter(option => option.value == item.wantness)[0].label}</td>
                    <td key={item.id+item.price+'3'}>{item.price}</td>
                    <td key={item.id+item.date_created+'4'}>{item.date_created.slice(0,10)}</td>
                    <td key={item.id+item.result+'5'}>{item.result}</td>
                    <td key={item.id+"update"}>
                        <Popup trigger={<button type="button" className="btn btn-outline-primary">Update</button>} modal>
                            <WishItemForm item={item} options={wantnessOptions}/>
                        </Popup>
                    </td>
                    <td key={item.id+"delete"}><button type="button" className="btn btn-outline-danger" onClick = {() => this.handleDelete(item.id)}>Delete</button></td>
                </tr>
            )
        } catch(error) {
            console.log(error)
        }

        return (
            <div>
                <table  className="table">
                    <thead  key="thead">
                    <tr>
                        <th>Item</th>
                        <th>How bad do you want it?</th>
                        <th>Price</th>
                        <th>Date Created</th>
                        <th>Result</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {itemsListLayout}
                    </tbody>
                </table>
                {navigationLayout}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items.items
});

export default connect(mapStateToProps, { getItems, deleteItems })(WishItemsList);