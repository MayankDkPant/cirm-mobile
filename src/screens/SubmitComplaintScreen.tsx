import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { submitComplaint } from "../services/complaintService";
import { Complaint } from "../models/Complaint";
import { LoadingOverlay } from "../components/LoadingOverlay";

const SubmitComplaintScreen = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Complaint | null>(null);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Validation", "Description cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await submitComplaint(description);
      setResult(response);
    } catch (error) {
      Alert.alert("Error", "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && <LoadingOverlay />}

        <Text style={styles.title}>Submit Complaint</Text>

        <TextInput
          style={styles.input}
          placeholder="Describe your issue..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>

        {result && (
          <View style={styles.resultBox}>
            <Text>Department: {result.department}</Text>
            <Text>Priority: {result.priority}</Text>
            <Text>Status: {result.status}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
});

export default SubmitComplaintScreen;
