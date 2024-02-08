import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
axios.defaults.withCredentials = true
const Test = () => {
    const questions = [
        {
            id: 1,
            question: 'What does a red traffic light mean?',
            options: ['Stop', 'Go', 'Slow down'],
            correctAnswer: 'Stop'
        },
        {
            id: 2,
            question: 'What does a yield sign mean?',
            options: ['Slow down', 'Merge', 'Give way to other traffic'],
            correctAnswer: 'Give way to other traffic'
        },
        {
            id: 3,
            question: 'What does a yellow traffic light mean?',
            options: ['Speed up', 'Prepare to stop', 'Continue with caution'],
            correctAnswer: 'Prepare to stop'
        },
        {
            id: 4,
            question: 'What does a green arrow traffic light mean?',
            options: ['Stop', 'Go straight only', 'Go in the direction of the arrow'],
            correctAnswer: 'Go in the direction of the arrow'
        },
        {
            id: 5,
            question: 'What does a white rectangular sign with black lettering indicate?',
            options: ['School zone', 'Speed limit', 'Regulatory information'],
            correctAnswer: 'Regulatory information'
        },
        {
            id: 6,
            question: 'What does a sign with two arrows pointing in opposite directions indicate?',
            options: ['One-way street', 'No passing zone', 'Two-way traffic'],
            correctAnswer: 'Two-way traffic'
        },
        {
            id: 7,
            question: 'What is the maximum speed limit in a residential area in most states?',
            options: ['20 mph', '25 mph', '30 mph'],
            correctAnswer: '25 mph'
        },
        {
            id: 8,
            question: 'What should you do if your vehicle starts to hydroplane?',
            options: ['Brake suddenly', 'Accelerate', 'Ease off the gas and steer in the direction you want to go'],
            correctAnswer: 'Ease off the gas and steer in the direction you want to go'
        },
        {
            id: 9,
            question: 'When should you use your headlights?',
            options: ['Only at night', 'When it is raining', 'All the time'],
            correctAnswer: 'Only at night'
        },
        {
            id: 10,
            question: 'What should you do if you encounter a large animal crossing the road?',
            options: ['Brake immediately', 'Swerve to avoid the animal', 'Slow down and be prepared to stop'],
            correctAnswer: 'Slow down and be prepared to stop'
        },
        {
            id: 11,
            question: 'What is the purpose of a roundabout?',
            options: ['To increase traffic flow', 'To slow down traffic', 'To eliminate the need for traffic lights'],
            correctAnswer: 'To increase traffic flow'
        },
        {
            id: 12,
            question: 'What is the correct hand signal for indicating a left turn?',
            options: ['Left hand and arm extended upward', 'Right hand and arm extended horizontally', 'Left hand and arm extended horizontally'],
            correctAnswer: 'Left hand and arm extended horizontally'
        },
        {
            id: 13,
            question: 'When should you use your hazard lights?',
            options: ['When driving at night', 'When double-parked', 'When you need to warn other drivers of a hazard'],
            correctAnswer: 'When you need to warn other drivers of a hazard'
        },
        {
            id: 14,
            question: 'What should you do if you miss your exit on the highway?',
            options: ['Reverse and go back', 'Continue to the next exit', 'Stop and wait for assistance'],
            correctAnswer: 'Continue to the next exit'
        },
        {
            id: 15,
            question: 'What is the minimum distance you should maintain from the vehicle ahead of you?',
            options: ['One car length', 'Two seconds', 'Five feet'],
            correctAnswer: 'Two seconds'
        },
        {
            id: 16,
            question: 'What does a red triangle sign mean?',
            options: ['Stop sign ahead', 'Yield sign ahead', 'Roadwork or maintenance ahead'],
            correctAnswer: 'Roadwork or maintenance ahead'
        },
        {
            id: 17,
            question: 'What does a red X over a lane indicate on a highway?',
            options: ['That the lane is closed', 'That the lane is reserved for emergency vehicles', 'That the lane is a carpool lane'],
            correctAnswer: 'That the lane is closed'
        },
        {
            id: 18,
            question: 'When approaching a railroad crossing, when should you stop?',
            options: ['Only if you see a train coming', 'If the crossing arms are down or the warning lights are flashing', 'Never'],
            correctAnswer: 'If the crossing arms are down or the warning lights are flashing'
        },
        {
            id: 19,
            question: "What should you do if your vehicle's brakes fail?",
            options: ['Pump the brakes repeatedly', 'Shift to a lower gear', 'Use the parking brake and slow down gradually'],
            correctAnswer: 'Shift to a lower gear'
        },
        {
            id: 20,
            question: 'What is the purpose of a rumble strip on the side of the road?',
            options: ['To alert drivers when they are veering off the road', 'To reduce road noise', 'To improve traction in wet conditions'],
            correctAnswer: 'To alert drivers when they are veering off the road'
        }
    ];
    const [finalScore, setFinalscore] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(100); // 5 minutes in seconds
    const [questionStatus, setQuestionStatus] = useState([]); // Array to track question status
    const [passed, setPassed] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    submitTest(); // Automatically submit the test when time runs out
                    if (score > 0) {
                        setPassed(true)
                    }
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        updateQuestionStatus(); // Update question status when moving to the next question

        setSelectedOption('');
        if (currentQuestionIndex === questions.length - 1) {
            setIsQuizCompleted(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const updateQuestionStatus = () => {
        const updatedStatus = [...questionStatus];
        updatedStatus[currentQuestionIndex] = {
            id: questions[currentQuestionIndex].id,
            visited: true,
            correct: selectedOption === questions[currentQuestionIndex].correctAnswer ? 1 : 0
        };
        setQuestionStatus(updatedStatus);
    };

    const submitTest = () => {
        setIsQuizCompleted(true);
        questionStatus.forEach(status => {
            if (status && status.correct === 1) {
                setFinalscore(finalScore + 1);
            }
        });
    };

    return (
        <Box minHeight="100vh" display="" className="p-3" flexDirection="column" alignItems="center" justifyContent="center" sx={{ background: "#00000026" }}>
            <Typography variant="body1 bg-white p-2 ">Time Remaining: {formatTime(remainingTime)}</Typography>
            {isQuizCompleted ? (
                <div className=' bg-white p-3'>
                    <Typography variant="h4">Quiz Completed!</Typography>
                    <Typography variant="h6">Your Score: {score}/{questions.length}</Typography>
                    <Typography variant="h6">{passed ? <div className='text-success p-1'>Congratulations! you passed the test. Procced to take your license... <a href='/create-license'><button className='btn btn-success'>Procced</button></a></div> : <div className='text-danger p-1 fs-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg>
                        &nbsp;Sorry You are not eligible for license <a href='/home'><button className='btn btn-primary fw-bold mx-2'>Home</button></a></div>}</Typography>
                </div>
            ) : (
                <div className=' bg-white p-3'>
                    <Typography variant="h5">Question {currentQuestionIndex + 1} of {questions.length}</Typography>
                    <Typography variant="h6">{questions[currentQuestionIndex].question}</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <FormControlLabel key={index} value={option.toString()} control={<Radio />} label={option} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Box mt={4}>
                        <Button variant="contained" color="primary" onClick={handleNextQuestion}>{currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}</Button>
                    </Box>
                </div>
            )}
        </Box>
    );
}

export default Test;
