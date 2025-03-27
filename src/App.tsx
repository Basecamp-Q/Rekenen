import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #e8f4e8;
  min-height: 100vh;
  background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="%23000" style="opacity:0.1"/></svg>');
  background-size: 50px 50px;
`;

const Title = styled.h1`
  color: #2E7D32;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
`;

const GameContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 3px solid #4CAF50;
`;

const Problem = styled.div`
  font-size: 2em;
  margin: 20px 0;
  color: #1B5E20;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="%234CAF50" style="opacity:0.1"/></svg>') center/contain no-repeat;
  padding: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
`;

const Input = styled.input`
  font-size: 1.5em;
  padding: 10px;
  width: 180px;
  text-align: center;
  border: 2px solid #4CAF50;
  border-radius: 5px;
  margin: 10px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  &:focus {
    outline: none;
    border-color: #2E7D32;
    box-shadow: 0 0 5px #4CAF50;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.1s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  
  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Score = styled.div`
  font-size: 1.2em;
  color: #1B5E20;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;

  &::before {
    content: "⚽";
  }
`;

const DifficultySelector = styled.div`
  margin: 20px 0;
`;

const CategoryBadge = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  margin: 10px 0;
  font-size: 1.2em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;

  &::before {
    content: "⚽";
    margin-right: 8px;
  }

  &::after {
    content: "⚽";
    margin-left: 8px;
  }
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  font-size: 1.5em;
  margin: 10px 0;
  animation: bounce 0.5s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const ProgressContainer = styled.div`
  margin: 20px auto;
  width: 80%;
  max-width: 400px;
  background: #e0e0e0;
  border-radius: 10px;
  padding: 5px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  border: 2px solid #4CAF50;
`;

const ProgressField = styled.div`
  width: 100%;
  height: 30px;
  background: repeating-linear-gradient(
    45deg,
    #4CAF50,
    #4CAF50 10px,
    #45a049 10px,
    #45a049 20px
  );
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const ProgressBall = styled.div<{ progress: number }>`
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: ${props => (props.progress * 100)}%;
  transform: translateX(-50%);
  transition: left 0.5s ease;
  
  &::before {
    content: "⚽";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
`;

const ProgressText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1.1em;
  color: #2E7D32;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const ProgressGoals = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 15px;
  font-size: 0.9em;
  color: #2E7D32;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
