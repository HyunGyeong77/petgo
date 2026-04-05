import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import HeroSection from './_components/hero-section/Hero';
import Preferences from './_components/preferences/Preferences';
import Walk from './_components/walk/Walk';
import Recommend from './_components/recommend/Recommend';
import Hospital from './_components/hospital/Hospital';

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <Preferences />
        <Walk />
        <Recommend />
        <Hospital />
      </main>
      <Footer />
    </div>
  );
}
