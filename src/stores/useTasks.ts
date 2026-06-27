import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = { id: string; text: string; done: boolean };

type TaskState = {
  tasks: Task[];
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      add: (text) =>
        set((s) => ({
          tasks: [...s.tasks, { id: crypto.randomUUID(), text, done: false }],
        })),
      toggle: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      remove: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
    }),
    { name: "tasks" } // localStorage key
  )
);
