import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import challengeStyles from '../styles/Home.module.css'
import type { ChallengesResponseData } from './api/challenges'

interface ChallengesInterface {
  path : string[]
  response: ChallengesResponseData
}

const Home: NextPage<ChallengesInterface> = ({ response }: {response: ChallengesResponseData}) => {
  const [imagesToggleState, setImagesToggleState] = useState([0,0,0,0,0,0,0,0,0]);
  
  const sendResponse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(props.challenges)
    console.log("response sent");
  }

  const toggleImage = (event: React.MouseEvent<HTMLDivElement>) => {
    
  }

  const { statement, path } = response;
  return (
    <div className={`${challengeStyles.challengeContainer}`+' card'}>
      <div className="card-header">
        <h2 className='text-center'>Human Interaction Detection</h2>
      </div>
      <div className="card-body">
        <h4 className="card-title mb-3">{ statement }</h4>
        <div className="row">
          { path.map((element, index) => 
           { return (
             <div className={challengeStyles.SelectableElement+" col-4"} key={index}>
            <Image src={element} width='150px' height='150px' alt={statement}/>
          </div>
           )}) 
        }
        </div>
        {/* <div className="row">
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat2.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat3.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat2.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
        </div>
        <div className="row">
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat2.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
        </div>
        <div className="row">
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat3.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat2.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
          <div className={challengeStyles.SelectableElement+" col"}>
            <Image src='/images/cat.jpg' width='150px' height='150px' alt='cat image'/>
          </div>
        </div> */}
        <div className='mt-3 '>
          <div className='d-flex justify-content-end mx-4'>
            <button onClick={sendResponse} className='btn btn-success px-4'>Verify</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const response: ChallengesResponseData = await (await fetch('http://localhost:3000/api/challenges')).json()
  return {
    props: {
      response
    }
  }
}

export default Home
