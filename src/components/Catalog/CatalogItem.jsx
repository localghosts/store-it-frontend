import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function CatalogItem(props) {
    return (

        <Button onClick={() => { alert('clicked'); }}>
            <Card sx={{ maxWidth: 345, height: 300, backgroundColor: '#D3D3D3' }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={props.store.imgDir}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.store.name}
                    </Typography>
                    <Typography variant='caption' paragraph={true} color="text.primary">
                        {props.store.description}
                    </Typography>
                </CardContent>

            </Card >
        </Button>
    );
};