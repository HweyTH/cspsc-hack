// app/(tabs)/practice.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { questions } from '../../constants/database.ts';
import QuestionCard from '../../components/QuestionCard';

export default function Practice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions.easy[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.easy.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Practice Questions</Text>
      <QuestionCard question={currentQuestion} />
      <Button title="Next Question" onPress={handleNextQuestion} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
