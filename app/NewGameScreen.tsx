import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { UserPlus, ArrowLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createRoom } from "./api";
const NewGameScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");

  const createNewRoom = async () => {
    try {
      const { roomCode } = await createRoom(username);
      navigation.navigate("GameLobbyScreen", {
        isGameMaster: true,
        username,
        roomCode,
      });
    } catch (error) {
      console.error("Error creating room:", error);
      
    }
  };

  return (
    <LinearGradient
      colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Create New Game</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !username.trim() && styles.buttonDisabled]}
            onPress={createNewRoom}
            disabled={!username.trim()}
          >
            <UserPlus color="#fff" size={24} />
            <Text style={styles.buttonText}>Create Room</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#fff",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default NewGameScreen;
