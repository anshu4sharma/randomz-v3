import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "aos/dist/aos.css";

import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const chainId = ChainId.BinanceSmartChainTestnet;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={chainId}
      clientId="4a554c9ae99ed5036b89278cf9b52843"
      secretKey="onGgdhv_TRztxsxN2s2prK4yzSpxk94Dnx151HEL_O0PRkYwmPMqmUEeEhB41chZtCHsW6P-V0QCh1kqVulEwg"
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
