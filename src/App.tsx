import { useState } from "react";
import AppRouter from "./AppRouter";
import Navbar from "./components/Navbar";
import { ConfigProvider, theme } from "antd";

function App() {
  const [navbarShown, setNavbarShown] = useState(true);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Pagination: {
            itemActiveBg: "rgba(255,255,255,0.8)",
          },
        },
        token: {
          colorText: "rgba(255,255,255,1)",
          colorPrimary: "rgba(0,0,0,1)",
          colorBgTextActive: "rgba(255,255,255,1)",
          colorFillAlter: "rgba(255,255,255,1)",
          colorTextDisabled: "rgba(255,255,255,0.4)",
          colorBgContainer: "rgba(255,255,255,0.15)",
        },
      }}
    >
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
    </ConfigProvider>
  );
}

export default App;
