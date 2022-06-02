import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import challengeStyles from '../styles/Home.module.css'
import type { ChallengesResponseData } from './api/challenges'

interface ChallengesInterface {
  response: ChallengesResponseData
}

const Home: NextPage<ChallengesInterface> = ({ response }: {response: ChallengesResponseData}) => {
  const [imagesToggleState, setImagesToggleState] = useState([false, false, false, false, false, false, false, false, false]);
  
  const sendResponse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const toggleImage = (target: HTMLElement, index: number) => {
    imagesToggleState[index] = ! imagesToggleState[index];
    if(imagesToggleState[index]){
      target.classList.add(challengeStyles.toggeledImage);
      console.log(target.classList)
    } else {
      target.classList.remove(challengeStyles.toggeledImage)
      console.log(target.classList)
    }
  }


  const { statement, challenges } = response;
  console.log(response);
  return (
    <div className={`${challengeStyles.challengeContainer}`+' card'}>
      <div className="card-header">
        <h2 className='text-center'>Human Interaction Detection</h2>
      </div>
      <div className="card-body">
        <h4 className="card-title mb-3">{ statement }</h4>
        <div className="row">
          { challenges?.map((element, index) => 
           { return (
             <div className={`${challengeStyles.SelectableElement} col-4`} onClick={(event) => {event.preventDefault(); toggleImage(event.target as HTMLElement, index)}} key={index}>
            <Image src={element.path} width='150px' height='150px' className='cursor-pointer' alt={statement}/>
          </div>
           )}) 
        }
        </div>
        <div className='mt-3'>
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
