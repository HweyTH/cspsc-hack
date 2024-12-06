import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | ''>(''); // Add type here
  const [difficultyDescription, setDifficultyDescription] = useState('');
  const animateSection = new Animated.Value(0);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const difficultyDescriptions: Record<'Easy' | 'Medium' | 'Hard', string> = { // Use Record to type it correctly
    Easy: 'These are simple and easy questions to help you test your knowledge of cybersecurity. They will help you understand how to stay safe online, recognize common online threats, and protect your personal information. Take your time and remember, there’s no rush. Just a few questions can help you feel more confident using the internet!',
    Medium: 'These questions offer a moderate challenge. You will be tested on a broader range of cybersecurity topics and real-world scenarios, helping you gain a deeper understanding of online security practices. Focus on applying what you’ve learned so far.',
    Hard: 'These are advanced questions designed to challenge your knowledge. They cover complex cybersecurity topics and critical thinking in real-world scenarios. If you can answer these, you’re on the path to becoming an expert in cybersecurity!',
  };

  const startPractice = (difficulty: 'Easy' | 'Medium' | 'Hard') => { // Update type here
    setSelectedDifficulty(difficulty);
    setDifficultyDescription(difficultyDescriptions[difficulty]);
    router.push(`/practice?difficulty=${difficulty}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Cyber Genie</Text>
            <Text style={styles.description}>
              Test and improve your cybersecurity knowledge with simple, easy-to-follow questions. Get started now!
            </Text>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sections}>
          <TouchableOpacity style={styles.section} onPress={() => router.push('/diagnostic')}>
            <Text style={styles.sectionTitle}>Diagnostic Exam</Text>
            <Text style={styles.sectionDescription}>
              Take a short quiz to determine your current cybersecurity knowledge level.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={toggleDropdown}>
            <Text style={styles.sectionTitle}>Practice Questions</Text>
            <Text style={styles.sectionDescription}>
              Practice with questions at different difficulty levels to improve your skills.
            </Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.subsections}>
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <Animated.View
                  key={level}
                  style={[
                    styles.subsection,
                    {
                      transform: [
                        {
                          translateY: animateSection.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -10],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => startPractice(level as 'Easy' | 'Medium' | 'Hard')}>
                    <Text style={styles.subsectionTitle}>{level} Level</Text>
                    <Text style={styles.subsectionDescription}>
                      {difficultyDescriptions[level as 'Easy' | 'Medium' | 'Hard']}
                    </Text>
                    <Text style={styles.subsectionQuestions}>40 questions</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.section} onPress={() => router.push('/daily-practice')}>
            <Text style={styles.sectionTitle}>Daily Practice</Text>
            <Text style={styles.sectionDescription}>
              Stay sharp with daily questions and track your progress.
            </Text>
          </TouchableOpacity>
        </View>

        {selectedDifficulty && (
          <View style={styles.difficultyDescriptionContainer}>
            <Text style={styles.difficultyTitle}>{selectedDifficulty} Level Description:</Text>
            <Text style={styles.difficultyDescription}>{difficultyDescription}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    marginTop: 30,
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#34495E',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  description: {
    fontSize: 22,
    textAlign: 'center',
    color: '#ecf0f1',
    lineHeight: 28,
  },
  loginButton: {
    backgroundColor: '#2980B9',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sections: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 25,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 20,
    color: '#95A5A6',
    lineHeight: 28,
  },
  subsections: {
    marginTop: 20,
  },
  subsection: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subsectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 10,
  },
  subsectionDescription: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  subsectionQuestions: {
    fontSize: 18,
    color: '#2ecc71',
  },
  difficultyDescriptionContainer: {
    marginTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  difficultyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 10,
  },
  difficultyDescription: {
    fontSize: 18,
    color: '#7f8c8d',
  },
});
