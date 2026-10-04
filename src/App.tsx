import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Scroll reveal uses IntersectionObserver only, never a scroll listener, and
   collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Section headings stack vertically. No split-header anywhere on the page. */
function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker?: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-3xl">
      {kicker ? <p className="micro mb-5">{kicker}</p> : null}
      <h2 className="display display-lg">{title}</h2>
      {body ? <p className="lede mt-7">{body}</p> : null}
    </div>
  )
}

const NAV = [
  { label: 'Trips', href: '#trips' },
  { label: 'Rivers', href: '#rivers' },
  { label: 'Safety', href: '#safety' },
  { label: 'Guides', href: '#guides' },
  { label: 'Book', href: '#book' },
]

/* Trip grid. Spans and vertical offsets are deliberate: alternating 7/5 and
   5/7 columns with each short card pushed down, so no two rows align. */
const TRIPS = [
  {
    river: 'Deschutes',
    reach: 'Tanner Creek to Tumwater Falls',
    cls: 'III',
    miles: '13 river miles',
    day: 'Full day, 5.5 hours',
    price: '$189',
    seed: 'mountain-stream-forest',
    alt: 'A river valley below wooded mountains in low evening light',
    body: 'A full day of Class III with one optional Class IV section. Lunch on the bank at a bar you have to swim to.',
  },
  {
    river: 'Kern',
    reach: 'Course 2, Forks to the confluence',
    cls: 'IV',
    miles: '17 river miles',
    day: 'Full day, 6 hours',
    price: '$215',
    seed: 'kayak-on-river-calm-water',
    alt: 'Rock outcrops standing in clear green river water',
    body: 'Continuous Class IV with fourteen named rapids. We run it low and we do not portage the hard one.',
  },
  {
    river: 'Salmon',
    reach: 'Rapes Bar to China Creek',
    cls: 'III',
    miles: '24 river miles',
    day: 'Two days, one night',
    price: '$345',
    seed: 'river-bend-valley-green',
    alt: 'Green river water breaking across a wide sand bank',
    body: 'One night at camp above Rapes Bar, a long second day through the canyon, and a road out by six.',
  },
  {
    river: 'Ocoee',
    reach: 'Upper Ocoee, dam release',
    cls: 'IV',
    miles: '6.5 river miles',
    day: 'Half day, 3.5 hours',
    price: '$145',
    seed: 'lake-mountains-reflect',
    alt: 'Cold still water under a heavy sky with mountains on the far bank',
    body: 'Released water only. We run Tuesdays and Saturdays when the TVA schedule holds.',
  },
  {
    river: 'Green',
    reach: 'Flaming Gorge to Gates of the Canyon',
    cls: 'III',
    miles: '14 river miles',
    day: 'Full day, 5 hours',
    price: '$195',
    seed: 'river-bend-meadow-hills',
    alt: 'A broad valley of open hills running down to distant mountains',
    body: 'Steep walls the whole way, big views, and the mellowest Class III we run.',
  },
  {
    river: 'Colorado',
    reach: 'Cat Canyon, Willow Creek to Mile 108',
    cls: 'III+',
    miles: '68 river miles',
    day: 'Three days, two nights',
    price: '$395',
    seed: 'torres-del-paine-lake',
    alt: 'Deep blue water swirling white in a fast current',
    body: 'The long one. Sand camps, big water, and the biggest stretch of travel we schedule.',
  },
]

