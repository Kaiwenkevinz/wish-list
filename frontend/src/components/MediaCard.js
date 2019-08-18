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

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


  export default function MediaCard(item) {
    const classes = useStyles();

    console.log(item);
    const name = item.item.name;
    const date = item.item.date_created.substring(0,10);
    const price = item.item.price;
    const result = item.item.result;

    return (
      <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="https://i.ibb.co/41TKn4Y/money-pic.jpg"
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
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }