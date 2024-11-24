import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Counter from "./Counter";

enum Side {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  BOTH = "BOTH",
}
type Exercises = {
  id: number;
  name: string;
  sets?: number;
  reps?: number;
  holdTime: number;
  description?: string;
  side: Side;
};
type exerProps = {
  exer: Exercises;
  setExerciseData: React.Dispatch<
    React.SetStateAction<Array<Exercises> | null>
  >;
};

function ExerciseBar({ exer, setExerciseData }: exerProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exer.id });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full bg-white p-2 flex justify-start items-center border-b-2 border-black"
    >
      <div {...attributes} {...listeners} className="w-[5%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>
      </div>
      <div className="w-[95%] bg-zinc-50 z-20 flex flex-col">
        <div className="flex justify-between">
          <h1>{exer.name}</h1>
          <div className="flex gap-2 ">
            <div className="flex gap-1">
              <div
                onClick={() => {
                  setExerciseData((prev) => {
                    if (!prev) return null;
                    return prev.map((e) =>
                      e.id === exer.id ? { ...e, side: Side.LEFT } : e
                    );
                  });
                }}
                className={`px-4 ${
                  exer.side === "LEFT" || exer.side === "BOTH"
                    ? "bg-primary"
                    : "bg-zinc-400"
                } rounded-full text-white text-sm justify-center items-center flex cursor-pointer`}
              >
                Left
              </div>
              <div
                onClick={() => {
                  console.log(exer);
                  setExerciseData((prev) => {
                    if (!prev) return null;
                    return prev.map((e) =>
                      e.id === exer.id ? { ...e, side: Side.RIGHT } : e
                    );
                  });
                }}
                className={`px-4 ${
                  exer.side === "RIGHT" || exer.side === "BOTH"
                    ? "bg-primary"
                    : "bg-zinc-400"
                } rounded-full text-white text-sm justify-center items-center flex cursor-pointer`}
              >
                Right
              </div>
              <div
                onClick={() => {
                  console.log(exer);
                  setExerciseData((prev) => {
                    if (!prev) return null;
                    return prev.map((e) =>
                      e.id === exer.id ? { ...e, side: Side.BOTH } : e
                    );
                  });
                }}
                className={`px-4 text-sm bg-tertiary rounded-full flex justify-center items-center text-white cursor-pointer`}
              >
                Duplicate
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <Counter name="sets" exer={exer} setExerciseData={setExerciseData} />
          <Counter name="reps" exer={exer} setExerciseData={setExerciseData} />
          <Counter
            name="holdTime"
            exer={exer}
            setExerciseData={setExerciseData}
          />
        </div>
      </div>
    </div>
  );
}

export default ExerciseBar;
