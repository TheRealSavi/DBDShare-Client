import { useState } from "react";
import AppRouter from "./AppRouter";
import Navbar from "./components/Navbar";

function App() {
  const [navbarShown, setNavbarShown] = useState(true);

  return (
    <div className="min-h-screen">
      {navbarShown && <Navbar />}
      <div className={navbarShown ? "site-content-nav" : "site-content"}>
        <AppRouter />
        <div className="fixed bottom-2 pl-4 w-full sm:invisible">
          <button
            onClick={() => {
              setNavbarShown(!navbarShown);
            }}
            className="button2"
          >
            {navbarShown ? "<<" : ">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
