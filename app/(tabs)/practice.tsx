import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { questions } from '../../constants/database';
import QuestionCard from '../../components/QuestionCard';
import * as Progress from 'react-native-progress';  

export default function Practice() {
  const { difficulty } = useLocalSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const difficultyLevel = typeof difficulty === 'string' ? difficulty.toLowerCase() : (difficulty?.[0]?.toLowerCase() || '');
  const currentQuestions = questions[difficultyLevel as keyof typeof questions] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleNextQuestion = (isCorrect: boolean) => {
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return; // Prevent answering the same question multiple times
    }

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateScore = () => {
    const totalQuestions = currentQuestions.length;
    return (correctAnswers / totalQuestions) * 100;
  };

  const renderResults = () => {
    const score = calculateScore();
    const isPass = score >= 80;
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Test Results</Text>
        <Text style={styles.scoreText}>{score.toFixed(0)}%</Text>
        <Progress.Circle
          style={styles.progressBar}
          progress={score / 100}
          size={120}
          showsText={true}
          thickness={10}
        />
        <Text style={styles.resultMessage}>
          {isPass ? 'You Passed!' : 'You Failed. Try Again!'}
        </Text>
      </View>
    );
  };

  // Handle invalid or missing difficulty
  if (!difficulty || !['easy', 'medium', 'hard'].includes(difficultyLevel || '')) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Invalid or Missing Difficulty</Text>
        <Text style={styles.errorText}>Please select a valid difficulty level.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Practice Test</Text>
      {currentQuestions.length > 0 ? (
        <>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {currentQuestions.length}
          </Text>
          <QuestionCard
            question={currentQuestion}
            onAnswer={(isCorrect) => handleNextQuestion(isCorrect)}
          />
          <Text style={styles.correctAnswers}>
            Correct Answers: {correctAnswers} / {currentQuestions.length}
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Next Question" onPress={() => handleNextQuestion(false)} />
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  resultMessage: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  progressBar: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});
