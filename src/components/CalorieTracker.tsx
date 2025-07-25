import { useMemo } from "react";
import type { Activity } from "../types/";
import CalorieDisplay from "./CalorieDisplay";

type calorieTrackerProps = {
  activities: Activity[];
};

const CalorieTracker = ({ activities }: calorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Gastadas" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
};

export default CalorieTracker;
