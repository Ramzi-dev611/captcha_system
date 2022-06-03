import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import challengeStyles from '../styles/Home.module.css'
import type { ChallengesResponseData } from './api/challenges'
import type { verifyResponse, verifyInput } from './api/verify'

interface ChallengesInterface {
  response: ChallengesResponseData,
  whichPage: number
}

const Home: NextPage<ChallengesInterface> = ({ response, whichPage }: {response: ChallengesResponseData, whichPage: number}) => {
  const [imagesToggleState, setImagesToggleState] = useState([false, false, false, false, false, false, false, false, false]);
  const [challenge,setChallenge] = useState(response);
  const [ pageSelector, setPageSelector ] = useState(whichPage)
  const [ message, setMessage ] = useState("")

  // This is so awefull needs to be changed but for nwo it does the job

  const resetGridStyle = () => {
    const selectedImages = document.getElementsByClassName(challengeStyles.toggeledImage);
    while (selectedImages.length > 0){
      selectedImages[0].classList.remove(challengeStyles.toggeledImage)
    }
  }
  
  const sendResponse = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(challenge.requestId)
    const requestBody: verifyInput = {
      requestId: challenge.requestId,
      responses: challenge.challenges?.map((ch, index) => ({ChallengeID: ch.challengeId||"", label: imagesToggleState[index]})) || []
    }
    const requestInfo: RequestInit = {
      method: 'POST',
      body: JSON.stringify(requestBody)
    }
    const response: verifyResponse = await (await fetch(`http://localhost:3000/api/verify`, requestInfo)).json()
    console.log(response)
    if (response.code ===2){ // this is a success in solving the challenge
      setPageSelector(2)
      setMessage(response.message)
    } else if(response.code ===1) {
      setPageSelector(3)
      setMessage(response.message)
    } else {
      setChallenge(response.newChallenge||{})
      setImagesToggleState([false, false, false, false, false, false, false, false, false])
      resetGridStyle()
    }
  }

  const toggleImage = (target: HTMLElement, index: number) => {
    imagesToggleState[index] = ! imagesToggleState[index];
    if(imagesToggleState[index]){
      target.classList.add(challengeStyles.toggeledImage);
    } else {
      target.classList.remove(challengeStyles.toggeledImage)
    }
  }
  const { statement, challenges } = challenge;
  if (pageSelector === 1){
    return (
      <div className={`${challengeStyles.challengeContainer}`+' card'}>
        <div className="card-header">
          <h2 className='text-center'>Human Interaction Detection</h2>
        </div>
        <div className="card-body">
          <h4 className="card-title mb-3">{ statement }</h4>
          <div className="row" id='grid-row'>
            { challenges?.map((element, index) => 
             { return (
               <div className={`${challengeStyles.SelectableElement} col-4`} key={index}>
              <Image src={element.path} onClick={(event) => {
                    event.preventDefault(); 
                    toggleImage(event.target as HTMLElement, index)
                    }} width='100%' 
                    height='100%' 
                    className='cursor-pointer' 
                    alt={statement}/>
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
  } else {
    const cardImageTop: string = (pageSelector === 2) ? '/thumbsup.png' : '/thumbsdown.png';
    const messageStyle: string = (pageSelector === 2) ? "alert alert-success" : "alert alert-danger"
        return (
      <div className={`${challengeStyles.challengeContainer}`+' card p-5'}>
      <Image className='card-image-top' width='10px' height="300px" alt="card image top" src={cardImageTop}></Image>
      <div className="card-body p-4 mt-5">
        <span className='w-inherit'>
          <h4 className={`${messageStyle}`}>{ message }</h4>
        </span>
      </div>
    </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const response: ChallengesResponseData | "" = await (await fetch('http://localhost:3000/api/challenges')).json()
  return {
    props: {
      response, 
      whichPage: 1
    }
  }
}

export default Home
