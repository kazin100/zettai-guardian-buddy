import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import GeoConsentBanner from "@/components/GeoConsentBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      <ChatBot />
      <GeoConsentBanner />
    </div>
  );
};

export default Index;
