import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type Program = {
  id: number;
  name: string;
};
type Response = {
  success: boolean;
  message: string;
  data?: Array<Program>;
};
function AddProgram() {
  const [addPopup, setAddPopup] = useState(false);
  const [currentPrograms, setCurrentPrograms] = useState<null | Array<Program>>(
    null
  );
  async function HandleGetPrograms() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/view-programs", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });
      const data: Response = await res.json();
      if (data.success === true) {
        if (data.data) {
          setCurrentPrograms(data.data);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return alert(error.toString());
      } else {
        return alert("Something went wrong");
      }
    }
  }

  useEffect(() => {
    HandleGetPrograms();
  }, []);
  return (
    <div className="w-full h-full text-xl relative">
      {addPopup || (
        <div
          onClick={() => setAddPopup(true)}
          className="w-14 h-14 z-10 rounded-full bg-tertiary absolute bottom-0 right-0 justify-center items-center flex hover:bg-orange-600 cursor-pointer"
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
      {addPopup && <AddProgramPopup setAddPopup={setAddPopup} />}
      <div className="w-full mb-8 border-b-[2px] border-primary">
        <h1 className="font-semibold text-2xl">Your Programs</h1>
      </div>
      {currentPrograms === null ? (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="w-full h-full flex flex-wrap gap-4">
          {currentPrograms?.map((program, index) => {
            return (
              <Link
                to={`/program/${program.id}`}
                key={index}
                className="w-1/5 bg-primary shadow-xl cursor-pointer h-[100px] rounded-lg p-2 text-white justify-center items-center flex border-[#362c86] border-[5px] hover:shadow-none relative"
              >
                {program?.name}
                <div className="absolute w-8 h-8 rounded-full bg-tertiary -top-4 -right-4 cursor-pointer justify-center flex items-center shadow-2xl">
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

type AddProgramProps = {
  setAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
type BottomResponse = {
  success: boolean;
  message: string;
  data?: Program;
};
function AddProgramPopup({ setAddPopup }: AddProgramProps) {
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function HandleAddProgram() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/add-program", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data: BottomResponse = await res.json();
      if (data.success === true) {
        setAddPopup(false);
        setLoading(false);
        if (data.data) {
          return navigate(`/program/${data.data.id}`);
        }
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
      <div className="w-[50%] h-[180px] p-2 bg-primary  rounded-xl shadow-2xl flex flex-col justify-between">
        <div className="flex justify-between items-center border-b-[1px] border-background p-1">
          <h1 className="text-white font-normal text-xl">Add Program</h1>
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
          onChange={(e) => setFormData({ name: e.target.value })}
          className="w-full rounded-full text-sm p-2"
          placeholder="Enter Name Of Program"
        />
        <div className="p-1 flex justify-end items-center">
          <button
            onClick={HandleAddProgram}
            className="text-base bg-tertiary px-4 py-2 rounded-full text-white shadow-xl hover:shadow-none"
          >
            {loading ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProgram;
