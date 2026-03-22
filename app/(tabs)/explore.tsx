import { DaySelector } from "@/components/day-selector";
import { DAYS_OF_WEEK, EXERCISES_LIST } from "@/constants/exercises";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const [draftWorkout, setDraftWorkout] = useState<{ [key: string]: any[] }>({
    dom: [],
    seg: [],
    ter: [],
    qua: [],
    qui: [],
    sex: [],
    sab: [],
  });

  const [planningName, setPlanningName] = useState("");
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const { saveTemplate } = useWorkouts();
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[1].id);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSavePlanning = async () => {
    await saveTemplate(planningName, draftWorkout);
    setIsSaveModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DAYS_OF_WEEK}
            renderItem={({ item }) => (
              <DaySelector
                label={item.label}
                isActive={item.id === selectedDay}
                onPress={() => setSelectedDay(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <ScrollView contentContainerStyle={styles.contentBody}>
          <Text style={styles.selectedText}>Treino de {selectedDay}</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Adicionar Exercício</Text>
          </TouchableOpacity>

          <View style={styles.workoutList}>
            {draftWorkout[selectedDay].map((ex, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCellName} numberOfLines={1}>
                  {ex.name}
                </Text>
                <Text style={styles.tableCellSets}>{ex.sets} séries</Text>
                <Text style={styles.tableCellMuscle}>{ex.muscleGroup}</Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    const newDayList = draftWorkout[selectedDay].filter(
                      (_, i) => i !== index,
                    );
                    setDraftWorkout((prev) => ({
                      ...prev,
                      [selectedDay]: newDayList,
                    }));
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.savePlanningButton}
            onPress={() => setIsSaveModalVisible(true)}
          >
            <Text style={styles.savePlanningText}>Finalizar Planejamento</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Escolha um exercício:</Text>
              <FlatList
                data={EXERCISES_LIST}
                style={{ width: "100%", maxHeight: 400 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.exerciseItem}
                    onPress={() => {
                      const newExercise = { ...item, sets: 3 };
                      setDraftWorkout((prev) => ({
                        ...prev,
                        [selectedDay]: [...prev[selectedDay], newExercise],
                      }));
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseMuscle}>
                      {item.muscleGroup}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={isSaveModalVisible}
          animationType="fade"
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Nome do Treino</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Treino ABC, Fullbody..."
                placeholderTextColor="#666"
                value={planningName}
                onChangeText={setPlanningName}
              />
              <TouchableOpacity
                style={styles.savePlanningButton}
                onPress={handleSavePlanning}
              >
                <Text style={styles.savePlanningText}>Salvar Planejamento</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsSaveModalVisible(false)}>
                <Text style={[styles.cancelText, { marginTop: 15 }]}>
                  Voltar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#121212" },
  listContainer: { paddingVertical: 20, paddingHorizontal: 10, height: 90 },
  contentBody: { padding: 20, alignItems: "flex-start" },
  selectedText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  workoutList: { width: "100%", marginTop: 20 },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  tableCellName: { flex: 2, color: "#FFF", fontSize: 14, fontWeight: "bold" },
  tableCellSets: {
    flex: 1,
    color: "#007AFF",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  tableCellMuscle: {
    flex: 1.5,
    color: "#888",
    fontSize: 12,
    textAlign: "right",
  },
  deleteButton: { paddingLeft: 10 },
  deleteText: { color: "#FF3B30", fontWeight: "bold", fontSize: 18 },
  savePlanningButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  savePlanningText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  exerciseItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "100%",
  },
  exerciseName: { color: "#FFF", fontSize: 16 },
  exerciseMuscle: { color: "#888", fontSize: 12, textTransform: "uppercase" },
  cancelText: { color: "#FF3B30", fontWeight: "bold" },
  input: {
    width: "100%",
    backgroundColor: "#333",
    color: "#FFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});
