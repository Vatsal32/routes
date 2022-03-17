import React from "react";
import Item from "./Item";

type Data = {
    id: number
    origin_station_code: number
    station_path: Array<number>
    destination_station_code: number
    date: Date
    map_url: string
    state: string
    city: string
};

interface Props {
    items: Array<Data>
    listCity: {[key: string]: number}
    city: string
}

function dist(arr: Array<number>, dst: number): number {
    let ans = 100000;

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(arr[i] - dst) < ans) {
            ans = Math.abs(arr[i] - dst);
        }
    }

    return ans;
}

const Panel: React.FC<Props> = (props) => {
    let i = 0;
    return (
        <>
            {
                props.items.map((item) => (
                    <Item key={i++} {...item} distance={dist(item.station_path, props.listCity[props.city])}/>
                ))
            }
        </>
    );
}

export default Panel