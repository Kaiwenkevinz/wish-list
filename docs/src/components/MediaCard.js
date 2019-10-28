// Material-UI
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';

import { deleteItems } from '../actions/items'
import WishItemForm from './wishItems/WishItemForm';

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


export default function MediaCard(props) {
    const wantnessOptions = [
        { value: 1, label: '不重要的东西，可以再等等' },
        { value: 2, label: '过几天看看' },
        { value: 3, label: '很想要也很需要' }
    ];

    const classes = useStyles();

    const onBtnItemDelete = id => {
      console.log("click")
      props.func(id)
    }

    const item = props
    console.log(item);
    const name = item.item.name;
    const date = item.item.date_created.substring(0,10);
    const price = item.item.price;
    const result = item.item.result;
    const img_url = item.item.img_url

    return (
      <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image = {img_url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             {name} 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <img className="item-detail-Image" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" /> {price} 
              <br/>
              <img className="item-detail-Image" src="https://img.icons8.com/material-sharp/24/000000/date-from.png" /> {date}
              <br/>
              <img className="item-detail-Image" src="https://img.icons8.com/ios-glyphs/30/000000/test-results.png" /> {result}
              <br />
            </Typography>
          </CardContent>
        <CardActions>
            <Popup trigger={<Button size="small" color="primary">Update</Button>} modal>
                <WishItemForm options={wantnessOptions} item={item.item}/>
            </Popup>
          <Button size="small" color="primary" onClick={() => onBtnItemDelete(item.item.id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }