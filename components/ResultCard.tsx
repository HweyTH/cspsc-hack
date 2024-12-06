// components/ResultCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
}

export default function ResultCard({ score, totalQuestions }: ResultCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Score</Text>
      <Text style={styles.score}>
        {score} out of {totalQuestions}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    marginTop: 10,
  },
});
