import type {NextApiRequest, NextApiResponse} from 'next'

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

type My = {
    data: Array<Array<Data>>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<My>) {
    const cur = new Date();
    const array: Array<Array<Data>> = [[], [], []];
    await fetch("https://assessment.api.vweb.app/rides", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    }).then(res => res.json()).then(result => {
        result.forEach((item: Data) => {

            item.station_path.unshift(item.origin_station_code);
            item.station_path.push(item.destination_station_code);

            const it = new Date(item.date);
            if (cur.getDate() === it.getDate() && cur.getMonth() === it.getMonth() && cur.getFullYear() === it.getFullYear()) {
                array[0].push(item);
            } else if (cur.getFullYear() <= it.getFullYear() && cur.getMonth() <= it.getMonth() && cur.getDate() < it.getDate()) {
                array[1].push(item);
            } else {
                array[2].push(item);
            }
        })

        res.status(200).json({data: array});
    }).catch(console.log);
};