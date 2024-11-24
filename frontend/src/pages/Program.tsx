import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type ProgramData = {
  id: number;
  name: string;
  categories: Array<Record<string, unknown>>;
  exercises: Array<Record<string, unknown>>;
};
type ResponseData = {
  success: boolean;
  message?: string;
  data?: ProgramData;
};
function Program() {
  const { id } = useParams();
  const [programData, setProgramData] = useState<null | ProgramData>(null);
  async function HandleGetProgram() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/program-detail", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ id: Number(id) }),
      });
      const data: ResponseData = await res.json();
      if (data.success) {
        if (data.data) {
          return setProgramData(data.data);
        }
      } else {
        return alert(data.message);
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
    <div className="w-full h-[100vh] bg-background">
      {programData === null || programData === undefined ? (
        <div className="w-full h-full flex justify-center items-center bg-background">
          <div className="w-12 h-12">
            <img src="https://media.licdn.com/dms/image/v2/D560BAQHlvvux5wWyjw/company-logo_200_200/company-logo_200_200/0/1727684281158/rootally_logo?e=2147483647&v=beta&t=Bq1klOwouKjTeSm2iuls_Jn9PjvQRENvAsZeSZqxc1o" />
          </div>
        </div>
      ) : (
        <div className="w-full p-2 bg-primary border-b-[4px] border-[#362c86] font-semibold text-xl text-white">
          {programData.name}
        </div>

      )}
    </div>
  );
}

export default Program;
