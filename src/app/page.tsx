import { Suspense } from 'react';
import { Header } from '../components/Header';
import { DownloadCard } from '@/src/features/DownloadCard/container';
import { IAResultSection } from '@/src/features/IAResultSection/container';

const HomePage = () => (
  <main className="home-background relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.28),transparent_32%),linear-gradient(180deg,#09090f_0%,#0f1220_48%,#07070b_100%)] px-6 py-10 text-white">
    <div
      aria-hidden="true"
      className="home-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px] opacity-30"
    />

    <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full container gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <Header />
      <Suspense fallback={null}>
        <DownloadCard />
      </Suspense>
    </section>

    <div className="container mx-auto mt-10">
      <IAResultSection />
    </div>
  </main>
);

export default HomePage;
