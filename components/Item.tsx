import React, {FunctionComponent} from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

interface Props {
    id: number
    origin_station_code: number
    station_path: Array<number>
    destination_station_code: number
    date: Date
    map_url: string
    state: string
    city: string
    distance: number
}

const Item: FunctionComponent<Props> = (props) => {
    return (
        <Card sx={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: '100%',
            px: 3, py: 2, m: 2,
        }}>
            <CardMedia sx={{flexGrow: 0, height: '148px', width: '296px',}}
                component="img"
                image={props.map_url}
                alt={props.city}
            />

            <CardContent sx={{flexGrow: 2, mx: 2}}>
                Ride Id: <strong>{props.id}</strong>
                <br/>
                Origin station: <strong>{props.origin_station_code}</strong>
                <br/>
                Station Path: <strong> {"[" + (props.station_path.toString()) + "]"} </strong>
                <br/>
                Date: <strong>{props.date}</strong>
                <br/>
                Distance: <strong>{props.distance}</strong>
            </CardContent>

            <CardContent sx={{flexGrow: 0, display: 'flex', justifyContent: 'center'}}>
                <Typography component={"span"} sx={{p: 2, borderRadius: '5px'}}>
                    {props.city}
                </Typography>

                <Typography component={"span"} sx={{p: 2, borderRadius: '5px'}}>
                    {props.state}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Item;