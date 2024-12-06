import React, { useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { questions } from '../../constants/database';
import QuestionCard from '../../components/QuestionCard';
import * as Progress from 'react-native-progress';

export default function Practice() {
  const { difficulty } = useLocalSearchParams();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const difficultyLevel = typeof difficulty === 'string' ? difficulty.toLowerCase() : (difficulty?.[0]?.toLowerCase() || '');
  const currentQuestions = (questions[difficultyLevel as keyof typeof questions] || []).map(
    ({ question, options, answer }) => ({
      question,
      options,
      correctAnswer: answer, // Map "answer" to "correctAnswer"
    })
  );
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
        <Button
          title="Go to Homepage"
          onPress={() => router.push('/')}
        />
      </View>
    );
  };

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
});
