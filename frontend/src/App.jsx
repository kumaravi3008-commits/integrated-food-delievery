import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#000] text-white flex flex-col">
      <AppRoutes />
    </div>
  );
};

export default App;