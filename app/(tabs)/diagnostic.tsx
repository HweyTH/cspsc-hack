import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { questions } from '../../constants/database';
import QuestionCard from '../../components/QuestionCard';
import * as Progress from 'react-native-progress';

export default function Diagnostic() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Randomize the questions from different difficulty levels
  const getRandomizedQuestions = () => {
    const easyQuestions = questions.easy || [];
    const mediumQuestions = questions.medium || [];
    const hardQuestions = questions.hard || [];

    // Calculate the number of questions based on the percentages
    const easyCount = Math.floor(easyQuestions.length * 0.5);
    const mediumCount = Math.floor(mediumQuestions.length * 0.3);
    const hardCount = Math.floor(hardQuestions.length * 0.2);

    // Randomize the questions from each difficulty level
    const randomEasy = easyQuestions.sort(() => Math.random() - 0.5).slice(0, easyCount);
    const randomMedium = mediumQuestions.sort(() => Math.random() - 0.5).slice(0, mediumCount);
    const randomHard = hardQuestions.sort(() => Math.random() - 0.5).slice(0, hardCount);

    // Combine the questions and shuffle them
    const randomizedQuestions = [...randomEasy, ...randomMedium, ...randomHard].sort(() => Math.random() - 0.5);
    
    return randomizedQuestions.map(({ question, options, answer }) => ({
      question,
      options,
      correctAnswer: answer,
    }));
  };

  const currentQuestions = getRandomizedQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return;
    }

    setSelectedAnswer(selectedAnswer);
  
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset the selected answer for the next question
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    const totalQuestions = currentQuestions.length;
    return (correctAnswers / totalQuestions) * 100;
  };

  const diagnoseLevel = () => {
    const score = calculateScore();
    if (score >= 80) return 'Expert';
    if (score >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const renderResults = () => {
    const score = calculateScore();
    const level = diagnoseLevel();
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Test Results</Text>
        <Text style={styles.scoreText}>{score.toFixed(0)}%</Text>
        <Text style={styles.levelText}>Level: {level}</Text>
        <Progress.Circle
          style={styles.progressBar}
          progress={score / 100}
          size={120}
          showsText={true}
          thickness={10}
        />
        <Text style={styles.resultMessage}>
          {level === 'Expert' ? 'You are a Pro!' : level === 'Intermediate' ? 'Good Job!' : 'Keep Practicing!'}
        </Text>
        <Button
          title="Go to Homepage"
          onPress={() => router.push('/')}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Let's see how good you are right now!</Text>
      {!isFinished ? (
        <>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {currentQuestions.length}
          </Text>
          <QuestionCard
            question={currentQuestion}
            onAnswer={(isCorrect, answer) => handleAnswer(isCorrect, answer)}
            selectedAnswer={selectedAnswer}
          />
          <Text style={styles.correctAnswers}>
            Correct Answers: {correctAnswers} / {currentQuestions.length}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Next Question"
              onPress={handleNextQuestion}
              disabled={!answeredQuestions.includes(currentQuestionIndex)} // Enable after answering
            />
          </View>
        </>
      ) : (
        renderResults()
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correctAnswers: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  resultMessage: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  progressBar: {
    marginTop: 20,
  },
});
