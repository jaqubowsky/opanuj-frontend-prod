export const Version = () => {
  return (
    <div className="fixed bottom-4 right-4 px-3 py-1 bg-gray-700 text-white text-xs rounded-full shadow-md">
      {import.meta.env.VITE_ENVIRONMENT} - {__APP_VERSION__}
    </div>
  );
};
