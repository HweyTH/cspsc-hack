import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Easing } from 'react-native';

interface QuestionCardProps {
  question: { question: string; options: string[]; correctAnswer: string };
  onAnswer: (isCorrect: boolean, answer: string) => void;
  selectedAnswer: string | null;
}

export default function QuestionCard({ question, onAnswer, selectedAnswer }: QuestionCardProps) {
  const [animation] = useState(new Animated.Value(0));

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return; // Prevent changing the answer once selected

    const isCorrect = option === question.correctAnswer;
    onAnswer(isCorrect, option);

    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const feedbackColor = selectedAnswer
    ? selectedAnswer === question.correctAnswer
      ? 'green'
      : 'red'
    : 'transparent';

  const opacityStyle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, index) => {
        const isSelected = option === selectedAnswer;
        const isCorrect = option === question.correctAnswer;
        return (
          <View key={index} style={styles.optionContainer}>
            <Button
              title={option}
              onPress={() => handleAnswer(option)}
              color={selectedAnswer ? 'gray' : '#007bff'}
              disabled={selectedAnswer !== null}  // Disable options after answering
            />
            {isSelected && !isCorrect && (
              <Text style={styles.incorrectAnswer}>✘</Text>
            )}
            {isSelected && isCorrect && (
              <Text style={styles.correctAnswer}>✔</Text>
            )}
          </View>
        );
      })}
      {selectedAnswer && (
        <Animated.View style={[styles.answerContainer, { opacity: opacityStyle }]}>
          <Text style={[styles.answer, { color: feedbackColor }]}>
            {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect!"}
          </Text>
          {selectedAnswer !== question.correctAnswer && (
            <Text style={styles.correctAnswerText}>
              The correct answer is: {question.correctAnswer}
            </Text>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionContainer: {
    marginVertical: 5,
  },
  incorrectAnswer: {
    position: 'absolute',
    top: 10,
    left: 0,
    fontSize: 24,
    color: 'red',
  },
  correctAnswer: {
    position: 'absolute',
    top: 10,
    left: 0,
    fontSize: 24,
    color: 'green',
  },
  answerContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  answer: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  correctAnswerText: {
    marginTop: 5,
    fontSize: 16,
    fontStyle: 'italic',
    color: 'green',
  },
});