`;

function App() {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0, operator: '+', type: 'normal' });
  const [userAnswer, setUserAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [showSuccess, setShowSuccess] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  const generateProblem = useCallback(() => {
    let maxNum;
    let num1, num2, operator, type;
    const operators = ['+', '-', '×', '÷', '%'];
    
    switch (difficulty) {
      case 'easy': // Pupillen
        maxNum = 20;
        operator = operators[Math.floor(Math.random() * 3)]; // Alleen +, - en ×
        num1 = Math.floor(Math.random() * maxNum) + 1;
        num2 = Math.floor(Math.random() * maxNum) + 1;
        
        // Zorg dat aftrekken geen negatief getal oplevert
        if (operator === '-' && num2 > num1) {
          [num1, num2] = [num2, num1];
        }
        
        // Maak vermenigvuldigen makkelijker
        if (operator === '×') {
          num2 = Math.floor(Math.random() * 10) + 1;
        }
        
        type = 'normal';
        break;

      case 'medium': // Junioren
        maxNum = 100;
        operator = operators[Math.floor(Math.random() * 4)]; // Nu ook ÷ erbij
        
        if (operator === '÷') {
          // Maak deelsommen die op heel getal uitkomen
          num2 = Math.floor(Math.random() * 10) + 2; // deler tussen 2 en 11
          num1 = num2 * (Math.floor(Math.random() * 10) + 1); // vermenigvuldig met getal tussen 1 en 10
        } else {
          num1 = Math.floor(Math.random() * maxNum) + 1;
          num2 = Math.floor(Math.random() * maxNum) + 1;
          
          if (operator === '-' && num2 > num1) {
            [num1, num2] = [num2, num1];
          }
          
          if (operator === '×') {
            num2 = Math.floor(Math.random() * 12) + 1; // Tafels t/m 12
          }
        }
        
        // 25% kans op een breuksom
        if (Math.random() < 0.25) {
          type = 'fraction';
          num1 = Math.floor(Math.random() * 8) + 2; // noemer tussen 2 en 9
          operator = 'breuk';
        } else {
          type = 'normal';
        }
        break;

      case 'hard': // Champions League
        maxNum = 1000;
        operator = operators[Math.floor(Math.random() * operators.length)]; // Alle operatoren
        
        if (operator === '%') {
          // Percentagesommen
          const percentages = [10, 20, 25, 50, 75];
          num1 = Math.floor(Math.random() * 200) + 1; // Getal tussen 1 en 200
          num2 = percentages[Math.floor(Math.random() * percentages.length)];
        } else if (operator === '÷') {
          num2 = Math.floor(Math.random() * 12) + 2; // deler tussen 2 en 13
          num1 = num2 * (Math.floor(Math.random() * 20) + 1); // vermenigvuldig met getal tussen 1 en 20
        } else {
          num1 = Math.floor(Math.random() * maxNum) + 1;
          num2 = Math.floor(Math.random() * maxNum) + 1;
          
          if (operator === '-' && num2 > num1) {
            [num1, num2] = [num2, num1];
          }
          
          if (operator === '×') {
            num2 = Math.floor(Math.random() * 20) + 1; // Grotere tafels
          }
        }
        
        // 33% kans op een breuksom
        if (Math.random() < 0.33) {
          type = 'fraction';
          num1 = Math.floor(Math.random() * 8) + 2; // noemer tussen 2 en 9
          operator = 'breuk';
        } else {
          type = operator === '%' ? 'percentage' : 'normal';
        }
        break;

      default:
        maxNum = 20;
        num1 = Math.floor(Math.random() * maxNum) + 1;
        num2 = Math.floor(Math.random() * maxNum) + 1;
        operator = '+';
        type = 'normal';
    }

    setCurrentProblem({ num1, num2, operator, type });
    setUserAnswer('');
    setShowSuccess(false);
  }, [difficulty]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const getFootballMessage = (consecutive: number) => {
    if (consecutive === 3) return "Hattrick! 🎩⚽";
    if (consecutive === 5) return "Wat een topscorer ben jij! 🏆";
    if (consecutive === 10) return "Je bent een echte Messi! 🐐";
    return "GOAAAL! ⚽";
  };

  const checkAnswer = () => {
    let correctAnswer;
    let userGuess = parseFloat(userAnswer);

    switch (currentProblem.type) {
      case 'percentage':
        correctAnswer = (currentProblem.num1 * currentProblem.num2) / 100;
        break;
      case 'fraction':
        correctAnswer = 1 / currentProblem.num1;
        // Rond af op 2 decimalen voor breuken
        if (Math.abs(userGuess - correctAnswer) < 0.01) {
          userGuess = correctAnswer;
        }
        break;
      default:
        switch (currentProblem.operator) {
          case '+':
            correctAnswer = currentProblem.num1 + currentProblem.num2;
            break;
          case '-':
            correctAnswer = currentProblem.num1 - currentProblem.num2;
            break;
          case '×':
            correctAnswer = currentProblem.num1 * currentProblem.num2;
            break;
          case '÷':
            correctAnswer = currentProblem.num1 / currentProblem.num2;
            break;
          default:
            correctAnswer = 0;
        }
    }

    if (userGuess === correctAnswer) {
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      setScore(score + 1);
      setShowSuccess(true);
      setTimeout(generateProblem, 1500);
    } else {
      setConsecutiveCorrect(0);
      alert('Dat is niet helemaal goed. Probeer het nog een keer! 💪');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'easy':
        return 'Pupillen';
      case 'medium':
        return 'Junioren';
      case 'hard':
        return 'Champions League';
      default:
        return 'Pupillen';
    }
  };

  const getProgressMessage = (consecutive: number) => {
    if (consecutive === 0) return "Begin je reeks!";
    if (consecutive < 3) return "Goed bezig!";
    if (consecutive < 5) return "Op weg naar een hattrick!";
    if (consecutive < 8) return "Je bent in topvorm!";
    if (consecutive < 10) return "Bijna een Messi!";
    return "Je bent een voetballegende! 🏆";
  };

  return (
    <AppContainer>
      <Title>Jip's oefensommen</Title>
      <DifficultySelector>
        <Button onClick={() => setDifficulty('easy')}>Pupillen</Button>
        <Button onClick={() => setDifficulty('medium')}>Junioren</Button>
        <Button onClick={() => setDifficulty('hard')}>Champions League</Button>
      </DifficultySelector>
      <CategoryBadge>
        Je speelt nu in: {getDifficultyLabel()}
      </CategoryBadge>
      <ProgressContainer>
        <ProgressField>
          <ProgressBall progress={consecutiveCorrect / 10} />
        </ProgressField>
        <ProgressText>
          {getProgressMessage(consecutiveCorrect)}
        </ProgressText>
        <ProgressGoals>
          <span>Start</span>
          <span>Hattrick</span>
          <span>Topscorer</span>
          <span>Messi</span>
        </ProgressGoals>
      </ProgressContainer>
      <GameContainer>
        <Problem>
          {currentProblem.type === 'percentage' ? (
            `${currentProblem.num2}% van ${currentProblem.num1} = ?`
          ) : currentProblem.type === 'fraction' ? (
            `Wat is 1/${currentProblem.num1} als decimaal getal?`
          ) : (
            `${currentProblem.num1} ${currentProblem.operator} ${currentProblem.num2} = ?`
          )}
        </Problem>
        <Input
          type="number"
          step="0.01"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Antwoord"
        />
        <div>
          <Button onClick={checkAnswer}>Controleer</Button>
          <Button onClick={generateProblem}>Nieuwe som</Button>
        </div>
        {showSuccess && (
          <SuccessMessage>
            {getFootballMessage(consecutiveCorrect)}
          </SuccessMessage>
        )}
      </GameContainer>
      <Score>Score: {score}</Score>
    </AppContainer>
  );
}

export default App; 