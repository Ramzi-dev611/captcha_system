import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import unlabeledChallenge from "../../models/unlabeled_challenges.model";
import labeledChallenge from "../../models/labeled_challenge.model";
import statement from "../../models/statement"
dbConnect()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const catPictures = ["cat","cat2","cat3","cat4"]
    const hardCatPicture= "hardcat"
    const doggos =["dog","dog1","dog2","dog3"]
    const allPics=[hardCatPicture,...catPictures,...doggos]
    if(method ==="GET"){
        for(let i = 0; i<100; i ++){
            const collectedAnswers = Math.floor(Math.random()*5000)
            const numberOfPositive = Math.floor(Math.random()*collectedAnswers)
            const numberOfNegative = collectedAnswers- numberOfPositive
            const model = new unlabeledChallenge({
                statement: `select images of a ${i%2==0?"cat":"dog"}`,
                imagePath: `http://localhost:3000/images/${ Math.floor(collectedAnswers / numberOfNegative) > 4? allPics[Math.floor(Math.random()*allPics.length)] : i%2==0?hardCatPicture: "dog"}.png`,
                stats: {
                    numberOfCollectedAnswers: collectedAnswers,
                    numberOfPositive: numberOfPositive,
                    numberOfNegative: numberOfNegative,
                }
            })

            model.save();
            console.log("I saved a unlabeled data",i)
        }

        // adding labeled data
        for(let i = 0; i<50; i ++){
            const collectedAnswers = Math.floor(Math.random()*5000)
            const numberOfPositive = Math.floor(Math.random()*collectedAnswers)
            const numberOfNegative = collectedAnswers- numberOfPositive
            const model = new labeledChallenge({
                statement: "select images of a cat",
                imagePath: `http://localhost:3000/images/${ i % 2 == 0? catPictures[Math.floor(Math.random()*catPictures.length)]: doggos[Math.floor(Math.random()*doggos.length)]}.png`,
                stats: {
                    numberOfCollectedAnswers: collectedAnswers,
                    numberOfPositive: numberOfPositive,
                    numberOfNegative: numberOfNegative,
                    expectedLabel: i % 2 == 0
                }
            })
            model.save();
            console.log("I saved a labeled data",i)
        }

        for(let i = 0; i<50; i ++){
            const collectedAnswers = Math.floor(Math.random()*5000)
            const numberOfPositive = Math.floor(Math.random()*collectedAnswers)
            const numberOfNegative = collectedAnswers- numberOfPositive
            const model = new labeledChallenge({
                statement: "select images of a dog",
                imagePath: `http://localhost:3000/images/${ i % 2 == 0? catPictures[Math.floor(Math.random()*catPictures.length)]: doggos[Math.floor(Math.random()*doggos.length)]}.png`,
                stats: {
                    numberOfCollectedAnswers: collectedAnswers,
                    numberOfPositive: numberOfPositive,
                    numberOfNegative: numberOfNegative,
                    expectedLabel: i % 2 == 1
                }
            })
            model.save();
            console.log("I saved a labeled data",i)
        }

        const statement1 =new statement({
            statement : "select images of a cat"
        })
        const statement2 =new statement({
            statement : "select images of a dog"
        })
        statement1.save();
        statement2.save();
        res.status(200).json({message: "updated database"});
    }
}