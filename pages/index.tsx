import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import challengeStyles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={`${challengeStyles.challengeContainer}`+' card'}>
        <div className="card-header">
          <h2 className='text-center'>Human Interaction Detection</h2>
        </div>
        <div className="card-body">
          <h4 className="card-title mb-3">Select an image containing a cat</h4>
          <div className="row">
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
          </div>
          <div className='mt-3 '>
            <div className='d-flex justify-content-end mx-4'>
              <button className='btn btn-success px-4'>Verify</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  return {
    props: {

    }
  }
}

export default Home