/* Dense river data. Six reaches is the whole book, no more. */
const RIVERS = [
  {
    river: 'Deschutes',
    cls: 'III',
    season: 'Late May to early Oct',
    transit: '5.5 hours, 13 miles',
    putIn: 'Tanner Creek',
  },
  {
    river: 'Kern',
    cls: 'IV',
    season: 'April to mid Oct, best Jun to Sep',
    transit: '6 hours, 17 miles',
    putIn: 'Forks of the Kern',
  },
  {
    river: 'Salmon',
    cls: 'III',
    season: 'Mid Jun to mid Sep',
    transit: '2 days, 24 miles',
    putIn: 'Rapes Bar',
  },
  {
    river: 'Ocoee',
    cls: 'IV',
    season: 'Release days, Apr to Sep',
    transit: '3.5 hours, 6.5 miles',
    putIn: 'Giles Put In',
  },
  {
    river: 'Green',
    cls: 'III',
    season: 'Memorial Day to mid Sep',
    transit: '5 hours, 14 miles',
    putIn: 'Flaming Gorge',
  },
  {
    river: 'Colorado',
    cls: 'III+',
    season: 'Water temps Jul and Aug',
    transit: '3 days, 68 miles',
    putIn: 'Willow Creek',
  },
]

/* Plain language. Five entries, one rule top and bottom, no dividers between
   them so it never reads as a spec table. */
const SAFETY = [
  {
    title: 'Tell us if you cannot swim well',
    body: 'You need to swim confidently in moving water, tread with your shoes on, and hold your breath underwater for at least thirty seconds. If any of that is not you, say so at the desk. We will put you in a stable boat with two guides, or move your date.',
  },
  {
    title: 'Age and weight minimums are real',
    body: 'Twelve years and 45 kg is the floor for Class III, and anyone under sixteen needs an adult in the same boat. Under 115 kg we switch to a bigger raft, and above 130 kg we ask you to talk to us before you book.',
  },
  {
    title: 'Tell us about your health, plainly',
    body: 'Asthma, epilepsy, a previous shoulder or back injury, pregnancy, blood thinners, or anything else that would change your risk in cold water. Plain text is fine, no medical language needed.',
  },
  {
    title: 'Cold water changes the rules',
    body: 'On the Salmon and the Colorado we run cold water gear and you will be wet all day at a different temperature than the air. We cancel when the forecast is below 8 C, or when thunder is within fifteen kilometres.',
  },
  {
    title: 'What we put on you',
    body: 'A buoyancy aid fitted for your weight, a helmet with a chin strap, a paddle, a wetsuit or dry suit where the water is cold, and neoprene boots on every trip. You keep nothing and owe nothing.',
  },
]

/* Guides are shown as seasons on water rather than portraits, so the row
   carries real information instead of stock faces. */
const GUIDES = [
  {
    name: 'Junie Alarcon',
    seasons: 16,
    cert: 'Trip leader, wilderness first responder',
    reaches: 'Colorado, Kern',
  },
  {
    name: 'Marisol Vega',
    seasons: 14,
    cert: 'River guide, Class IV',
    reaches: 'Deschutes, Kern',
  },
  {
    name: 'Priya Raghunathan',
    seasons: 11,
    cert: 'River guide, Class IV',
    reaches: 'Salmon, Ocoee',
  },
  {
    name: 'Teo Halvorsen',
    seasons: 9,
    cert: 'Swiftwater rescue technician',
    reaches: 'Salmon, Green',
  },
  {
    name: 'Callum Beck',
    seasons: 7,
    cert: 'River guide, Class III',
    reaches: 'Ocoee, Green',
  },
]

const MAX_SEASONS = 16

