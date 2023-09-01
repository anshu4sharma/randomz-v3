import Features from "../components/Features";
import FeaturesToken from "../components/FeaturesToken";
import Footer from "../components/Footer";
import LatestCrypto from "../components/LatestCrypto";
import MostTrusted from "../components/MostTrusted";
import Navbar from "../components/Navbar";
import Partners from "../components/Partners";
import Roadmap from "../components/Roadmap";
import Tokenomics from "../components/Tokenomics";
import Hero from "./Hero";

const Main = () => {
  return (
    <div className="md:bg-transparent">
      <div className="flex relative flex-col h-screen">
      <Navbar />
      <Hero />
      {/* video not play in iphone remove the text */}
      <video autoPlay loop muted playsInline className="absolute h-full z-0 w-full object-cover">
        <source src="/assets/hero.mp4" type="video/mp4" />
        <source src="/assets/hero.webm" type="video/webm" />
      </video>
      </div>
      <MostTrusted />
      <Features />
      <Partners />
      <Tokenomics />
      <LatestCrypto />
      <Roadmap />
      <FeaturesToken />
      <Footer />
    </div>
  );
};

export default Main;
