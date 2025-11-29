import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const dailyGoals = {
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
};
