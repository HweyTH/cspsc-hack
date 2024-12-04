import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native";

const questions = [
  {
    question: "Which of the following is a strong password?",
    options: [
      "123456",
      "password",
      "Qwerty123!",
      "abc123"
    ],
    correctAnswer: 2
  },
  {
    question: "What should you do if you receive a suspicious email?",
    options: [
      "Reply to the sender asking for details",
      "Click on the link to verify",
      "Ignore or report it as spam",
      "Forward it to friends"
    ],
    correctAnswer: 2
  }
];

export default function Practice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      Alert.alert("Please select an option.");
      return;
    }

    const isCorrect = selectedOption === questions[currentQuestionIndex].correctAnswer;
    Alert.alert(
      isCorrect ? "Correct!" : "Wrong!",
      isCorrect ? "Good job!" : "The correct answer was: " + questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer],
      [
        {
          text: "Next Question",
          onPress: () => {
            setSelectedOption(null);
            setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
          }
        }
      ]
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && styles.selectedOption
            ]}
            onPress={() => handleOptionPress(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa"
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center"
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc"
  },
  selectedOption: {
    backgroundColor: "#dfe6e9",
    borderColor: "#74b9ff"
  },
  optionText: {
    fontSize: 18
  },
  submitButton: {
    backgroundColor: "#0984e3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
