export type MuscleGroup =
  | "Peito"
  | "Costas"
  | "Ombro"
  | "Quadríceps"
  | "Posterior"
  | "Panturrilha"
  | "Bíceps"
  | "Tríceps"
  | "Antebraço"
  | "Trapézio";
export type DayId = "dom" | "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

export type DayOption = {
  id: DayId;
  label: string;
};

export const DAYS_OF_WEEK: DayOption[] = [
  { id: "dom", label: "DOM" },
  { id: "seg", label: "SEG" },
  { id: "ter", label: "TER" },
  { id: "qua", label: "QUA" },
  { id: "qui", label: "QUI" },
  { id: "sex", label: "SEX" },
  { id: "sab", label: "SÁB" },
];

export type ExerciseData = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
};

export const EXERCISES_LIST: ExerciseData[] = [
  { id: "0", name: "Supino Inclinado", muscleGroup: "Peito" },
  { id: "1", name: "Remada Baixa", muscleGroup: "Costas" },
  { id: "2", name: "Desenvolvimento", muscleGroup: "Ombro" },
  { id: "3", name: "Leg Press", muscleGroup: "Quadríceps" },
];

export type WorkoutSession = {
  id: string;
  title: string;
  exercises: {
    baseId: string;
    setsPlanned: number;
  }[];
};
