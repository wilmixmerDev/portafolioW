export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black/65 text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 -z-20 h-full w-full object-cover"
      >
        <source
          src="/videos/BMW M3 Competition - 4K Cinematic Short Video.mp4"
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0 -z-10 bg-black/30" />

      <header className="sticky top-0 z-30 border-b border-white/15 bg-black/20 backdrop-blur-sm">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold tracking-wide">Wilmer Iriarte</p>
            <p className="text-xs text-white/70">Ingeniería de Sistemas · 9no semestre</p>
          </div>
          <div className="hidden gap-6 text-sm md:flex">
            <a href="#sobre-mi" className="text-white/80 transition hover:text-white">
              Sobre mí
            </a>
            <a href="#experiencia" className="text-white/80 transition hover:text-white">
              Experiencia
            </a>
            <a href="#proyectos" className="text-white/80 transition hover:text-white">
              Proyectos
            </a>
            <a href="#skills" className="text-white/80 transition hover:text-white">
              Skills
            </a>
            <a href="#contacto" className="text-white/80 transition hover:text-white">
              Contacto
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16 pt-20">
        <section
          id="sobre-mi"
          className="rounded-2xl border border-white/20 bg-black/15 p-8 backdrop-blur-sm md:p-12"
        >
          <p className="mb-4 inline-flex rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
            Disponible para prácticas y primer empleo
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
            Ingeniero de Sistemas en formación y desarrollador de software
          </h1>
          <p className="max-w-4xl text-lg text-white/90 md:text-xl">
            Soy Wilmer Iriarte, estudiante de 9no semestre con enfoque en
            desarrollo web full stack. Busco integrarme a un equipo donde pueda
            aportar en frontend, backend y bases de datos, construyendo productos
            sólidos, escalables y orientados a negocio.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-black/25 p-4">
              <p className="text-2xl font-bold">+12</p>
              <p className="text-sm text-white/75">Proyectos académicos y personales</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/25 p-4">
              <p className="text-2xl font-bold">Full Stack</p>
              <p className="text-sm text-white/75">Experiencia con React, Next.js, Node y SQL</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/25 p-4">
              <p className="text-2xl font-bold">Enfoque</p>
              <p className="text-sm text-white/75">Arquitectura limpia, rendimiento y UX</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/30 bg-black/25 px-4 py-2">Desarrollo Web</span>
            <span className="rounded-full border border-white/30 bg-black/25 px-4 py-2">APIs REST</span>
            <span className="rounded-full border border-white/30 bg-black/25 px-4 py-2">Buenas prácticas</span>
            <span className="rounded-full border border-white/30 bg-black/25 px-4 py-2">Trabajo en equipo</span>
          </div>
        </section>

        <section id="experiencia" className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/20 bg-black/15 p-6 backdrop-blur-sm">
            <h2 className="mb-3 text-2xl font-semibold">Perfil profesional</h2>
            <p className="text-white/80">
              Formación en Ingeniería de Sistemas con participación en proyectos
              de desarrollo de software, modelado de datos y arquitectura de
              aplicaciones web. Me adapto rápido y disfruto resolver problemas
              reales con soluciones mantenibles.
            </p>
          </article>
          <article className="rounded-2xl border border-white/20 bg-black/15 p-6 backdrop-blur-sm">
            <h2 className="mb-3 text-2xl font-semibold">Objetivo laboral</h2>
            <p className="text-white/80">
              Busco una oportunidad como desarrollador de software junior donde
              pueda seguir creciendo en entornos de producción, aportar valor
              desde el primer día y evolucionar junto al equipo técnico.
            </p>
          </article>
        </section>

        <section id="proyectos" className="rounded-2xl border border-white/20 bg-black/15 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-3xl font-semibold">Proyectos destacados</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-white/15 bg-black/25 p-5">
              <h3 className="mb-2 text-lg font-semibold">Sistema de gestión académica</h3>
              <p className="text-sm text-white/80">
                Plataforma web para control de estudiantes, materias y notas con
                autenticación, roles y reportes.
              </p>
            </article>
            <article className="rounded-xl border border-white/15 bg-black/25 p-5">
              <h3 className="mb-2 text-lg font-semibold">Dashboard de indicadores</h3>
              <p className="text-sm text-white/80">
                Panel de métricas para seguimiento de rendimiento con gráficos,
                filtros y consumo de APIs REST.
              </p>
            </article>
            <article className="rounded-xl border border-white/15 bg-black/25 p-5">
              <h3 className="mb-2 text-lg font-semibold">E-commerce modular</h3>
              <p className="text-sm text-white/80">
                Proyecto full stack con catálogo, carrito y flujo de pedidos,
                estructurado por componentes reutilizables.
              </p>
            </article>
          </div>
        </section>

        <section id="skills" className="rounded-2xl border border-white/20 bg-black/15 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-3xl font-semibold">Stack tecnológico</h2>
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Java",
              "Python",
              "SQL / MySQL",
              "Git & GitHub",
              "REST APIs",
              "Tailwind CSS",
              "Testing básico",
            ].map((skill) => (
              <div key={skill} className="rounded-lg border border-white/20 bg-black/25 px-4 py-3 text-center">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/20 bg-black/15 p-8 backdrop-blur-sm">
          <h2 className="mb-3 text-2xl font-semibold">Intereses personales</h2>
          <p className="max-w-4xl text-white/85">
            Me interesa la educación financiera, especialmente inversiones
            indexadas a largo plazo. También soy apasionado por la ingeniería
            automotriz y el mundo BMW (coches y motos), lo que inspira mi enfoque
            en rendimiento, disciplina y mejora continua.
          </p>
        </section>

        <section id="contacto" className="rounded-2xl border border-white/20 bg-black/15 p-8 backdrop-blur-sm">
          <h2 className="mb-3 text-3xl font-semibold">Contrátame</h2>
          <p className="mb-6 max-w-2xl text-white/85">
            Estoy buscando oportunidades como desarrollador de software junior o
            practicante. Si tu equipo necesita compromiso, aprendizaje rápido y
            buena base técnica, conversemos.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:wilmer.iriarte.dev@gmail.com"
              className="rounded-lg bg-cyan-300 px-6 py-3 font-semibold text-black transition hover:bg-cyan-200"
            >
              Enviar correo
            </a>
            <a
              href="#"
              className="rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
