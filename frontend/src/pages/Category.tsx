import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type Subcategory = {
  id?: number;
  name: string;
  exercises: Array<string>;
  cid?: number;
};
type CategoryData = {
  id: number;
  name: string;
  programs: Array<Record<string, unknown>>;
  subcategories: Array<Subcategory>;
};
type ResponseData = {
  success: boolean;
  message?: string;
  data?: CategoryData;
};
function Category() {
  const { id } = useParams();
  const [CategoryData, setCategoryData] = useState<null | CategoryData>(null);
  const [addPopup, setAddPopup] = useState(false);
  //   HANDLE GET Category
  async function HandleGetCategory() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/category-detail", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ id: Number(id) }),
      });
      const data: ResponseData = await res.json();
      if (data.success) {
        if (data.data) {
          return setCategoryData(data.data);
        }
      } else {
        return alert(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        return alert(error.toString());
      } else {
        return alert("Something Went Wrong While Fetching Category Details");
      }
    }
  }

  useEffect(() => {
    HandleGetCategory();
  }, []);
  return (
    <div className="w-full h-[100vh] bg-background">
      {CategoryData === null || CategoryData === undefined ? (
        <div className="w-full h-full flex justify-center items-center bg-background">
          <div className="w-12 h-12">
            <img src="https://media.licdn.com/dms/image/v2/D560BAQHlvvux5wWyjw/company-logo_200_200/company-logo_200_200/0/1727684281158/rootally_logo?e=2147483647&v=beta&t=Bq1klOwouKjTeSm2iuls_Jn9PjvQRENvAsZeSZqxc1o" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <div className="w-full p-2 bg-primary border-b-[4px] border-[#362c86] font-semibold text-xl text-white">
            {CategoryData.name}
          </div>
          {addPopup || (
            <div
              onClick={() => setAddPopup(true)}
              className="w-14 h-14 z-10 rounded-full bg-tertiary absolute bottom-4 right-4 justify-center items-center flex hover:bg-orange-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          )}
          {addPopup && (
            <AddSubCategoryPopup
              id={id}
              HandleGetCategory={HandleGetCategory}
              setAddPopup={setAddPopup}
            />
          )}
          <div className="w-full h-full p-4 gap-2 flex flex-wrap">
            {CategoryData.subcategories.map((subcat, index) => {
              return (
                <div
                  key={index}
                  className="w-1/4 h-[200px] bg-tertiary rounded-xl p-2 border-[4px] border-zinc-800"
                >
                  <h1 className="text-white font-semibold border-b-[1px] text-xl mb-2">
                    {subcat.name}
                  </h1>
                  {subcat.exercises.map((exe, i) => {
                    return (
                      <h1 className="text-sm text-white" key={`${index}-${i}`}>
                        {exe}
                      </h1>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

type AddSubCategoryProps = {
  setAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
  HandleGetCategory: () => void;
  id: string | undefined;
};
type BottomResponse = {
  success: boolean;
  message: string;
};

function AddSubCategoryPopup({
  setAddPopup,
  HandleGetCategory,
  id,
}: AddSubCategoryProps) {
  const [formData, setFormData] = useState<Subcategory>({
    name: "",
    exercises: [],
    cid: Number(id),
  });
  const [currentExercise, setCurrentExercise] = useState("");
  const [loading, setLoading] = useState(false);
  async function HandleAddSubCategory() {
    try {
      setLoading(true);
      if (formData.name === "") {
        setLoading(false);
        return alert("Must Have Name");
      }
      if (formData.exercises.length === 0) {
        setLoading(false);
        return alert("Should Have At Least One Exercise Added");
      }
      const res = await fetch("http://localhost:8000/api/v1/add-subcategory", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data: BottomResponse = await res.json();
      if (data.success === true) {
        setAddPopup(false);
        setLoading(false);
        HandleGetCategory();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        alert(error.toString());
      } else {
        alert("Unknown error occurred");
      }
    }
  }
  return (
    <div className="w-full h-full absolute z-20 flex justify-center items-center">
      <div className="w-[50%] p-2 bg-primary  rounded-xl shadow-2xl flex flex-col justify-between">
        <div className="flex justify-between items-center border-b-[1px] border-background p-1">
          <h1 className="text-white font-normal text-xl">Add Subcategory</h1>
          <div
            onClick={() => setAddPopup(false)}
            className="w-8 h-8 justify-center items-center bg-tertiary rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-full text-sm p-2 mt-2"
          placeholder="Enter Name Of Sub Category"
        />
        <div className="w-full bg-white flex rounded-full overflow-hidden mt-2">
          <input
            value={currentExercise}
            onChange={(e) => setCurrentExercise(e.target.value)}
            placeholder="Add Exercises"
            className="bg-white w-full px-2 text-sm outline-none"
          />
          <div
            onClick={() => {
              if (currentExercise != "") {
                const newExerciseArray = [
                  ...formData.exercises,
                  currentExercise,
                ];
                setFormData({ ...formData, exercises: newExerciseArray });
                setCurrentExercise("");
              }
            }}
            className="w-10 h-10 rounded-full bg-tertiary cursor-pointer flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
        <h1 className="pt-2 px-2 text-white">
          {formData.exercises.length} Added
        </h1>
        <div className="p-1 flex justify-end items-center mt-4">
          <button
            onClick={HandleAddSubCategory}
            className="text-base bg-tertiary px-4 py-2 rounded-full text-white shadow-xl hover:shadow-none"
          >
            {loading ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
