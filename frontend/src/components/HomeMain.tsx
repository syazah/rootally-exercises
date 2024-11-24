import AddCategory from "./Category/AddCategory";
import AddProgram from "./Program/AddProgram";

type MainProp = {
  currentSidebarVal: number;
};
function HomeMain({ currentSidebarVal }: MainProp) {
  return (
    <div className="w-[85%] h-full p-4">
      {currentSidebarVal === 0 ? <AddProgram /> : <AddCategory />}
    </div>
  );
}

export default HomeMain;
