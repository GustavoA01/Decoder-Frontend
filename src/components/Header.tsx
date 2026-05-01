import { headerBadges } from '../data/constants';

export const Header = () => (
  <header className="space-y-8 select-none">
    <section className="space-y-5">
      <div className="space-y-3">
        <p className="font-mono uppercase text-lg tracking-[0.5em] text-cyan-300/80">
          Decoder
        </p>
        <h1 className="max-w-3xl font-(family-name:--font-heading) text-5xl leading-none font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Titulo maneiro
        </h1>
      </div>
      <p className="max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
        Descricao
      </p>
    </section>

    <section className="flex flex-wrap gap-3 text-sm text-white/72">
      {headerBadges.map((text) => (
        <div
          key={text}
          className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-sm"
        >
          {text}
        </div>
      ))}
    </section>
  </header>
);
