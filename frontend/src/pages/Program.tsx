import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ExerciseBar from "../components/ExerciseBar";
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
  pid: number;
};
type ProgramData = {
  id: number;
  name: string;
  categories: Array<Record<string, unknown>>;
  exercises: Array<Exercises> | null;
};
type ResponseData = {
  success: boolean;
  message?: string;
  data?: ProgramData;
};
type ResponseNextData = {
  success: boolean;
  message?: string;
  data?: Array<ProgramData>;
};
function Program() {
  const { id } = useParams();
  const [programData, setProgramData] = useState<null | ProgramData>(null);
  const [combos, setCombos] = useState<null | Array<ProgramData>>(null);
  const [selectedCombo, setSelectedCombo] = useState<null | ProgramData>(null);
  const [exerciseData, setExerciseData] = useState<null | Array<Exercises>>(
    null
  );
  useEffect(() => {
    if (programData?.exercises) {
      setExerciseData(programData?.exercises);
    }
  }, [programData]);
  async function HandleGetProgram() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/program-detail", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ id: Number(id) }),
      });
      const nextres = await fetch("http://localhost:8000/api/v1/combos", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });
      const nextData: ResponseNextData = await nextres.json();
      const data: ResponseData = await res.json();
      if (data.success) {
        if (data.data) {
          setProgramData(data.data);
        }
      } else {
        return alert(data.message);
      }
      if (nextData.success) {
        if (nextData.data) {
          return setCombos(nextData.data);
        }
      } else {
        return alert(nextData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        return alert(error.toString());
      } else {
        return alert("Something Went Wrong While Fetching Program Details");
      }
    }
  }

  useEffect(() => {
    HandleGetProgram();
  }, []);
  return (
    <div className="w-full h-[100vh] bg-background overflow-hidden">
      {programData === null || programData === undefined ? (
        <div className="w-full h-full flex justify-center items-center bg-background">
          <div className="w-12 h-12">
            <img src="https://media.licdn.com/dms/image/v2/D560BAQHlvvux5wWyjw/company-logo_200_200/company-logo_200_200/0/1727684281158/rootally_logo?e=2147483647&v=beta&t=Bq1klOwouKjTeSm2iuls_Jn9PjvQRENvAsZeSZqxc1o" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-start items-start">
          <div className="w-full p-2 bg-primary border-b-[4px] border-[#362c86] font-semibold text-xl text-white flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">
              {programData.name}
            </h1>
            <select
              value={JSON.stringify(selectedCombo)}
              onChange={(e) => {
                const newCombo = JSON.parse(e.target.value);
                setSelectedCombo(newCombo);
                console.log(newCombo);
                if (newCombo?.exercises) {
                  setExerciseData(newCombo.exercises);
                }
              }}
              className="w-1/5 bg-[#362c86] p-1 rounded-full cursor-pointer outline-none text-base font-normal"
            >
              <option className="text-white font-normal text-base">
                Select Combo
              </option>
              {combos?.map((combo, index) => {
                return (
                  <option value={JSON.stringify(combo)} key={index}>
                    {combo.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full h-full p-2">
            {/* EXERCISES  */}
            <Exercise
              id={Number(id)}
              exerciseData={exerciseData}
              setExerciseData={setExerciseData}
            />

            {/* BOTTOM BAR  */}
            <BottomBar
              id={Number(id)}
              setExerciseData={setExerciseData}
              exerciseData={exerciseData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
type CategoryType = {
  id: number;
  name: string;
  programs: Array<Record<string, unknown>>;
  subcategories: Array<Subcategory>;
};
type Subcategory = {
  id?: number;
  name: string;
  exercises: Array<string>;
  cid?: number;
};
type Response = {
  success: boolean;
  message?: string;
  data?: Array<CategoryType>;
};

type ExerProps = {
  exerciseData: Array<Exercises> | null;
  id?: number;
  setExerciseData: React.Dispatch<
    React.SetStateAction<Array<Exercises> | null>
  >;
};

function Exercise({ exerciseData, setExerciseData }: ExerProps) {
  const getExerPos = (id: number): number => {
    if (!exerciseData) return -1;
    const index = exerciseData.findIndex((exer) => exer.id === id);
    return index;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !exerciseData) {
      return;
    }

    const originalPos = getExerPos(active.id as number);
    const newPos = getExerPos(over.id as number);
    if (originalPos !== -1 && newPos !== -1) {
      setExerciseData((exerciseData) => {
        if (!exerciseData) return null;
        return arrayMove(exerciseData, originalPos, newPos);
      });
    }
  };

  if (!exerciseData) return null;
  return (
    <div className="w-full border-[1px] h-[45%] overflow-y-scroll">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext
          items={exerciseData.map((exer) => exer.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="w-full flex flex-col gap-2">
            {exerciseData.map((exer) => (
              <ExerciseBar
                key={exer.id}
                exer={exer}
                setExerciseData={setExerciseData}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
function BottomBar({ exerciseData, setExerciseData, id }: ExerProps) {
  const [categories, setCategories] = useState<Array<CategoryType> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [DropdownExercises, setDropdownExercises] =
    useState<Array<string> | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [dayArray, setDayArray] = useState([-1, -1, -1, -1, -1, -1, -1]);
  const navigate = useNavigate();
  async function SubmitProgram() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/save-program", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ id, exercises: exerciseData, combo: true }),
      });
      const data: Response = await res.json();
      if (data.success === true) {
        setLoading(false);
        return navigate("/");
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        return alert(error.toString());
      } else {
        return alert("Something went wrong");
      }
    }
  }
  async function GetCategories() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/view-categories", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });
      const data: Response = await res.json();
      if (data.success === true) {
        if (data.data) {
          return setCategories(data.data);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        return alert(error.toString());
      } else {
        return alert("Something went wrong while fetching categories");
      }
    }
  }
  useEffect(() => {
    GetCategories();
  }, []);
  return (
    <div className="w-full h-[55%] flex flex-col justify-start items-start ">
      <div className="flex justify-start items-start w-full h-[100px] border-b-[1px] border-zinc-300">
        {/* ADD EXERCISES  */}
        <div className="p-2 flex justify-start w-1/2 ">
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            onMouseLeave={() => setDropdownExercises(null)}
            className={`bg-primary text-white outline-none p-2 px-4 w-1/2 ${
              !openDropdown ? "rounded-full" : ""
            } cursor-pointer flex justify-between items-center relative`}
          >
            <h1>Add Exercise</h1>
            {openDropdown ? (
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
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
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
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
            {openDropdown && (
              <div className="absolute w-full h-[100px] bg-primary top-[100%] left-0 overflow-y-scroll">
                {categories?.map((cat, index) => {
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => {
                        const selectedSubCat: Array<Subcategory> =
                          categories[index].subcategories;
                        const newExercises: Array<string> = [];
                        selectedSubCat.forEach((element) => {
                          element.exercises.forEach((el) => {
                            newExercises.push(el);
                          });
                        });
                        setDropdownExercises(newExercises);
                      }}
                      className="w-full text-white p-2 hover:bg-[#362c86]"
                    >
                      {cat.name}
                    </div>
                  );
                })}
              </div>
            )}
            {DropdownExercises != null && (
              <div className="absolute w-full left-[100%] top-[0%] h-[100px] bg-[#362c86] p-2 overflow-y-scroll">
                {DropdownExercises.map((exer, index) => {
                  return (
                    <div
                      onClick={() => {
                        if (exerciseData !== null) {
                          const newExerciseData: Array<Exercises> = [
                            ...exerciseData,
                            {
                              id: Math.random(),
                              name: exer,
                              holdTime: 0,
                              side: Side.LEFT,
                              sets: 0,
                              reps: 0,
                              pid: id === undefined ? 0 : id,
                            },
                          ];
                          setExerciseData(newExerciseData);
                        }
                      }}
                      key={index}
                      className="text-white w-full p-1 hover:text-zinc-400"
                    >
                      {exer}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* DAYS  */}
        <div className="w-1/2 flex flex-col justify-start items-start p-2">
          <h1 className="font-semibold text-lg text-zinc-600">Days Of Week</h1>
          <div className="flex gap-2">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    const newArray = [...dayArray];
                    if (dayArray[index] === -1) {
                      newArray[index] = 1;
                    } else {
                      newArray[index] = -1;
                    }
                    setDayArray(newArray);
                  }}
                  className={`w-8 h-8 ${
                    dayArray[index] !== -1 ? "bg-primary" : "bg-zinc-400"
                  } rounded-full text-white flex justify-center items-center cursor-pointer text-sm`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-start items-end w-full h-[150px] p-2">
        <textarea
          placeholder="Add Notes"
          className="w-1/2 h-full resize-none p-2"
        />
        <div className="flex justify-end items-end w-1/2 h-full gap-2">
          <div
            onClick={SubmitProgram}
            className="px-4 py-2 border-2 rounded-full border-tertiary text-tertiary hover:bg-tertiary hover:text-white cursor-pointer"
          >
            {loading ? "Loading..." : "Save Combo"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Program;
