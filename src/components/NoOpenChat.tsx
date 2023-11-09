const NoOpenChat = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center bg-orange-200 px-4 py-10 sm:px-6 lg:px-8 h-full ">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-2xl font-semibold text-slate-600">{title}</h3>
      </div>
    </div>
  );
};

export default NoOpenChat;
