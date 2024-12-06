// components/QuestionCard.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';

interface QuestionCardProps {
  question: { question: string; options: string[]; answer: string };
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [answerOpacity] = React.useState(new Animated.Value(0));
  const [optionsOpacity] = React.useState(new Animated.Value(1));

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);

    // Fade out options and show result
    Animated.timing(optionsOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Fade in answer feedback
    Animated.timing(answerOpacity, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>

      {/* Options with smooth transition */}
      {question.options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswerSelect(option)}>
          <Animated.View style={[styles.optionContainer, { opacity: optionsOpacity }]}>
            <Text style={styles.option}>{option}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}

      {/* Answer feedback */}
      {selectedAnswer && (
        <Animated.View style={[styles.answerContainer, { opacity: answerOpacity }]}>
          <Text style={selectedAnswer === question.answer ? styles.correct : styles.incorrect}>
            {selectedAnswer === question.answer ? "Correct!" : "Incorrect!"}
          </Text>
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
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    transform: [{ scale: 0.98 }],
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  optionContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  option: {
    fontSize: 18,
    color: '#333',
  },
  answerContainer: {
    marginTop: 20,
  },
  correct: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50', // Green for correct
    textAlign: 'center',
  },
  incorrect: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F44336', // Red for incorrect
    textAlign: 'center',
  },
});
