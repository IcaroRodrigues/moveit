import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'
import { DarkModeContext } from '../contexts/DarkModeContext'
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {

  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext)
  const { darkModeIsActive } = useContext(DarkModeContext)
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completedChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }


  return (
    
    <div className={`${styles.challengeBoxContainer} ${darkModeIsActive ? `${styles.darkModeIsActive}` : ''}`}>
      { activeChallenge ? (
        <div className={`${styles.challengeActive} ${darkModeIsActive ? `${styles.darkModeIsActive}` : ''}`}>
          <header>Ganhe { activeChallenge.amount } xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{ activeChallenge.description }</p>
          </main>

          <footer>
            <button 
              type="button" 
              className={styles.challengeFailedButton} 
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            
            <button 
              type="button" 
              className={styles.challengeSucceededButton} 
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>

      ) : (
        <>
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up"/>
              Avance de level completando desafios.
            </p>
          </div>
        </>
      )}

    </div>
  )
}
