export const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
        {message}
      </div>
    </div>
  );
};
