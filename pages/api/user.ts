import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    station_code: number
    name: string
    profile_key: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await fetch("https://assessment.api.vweb.app/user", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    }).then(res => res.json()).then(result => res.status(200).json(result));
};