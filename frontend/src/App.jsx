import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] overflow-x-hidden">

      <Navbar />

      <main className="pt-20 lg:pt-24">

        <section className="min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)] flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12 text-center">

          <h1
            className="
              font-extrabold
              leading-tight
              text-white

              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
              2xl:text-9xl
            "
          >
            Welcome to

            <br />

            <span className="text-orange-500">
              DineExpress
            </span>
          </h1>

          <p
            className="
              mt-6
              text-gray-400
              max-w-2xl

              text-base
              sm:text-lg
              md:text-xl
              lg:text-2xl
            "
          >
            Discover • Dine • Deliver
          </p>

        </section>

        <Footer />

      </main>

    </div>
  );
}

export default App;