export default function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-accent-ink)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - one line at desktop, 68px                                  */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/94 backdrop-blur-sm">
        <div className="shell flex h-[68px] items-center justify-between">
          <a
            href="#top"
            className="font-display text-[1.25rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-ink)]"
          >
            Cascade
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.875rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#book" className="btn btn-primary hidden lg:inline-flex">
            Book a trip
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] text-[var(--color-ink)] lg:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] lg:hidden">
            <nav className="shell flex flex-col py-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Book a trip
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - full-bleed river photograph, oversized condensed type      */}
        {/* -------------------------------------------------------------- */}
        <section id="top" className="relative min-h-[calc(100dvh-68px)] w-full overflow-hidden">
          <div className="absolute inset-0 hero-plate">
            <img
              src="https://picsum.photos/seed/norwegian-fjord-cliffs/2000/1200"
              alt="White water breaking around dark rock outcrops under a low sky"
              loading="eager"
              width={2000}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="scrim" />

          <div className="shell relative flex min-h-[calc(100dvh-68px)] flex-col justify-end pb-16 pt-28 md:pb-24">
            <p className="micro mb-7 text-[var(--color-ink)]/70">
              Rafting out of Cascade Locks, Oregon
            </p>
            <h1 className="display-hero">
              Run the
              <br />
              whitewater
            </h1>
            <p className="lede mt-8 max-w-[54ch] text-[var(--color-ink)]/80">
              Six rivers on the book. Guided trips from a first Class III float
              through to three days of Class IV.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#book" className="btn btn-primary">
                Book a trip
              </a>
              <a href="#rivers" className="btn btn-ghost">
                River data
              </a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* TRIPS - offset staggered grid, alternating 7/5 and 5/7 columns    */}
        {/* -------------------------------------------------------------- */}
        <section id="trips" className="shell py-24 md:py-32">
          <Reveal>
            <SectionHead
              title="Six reaches on the book"
              body="Every trip below runs on the water only when the flow and the weather allow. If a reach is not running we take it off the calendar rather than run it flat."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-20">
            {TRIPS.map((t, i) => {
              const spans = [
                'md:col-span-7',
                'md:col-span-5 md:mt-28',
                'md:col-span-5',
                'md:col-span-7 md:mt-20',
                'md:col-span-5',
                'md:col-span-7 md:mt-24',
              ]
              const ratios = [
                'aspect-4/3',
                'aspect-3/4',
                'aspect-3/4',
                'aspect-4/3',
                'aspect-3/4',
                'aspect-4/3',
              ]
              return (
                <Reveal key={t.river} delay={(i % 2) * 90} className={spans[i]}>
                  <article className="flex h-full flex-col">
                    <div className={`frame w-full ${ratios[i]}`}>
                      <img
                        src={`https://picsum.photos/seed/${t.seed}/1400/1050`}
                        alt={t.alt}
                        loading="lazy"
                        width={1400}
                        height={1050}
                      />
                    </div>

                    <div className="mt-6 flex items-baseline justify-between gap-6">
                      <h3 className="display display-md">{t.river}</h3>
                      <p className="shrink-0 font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em] text-[var(--color-accent)]">
                        {t.cls}
                      </p>
                    </div>

                    <p className="mt-2 text-[0.875rem] font-medium text-[var(--color-mute)]">
                      {t.reach}
                    </p>

                    <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      {t.body}
                    </p>

                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                      <div>
                        <dt className="datakey">Distance</dt>
                        <dd className="dataval mt-1">{t.miles}</dd>
                      </div>
                      <div>
                        <dt className="datakey">Time on water</dt>
                        <dd className="dataval mt-1">{t.day}</dd>
                      </div>
                      <div>
                        <dt className="datakey">Per person</dt>
                        <dd className="dataval mt-1">{t.price}</dd>
                      </div>
                    </dl>

                    <a
                      href="#book"
                      className="mt-7 inline-flex w-fit items-center gap-2 text-[0.875rem] font-bold text-[var(--color-ink)] underline decoration-[var(--color-hairline)] underline-offset-[6px] transition-colors hover:decoration-[var(--color-accent)]"
                    >
                      Reserve {t.river}
                    </a>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* RIVER DATA - dense two-column, heading stacked then data grid     */}
        {/* -------------------------------------------------------------- */}
        <section id="rivers" className="border-y border-[var(--color-hairline)] bg-[var(--color-surface)]">
          <div className="shell py-24 md:py-32">
            <Reveal>
              <SectionHead
                title="What each reach actually runs"
                body="Class measures difficulty, not danger to an experienced paddler. We tell you both before you book."
              />
            </Reveal>

            <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4" delay={60}>
                <div className="lg:sticky lg:top-24">
                  <h3 className="display display-md">How we set a trip</h3>
                  <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                    We read the gauge and the forecast at the put in on the morning
                    of every trip. If the number is outside the band we are happy
                    with, we move you to another reach or refund the difference.
                  </p>
                  <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                    Group size is capped at six per raft. You will not be stacked
                    eight deep to save a boat on a day that needs it.
                  </p>
                  <dl className="mt-9 space-y-4">
                    <div>
                      <dt className="datakey">Licensed operator</dt>
                      <dd className="dataval mt-1">Oregon River Licence OR-RA-8841</dd>
                    </div>
                    <div>
                      <dt className="datakey">Desk hours</dt>
                      <dd className="dataval mt-1">Weekdays 08:00 to 18:00 Pacific</dd>
                    </div>
                    <div>
                      <dt className="datakey">Season</dt>
                      <dd className="dataval mt-1">April through early October</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={120}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
                  {RIVERS.map((r) => (
                    <div key={r.river} className="border-t border-[var(--color-hairline)] pt-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-[1.25rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-ink)]">
                          {r.river}
                        </p>
                        <p className="font-display text-[1.0625rem] font-bold leading-none text-[var(--color-accent)]">
                          {r.cls}
                        </p>
                      </div>
                      <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--color-mute)]">
                        {r.season}
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--color-mute)]">
                        {r.transit}
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--color-mute)]">
                        Put in at {r.putIn}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SAFETY - plain rows, one rule top and bottom, no row dividers    */}
        {/* -------------------------------------------------------------- */}
        <section id="safety" className="shell py-24 md:py-32">
          <Reveal>
            <SectionHead
              title="Before you get on the water"
              body="None of this is read out once at the counter. It gets read to the whole boat at the put in."
            />
          </Reveal>

          <div className="mt-14 border-y border-[var(--color-hairline)]">
            {SAFETY.map((s, i) => (
              <Reveal key={s.title} delay={i * 50}>
                <div className="grid gap-3 py-9 md:grid-cols-12 md:gap-10">
                  <h3 className="font-display text-[1.25rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] md:col-span-5 md:text-[1.375rem]">
                    {s.title}
                  </h3>
                  <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)] md:col-span-7">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* GUIDES - a single horizontal row of five, scaled by seasons      */}
        {/* -------------------------------------------------------------- */}
        <section id="guides" className="border-t border-[var(--color-hairline)] bg-[var(--color-surface)]">
          <div className="shell py-24 md:py-32">
            <Reveal>
              <SectionHead
                title="Who you will be on the water with"
                body="Five of the twelve guides on our books, bar charted by seasons on water. Each one runs at least one trip a week from April to October."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {GUIDES.map((g, i) => (
                <Reveal key={g.name} delay={i * 60}>
                  <article className="flex h-full flex-col">
                    <h3 className="font-display text-[1.25rem] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-ink)]">
                      {g.name}
                    </h3>

                    <div
                      className="mt-6 h-1.5 w-full bg-[var(--color-hairline)]"
                      role="img"
                      aria-label={`${g.seasons} seasons on water`}
                    >
                      <div
                        className="h-full bg-[var(--color-accent)]"
                        style={{ width: `${(g.seasons / MAX_SEASONS) * 100}%` }}
                      />
                    </div>

                    <p className="mt-3 font-display text-[1.375rem] font-bold leading-none tracking-[-0.03em] text-[var(--color-ink)]">
                      {g.seasons} seasons
                    </p>
                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--color-mute)]">
                      {g.cert}
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--color-mute)]">
                      Runs {g.reaches}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* BOOKING - full-bleed photo band, then the enquiry form          */}
        {/* -------------------------------------------------------------- */}
        <section id="book" className="border-t border-[var(--color-hairline)]">
          <div className="relative w-full overflow-hidden">
            <img
              src="https://picsum.photos/seed/river-bend-valley-green/2000/900"
              alt="Green river water breaking across a wide sand bank"
              loading="lazy"
              width={2000}
              height={900}
              className="h-full max-h-[520px] min-h-[420px] w-full object-cover"
            />
            <div className="scrim" />
            <div className="shell relative flex min-h-[420px] flex-col justify-end py-16">
              <h2 className="display-hero max-w-[16ch] text-[clamp(1.9rem,5.4vw,4.25rem)]">
                Tell us which reach
              </h2>
              <p className="lede mt-7 max-w-[52ch] text-[var(--color-ink)]/80">
                We reply within one working day with the dates that are open and
                what it costs.
              </p>
              <div className="mt-9">
                <a href="#book-form" className="btn btn-primary">
                  Start an enquiry
                </a>
              </div>
            </div>
          </div>

          <div id="book-form" className="shell py-24 md:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4" delay={60}>
                <h3 className="display display-md">What it costs</h3>
                <dl className="mt-8 space-y-5">
                  <div className="border-t border-[var(--color-hairline)] pt-4">
                    <dt className="datakey">Trips from</dt>
                    <dd className="dataval mt-1.5">$145 per person</dd>
                  </div>
                  <div className="border-t border-[var(--color-hairline)] pt-4">
                    <dt className="datakey">Deposit</dt>
                    <dd className="dataval mt-1.5">30 percent to confirm</dd>
                  </div>
                  <div className="border-t border-[var(--color-hairline)] pt-4">
                    <dt className="datakey">Group size</dt>
                    <dd className="dataval mt-1.5">Six per raft maximum</dd>
                  </div>
                  <div className="border-t border-[var(--color-hairline)] pt-4">
                    <dt className="datakey">Phone</dt>
                    <dd className="dataval mt-1.5">
                      <a className="hover:text-[var(--color-accent)]" href="tel:+15035550142">
                        +1 503 555 0142
                      </a>
                    </dd>
                  </div>
                  <div className="border-t border-[var(--color-hairline)] pt-4">
                    <dt className="datakey">Office</dt>
                    <dd className="dataval mt-1.5">
                      218 Marine Drive, Cascade Locks, OR 97058
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={120}>
                <form className="grid gap-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        aria-describedby="name-hint"
                        className="border border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                      <p id="name-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                        Who we should reply to.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        aria-describedby="email-hint"
                        className="border border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                      <p id="email-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                        Used only to answer this enquiry.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="river" className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      Which reach
                    </label>
                    <select
                      id="river"
                      name="river"
                      aria-describedby="river-hint"
                      className="border border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
                    >
                      <option>Not sure yet, tell me what is running</option>
                      {TRIPS.map((t) => (
                        <option key={t.river}>
                          {t.river}, Class {t.cls}
                        </option>
                      ))}
                    </select>
                    <p id="river-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                      We will suggest a different one if your reach is not running.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="group" className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      How many people
                    </label>
                    <input
                      id="group"
                      name="group"
                      type="number"
                      min={1}
                      max={12}
                      aria-describedby="group-hint"
                      className="border border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                    />
                    <p id="group-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                      Six per raft, so over six means two boats.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      Anything we should know
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      aria-describedby="message-hint"
                      className="border border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                    />
                    <p id="message-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                      Swimming ability, dates, ages, or health notes. Plain words are fine.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button type="submit" className="btn btn-primary">
                      Send enquiry
                    </button>
                    <p className="text-[0.8125rem] text-[var(--color-mute)]">
                      One working day reply, no mailing list.
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] py-12">
        <div className="shell flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-[1.125rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-ink)]">
              Cascade
            </p>
            <p className="mt-2 text-[0.875rem] text-[var(--color-mute)]">
              218 Marine Drive, Cascade Locks, OR 97058
            </p>
            <p className="mt-1 text-[0.875rem] text-[var(--color-mute)]">
              Licensed river outfitter, OR-RA-8841
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.875rem] text-[var(--color-mute)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="shell mt-10 border-t border-[var(--color-hairline)] pt-6">
          <p className="text-[0.8125rem] text-[var(--color-mute)]">
            Developed by{' '}
            <a
              href="https://thediyadevelopers.com"
              className="underline decoration-[var(--color-hairline)] underline-offset-[4px] transition-colors hover:text-[var(--color-ink)]"
            >
              Diya Developers
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}