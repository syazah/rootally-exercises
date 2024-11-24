import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HomeMain from "../components/HomeMain";

function Home() {
  const [currentSidebarVal, setCurrentSidebarVal] = useState(0);
  return (
    <div className="w-full h-[100vh] bg-background flex justify-start overflow-hidden">
      <Sidebar
        currentSidebarVal={currentSidebarVal}
        setCurrentSidebarVal={setCurrentSidebarVal}
      />
      <HomeMain currentSidebarVal={currentSidebarVal} />
    </div>
  );
}

export default Home;
