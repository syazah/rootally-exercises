type MainProp = {
  currentSidebarVal: number;
  setCurrentSidebarVal: React.Dispatch<React.SetStateAction<number>>;
};
function Sidebar({ currentSidebarVal, setCurrentSidebarVal }: MainProp) {
  return (
    <div className="w-[15%] bg-primary h-full border-r-[4px] border-[#362C86] flex flex-col justify-start items-center p-2 gap-2">
      <div className="w-16 h-16 border-[4px] border-[#362c86] rounded-full bg-background overflow-hidden flex justify-center items-center mb-8">
        <img
          src={
            "https://media.licdn.com/dms/image/v2/D560BAQHlvvux5wWyjw/company-logo_200_200/company-logo_200_200/0/1727684281158/rootally_logo?e=2147483647&v=beta&t=Bq1klOwouKjTeSm2iuls_Jn9PjvQRENvAsZeSZqxc1o"
          }
        />
      </div>
      {[
        { label: "Programs", value: 0 },
        { label: "Categories", value: 1 },
      ].map((item, index) => (
        <div
          className={`w-full flex justify-start items-center rounded-full ${
            currentSidebarVal === item.value ? "bg-[#362C86]" : ""
          } hover:bg-[#362c86] p-2 cursor-pointer`}
          key={index}
          onClick={() => setCurrentSidebarVal(item.value)}
        >
          <h1 className="text-white">{item.label}</h1>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
