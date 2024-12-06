import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Easing } from 'react-native';

interface QuestionCardProps {
  question: { question: string; options: string[]; answer: string };
  onAnswer: (isCorrect: boolean) => void;  // Callback to notify parent of the answer correctness
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [animation] = useState(new Animated.Value(0)); // Animation value for answer feedback

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);

    // Check if the answer is correct
    const isCorrect = option === question.answer;
    onAnswer(isCorrect); // Notify parent with the correctness of the answer

    // Trigger animation on selecting an answer
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const feedbackColor = selectedAnswer
    ? selectedAnswer === question.answer
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
        const isCorrect = option === question.answer;
        return (
          <View key={index} style={styles.optionContainer}>
            <Button
              title={option}
              onPress={() => handleAnswer(option)}
              color={selectedAnswer ? 'gray' : '#007bff'} // Disable options after answering
            />
            {/* Show crossed-out style for incorrect answers */}
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
          <Text
            style={[styles.answer, { color: feedbackColor }]}
          >
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
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  question: {
    fontSize: 22, // Slightly larger for readability
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
});
