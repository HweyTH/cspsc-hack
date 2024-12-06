import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';  // Import useRouter for navigation

export default function HomeScreen() {
  const router = useRouter();  // Initialize router for navigation

  const startPractice = () => {
    router.push('/practice');  // Navigate to the practice questions screen
  };

  return (
    <View style={styles.container}>
      {/* Title and Description Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Cyber Genie</Text>
          <Text style={styles.description}>
            Test and improve your cybersecurity knowledge with simple, easy-to-follow questions. Get started now!
          </Text>
        </View>
        
        {/* User login section */}
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Sections */}
      <View style={styles.sections}>
        {/* Section 1: Diagnostic Exam */}
        <TouchableOpacity style={styles.section} onPress={() => router.push('/diagnostic')}>
          <Text style={styles.sectionTitle}>Diagnostic Exam</Text>
          <Text style={styles.sectionDescription}>
            Take a short quiz to determine your current cybersecurity knowledge level.
          </Text>
        </TouchableOpacity>

        {/* Section 2: Practice Questions */}
        <TouchableOpacity style={styles.section} onPress={startPractice}>
          <Text style={styles.sectionTitle}>Practice Questions</Text>
          <Text style={styles.sectionDescription}>
            Practice with questions at different difficulty levels to improve your skills.
          </Text>
        </TouchableOpacity>

        {/* Section 3: Daily Practice */}
        <TouchableOpacity style={styles.section} onPress={() => router.push('/daily-practice')}>
          <Text style={styles.sectionTitle}>Daily Practice</Text>
          <Text style={styles.sectionDescription}>
            Stay sharp with daily questions and track your progress.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  // Lighter background for better contrast
    paddingHorizontal: 20,
    justifyContent: 'space-between',  // Spacing between sections
  },
  header: {
    marginTop: 30,
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#34495E',  // Dark color for the header to create distinction
    padding: 20,
    borderBottomLeftRadius: 20,  // Rounded corners for a smooth look
    borderBottomRightRadius: 20,
    flexDirection: 'row',  // Align header content in a row
    justifyContent: 'space-between',  // Space between the header content
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 40,  // Increased font size for better readability
    fontWeight: 'bold',
    color: '#ffffff',  // White text for contrast
    marginBottom: 10,
  },
  description: {
    fontSize: 22,  // Larger font size for easier reading
    textAlign: 'center',
    color: '#ecf0f1',  // Lighter description text for contrast
    lineHeight: 28,
  },
  loginButton: {
    backgroundColor: '#2980B9',  // Blue button for login
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',  // White text for login button
    fontSize: 22,  // Increased font size for clarity
    fontWeight: 'bold',
  },
  sections: {
    flex: 1,
    backgroundColor: '#ffffff',  // White background for the rest of the page
    borderTopLeftRadius: 20,  // Rounded top corners for a unified look
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
    elevation: 3,  // For Android shadow
  },
  sectionTitle: {
    fontSize: 30,  // Larger font size for section titles
    fontWeight: 'bold',
    color: '#34495E',  // Slightly lighter color for section titles
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 20,  // Larger description text for better clarity
    color: '#95A5A6',
    lineHeight: 28,
  },
  footer: {
    marginBottom: 30,
    alignItems: 'center',
  },
});
