type counterProps = {
  name: keyof Pick<Exercises, "sets" | "reps" | "holdTime">;
  exer: Exercises;
  setExerciseData: React.Dispatch<
    React.SetStateAction<Array<Exercises> | null>
  >;
};
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

function Counter({ name, exer, setExerciseData }: counterProps) {
  return (
    <div className="flex justify-start items-center gap-2 p-2">
      <h1>{name}</h1>
      <div
        onClick={() => {
          setExerciseData((prev) => {
            if (!prev) return null;
            return prev.map((e: Exercises) => {
              if (e.id === exer.id) {
                const newValue: number = Math.max(0, (e[name] || 0) - 1);
                return {
                  ...e,
                  [name]: newValue,
                };
              }
              return e;
            });
          });
        }}
        className="w-4 h-4 cursor-pointer rounded-full bg-tertiary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </div>
      <h1>{exer[name]}</h1>
      <div
        onClick={() => {
          setExerciseData((prev) => {
            if (!prev) return null;
            return prev.map((e: Exercises) => {
              if (e.id === exer.id) {
                const newValue: number = Math.max(0, (e[name] || 0) + 1);
                return {
                  ...e,
                  [name]: newValue,
                };
              }
              return e;
            });
          });
        }}
        className="w-4 h-4 cursor-pointer rounded-full bg-tertiary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
}

export default Counter;
