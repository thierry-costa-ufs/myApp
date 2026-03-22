import { WorkoutSession } from "@/constants/exercises";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);

  const storeData = async (value: WorkoutSession[]) => {
    try {
      setWorkouts(value);
      await AsyncStorage.setItem("@workouts_key", JSON.stringify(value));
    } catch (e) {
      console.error("Erro ao salvar sessões:", e);
    }
  };

  const loadData = async () => {
    try {
      const vWorkouts = await AsyncStorage.getItem("@workouts_key");
      if (vWorkouts) setWorkouts(JSON.parse(vWorkouts));

      const vTemplates = await AsyncStorage.getItem("@workout_templates");
      if (vTemplates) setTemplates(JSON.parse(vTemplates));
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  };

  const saveTemplate = async (name: string, data: any) => {
    try {
      const existing = await AsyncStorage.getItem("@workout_templates");
      const currentTemplates = existing ? JSON.parse(existing) : [];

      const newTemplate = { id: Date.now().toString(), name, data };
      const updatedTemplates = [...currentTemplates, newTemplate];

      await AsyncStorage.setItem(
        "@workout_templates",
        JSON.stringify(updatedTemplates),
      );
      setTemplates(updatedTemplates); // Atualiza o estado local
      console.log("Template Salvo com Sucesso!");
    } catch (e) {
      console.error("Erro ao salvar template:", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    storeData,
    workouts,
    templates,
    saveTemplate,
    loadData,
  };
}
