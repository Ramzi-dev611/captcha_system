import type { NextApiRequest, NextApiResponse } from 'next'

export type ChallengesResponseData = {
    id: string,
    statement: string,
    path: string[],
}

export default function handle (req: NextApiRequest, res: NextApiResponse) {
    const reponseData: ChallengesResponseData = {
        id: '54qsdjlkhfgfgkjh',
        statement: "select images of a cat",
        path: ['http://localhost:3000/images/cat2.jpg',
            'http://localhost:3000/images/cat3.jpg',
            'http://localhost:3000/images/cat.jpg',
            'http://localhost:3000/images/cat3.jpg',
            'http://localhost:3000/images/cat3.jpg',
            'http://localhost:3000/images/cat2.jpg',
            'http://localhost:3000/images/cat.jpg',
            'http://localhost:3000/images/cat.jpg',
            'http://localhost:3000/images/cat3.jpg',
        ]
    }
    res.status(200).json(reponseData)
}