import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../../constants";
import dummyWords from "../../dummyData";

export default function Play({ words }) {
  const [wordList, setWordList] = useState(() => {
    const initialWords = words ?? dummyWords;
    return initialWords.map((word) => ({ ...word, status: word.status ?? 0 }));
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const learnableWords = wordList.filter((word) => word.status < 2);
  const currentWord = learnableWords[currentIndex] ?? null;

  useEffect(() => {
    if (!learnableWords.length) {
      setCurrentIndex(0);
      return;
    }

    if (currentIndex >= learnableWords.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, learnableWords.length]);

  function handleShowDetails() {
    if (!currentWord) return;
    setShowDetails((prev) => !prev);
  }

  function handleSkipWord() {
    if (!currentWord) return;
    setShowDetails(false);

    if (learnableWords.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % learnableWords.length);
    }
  }

  function handleKnowWord() {
    if (!currentWord) return;

    const nextWords = wordList.map((word) =>
      word.word === currentWord.word
        ? { ...word, status: Math.min((word.status ?? 0) + 1, 2) }
        : word
    );

    setWordList(nextWords);
    setShowDetails(false);

    const remainingWords = nextWords.filter((word) => word.status < 2);
    if (remainingWords.length > 1) {
      const position = remainingWords.findIndex((word) => word.word === currentWord.word);
      setCurrentIndex(position === -1 ? 0 : (position + 1) % remainingWords.length);
    }
  }

  if (!learnableWords.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.congrats}>Congrats!</Text>
        <Text style={styles.message}>For now you have learned all the words</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleShowDetails} style={styles.card}>
        <Text style={styles.word}>{currentWord.word}</Text>

        {showDetails && (
          <>
            {currentWord.phonetics ? (
              <Text style={styles.phonetics}>{currentWord.phonetics}</Text>
            ) : null}
            {currentWord.meaning ? (
              <Text style={styles.meaning}>{currentWord.meaning}</Text>
            ) : null}
            {currentWord.audio ? (
              <Pressable
                onPress={(event) => {
                  event.stopPropagation();
                }}
                style={styles.soundButton}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={28}
                  color={COLORS.primary900}
                />
              </Pressable>
            ) : null}
          </>
        )}
      </Pressable>

      {showDetails && (
        <View style={styles.actions}>
          <Pressable style={styles.actionButton} onPress={handleSkipWord}>
            <Text style={styles.actionText}>Didn't know it</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleKnowWord}>
            <Text style={styles.actionText}>Knew it</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.primary200,
    borderRadius: 12,
    padding: 20,
    minHeight: 140,
    justifyContent: "center",
  },
  word: {
    fontSize: 30,
    color: COLORS.fontMain,
    textAlign: "center",
  },
  phonetics: {
    marginTop: 12,
    fontSize: 18,
    color: COLORS.fontMain,
    textAlign: "center",
  },
  meaning: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.fontMain,
    textAlign: "center",
  },
  soundButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary900,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
  },
  actionText: {
    color: COLORS.fontInverse,
    fontSize: 16,
    fontWeight: "600",
  },
  congrats: {
    fontSize: 28,
    color: COLORS.fontMain,
    textAlign: "center",
    fontWeight: "700",
  },
  message: {
    marginTop: 8,
    fontSize: 18,
    color: COLORS.fontMain,
    textAlign: "center",
  },
});
