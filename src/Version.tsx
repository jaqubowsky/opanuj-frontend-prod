export const Version = () => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  return (
    <div className="fixed bottom-4 right-4 px-3 py-1 bg-gray-700 text-white text-xs rounded-full shadow-md">
      {environment} - {__APP_VERSION__}
    </div>
  );
};
