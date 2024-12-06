// app/(tabs)/results.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ResultCard from '../../components/ResultCard';

export default function Results() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Results</Text>
      <ResultCard score={8} totalQuestions={10} />
      <Button title="Go Back" onPress={() => { /* Navigate back to practice page */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e5e5e5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
