import { Activity, Category } from "../types";
import categories from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.ActionDispatch<[action: ActivityActions]>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  return (
    <>
      <h2 className="text-center text-4xl text-slate-600 font-bold">
        Comida y Actividades
      </h2>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex justify-between px-5 py-10 bg-white mt-5"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl pt-5 font-bold">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calories}
              <span></span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
            >
              <PencilSquareIcon className="w-8 h-8 text-gray-800" />
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <XCircleIcon className="w-8 h-8 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
