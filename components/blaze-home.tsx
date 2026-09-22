'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  CirclePlay,
  ClipboardList,
  ImagePlus,
  LayoutDashboard,
  Menu,
  Search,
  Shield,
  Trophy,
  Users,
  X,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Mail,
  MapPin,
} from 'lucide-react'
import {
  players,
  competitions,
  matches,
  posts,
  enquiries,
  trials,
  albums,
  coaches,
  chartData,
} from '@/lib/mock-data'
import { getYouTubeId } from '@/lib/youtube'
import type { Player } from '@/lib/types'
import { photo } from '@/lib/types'
import { AdminWorkspace } from '@/components/admin-workspace'

/* ------------------------------------------------------------------ */
/* Shared constants & helpers                                          */
/* ------------------------------------------------------------------ */

const inputClass =
  'w-full border border-white/15 bg-black px-3 py-3 text-sm text-white outline-none focus:border-red'

const nav: ReadonlyArray<readonly [string, string]> = [
  ['Players', '/players'],
  ['Competitions', '/competitions'],
  ['Matches', '/matches'],
  ['News', '/news'],
  ['Gallery', '/gallery'],
  ['Coaches', '/coaches'],
  ['About', '/about'],
]

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
      {label}
      {children}
    </label>
  )
}

function CoverImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="grid size-10 place-items-center bg-red text-lg font-black italic tracking-tighter">
        BFC
      </span>
      <span className="text-sm font-bold uppercase tracking-[.22em]">
        Blaze FC
      </span>
    </Link>
  )
}

function Button({
  children,
  href,
  onClick,
  secondary = false,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  secondary?: boolean
}) {
  const cls = `inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[.12em] transition ${
    secondary
      ? 'border border-white/15 text-white hover:border-red-bright hover:text-red-bright'
      : 'bg-red text-white hover:bg-red-bright'
  }`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-bold uppercase tracking-widest text-muted transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button href="/trials">Book a trial</Button>
          <button
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center border border-white/15 lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-surface px-5 py-5 lg:hidden">
          <div className="grid gap-4">
            {nav.map(([label, href]) => (
              <Link
                onClick={() => setOpen(false)}
                key={href}
                href={href}
                className="text-sm font-bold uppercase tracking-widest"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
            Developing the next generation of football talent through standards,
            support, and opportunity.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs font-bold uppercase tracking-widest text-muted">
          <Link href="/contact">Contact</Link>
          <Link href="/about">Our story</Link>
          <Link href="/admin">Admin portal</Link>
          <Link href="/trials">Trials</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between border-t border-white/10 px-5 py-5 text-xs text-muted lg:px-10">
        <span>© 2026 Blaze FC Academy</span>
        <span>Nigeria</span>
      </div>
    </footer>
  )
}

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-white/10 bg-surface px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-heading text-6xl font-black uppercase leading-[.88] tracking-tight sm:text-8xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Shared cards                                                        */
/* ------------------------------------------------------------------ */

function StatCard({
  value,
  label,
  trend,
}: {
  value: string
  label: string
  trend?: string
}) {
  return (
    <div className="border border-white/10 bg-surface p-5">
      <p className="font-heading text-5xl font-black">{value}</p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted">
        {label}
      </p>
      {trend && <p className="mt-4 text-xs font-bold text-green">{trend}</p>}
    </div>
  )
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      href={`/players/${player.slug}`}
      className="group relative min-h-[380px] overflow-hidden border border-white/10 bg-surface transition hover:border-red hover:shadow-[0_0_35px_rgba(225,29,46,.18)]"
    >
      <CoverImage
        src={player.photoUrl}
        alt={`${player.firstName} ${player.lastName}`}
        className="opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <span className="absolute right-4 top-2 font-heading text-8xl font-black text-white/15">
        {String(player.jerseyNumber).padStart(2, '0')}
      </span>
      <div className="absolute inset-x-5 bottom-5">
        <span className="inline-flex border border-red px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-red-bright">
          {player.positionText}
        </span>
        <h3 className="mt-3 font-heading text-4xl font-black uppercase leading-none">
          {player.firstName}
          <br />
          {player.lastName}
        </h3>
        <p className="mt-2 text-xs uppercase tracking-widest text-muted">
          {player.ageGroup} · {player.preferredFoot} foot
        </p>
      </div>
    </Link>
  )
}

function MatchRow({ match }: { match: (typeof matches)[number] }) {
  return (
    <Link
      href={`/matches/${match.slug}`}
      className="grid grid-cols-[60px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 transition hover:bg-surface-2 sm:grid-cols-[80px_1fr_180px_80px]"
    >
      <div>
        <p className="font-heading text-4xl font-black leading-none">
          {match.scoreFor === null
            ? '—'
            : `${match.scoreFor}:${match.scoreAgainst}`}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-red-bright">
          {match.homeOrAway}
        </p>
      </div>
      <div>
        <p className="font-bold uppercase">
          Blaze FC <span className="text-muted">vs</span> {match.opponent}
        </p>
        <p className="mt-1 text-xs text-muted">{match.venue}</p>
      </div>
      <p className="hidden text-right text-xs uppercase tracking-widest text-muted sm:block">
        {match.date}
      </p>
      <ArrowRight className="ml-auto text-muted" />
    </Link>
  )
}

function Video({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false)
  const id = getYouTubeId(url)
  return (
    <div className="relative aspect-video overflow-hidden bg-surface">
      {loaded && id ? (
        <iframe
          className="size-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="Blaze FC video"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={`https://img.youtube.com/vi/${
              id || 'dQw4w9WgXcQ'
            }/hqdefault.jpg`}
            alt="Match highlights"
            fill
            className="object-cover opacity-60"
          />
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 grid place-items-center"
            aria-label="Play video"
          >
            <span className="grid size-16 place-items-center rounded-full bg-red shadow-[0_0_30px_rgba(225,29,46,.4)]">
              <CirclePlay />
            </span>
          </button>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate min-h-[680px] overflow-hidden px-5 lg:px-10">
          <div className="absolute inset-0 -z-10">
            <CoverImage
              src="/blaze-player.png"
              alt="Blaze FC player"
              className="object-center opacity-65"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_10%,rgba(10,10,10,.72)_50%,rgba(10,10,10,.12))]" />
          </div>
          <div className="mx-auto flex min-h-[680px] max-w-[1440px] items-end pb-20">
            <div>
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.3em] text-red-bright">
                <span className="h-px w-10 bg-red" /> Academy football,
                redefined
              </p>
              <h1 className="max-w-4xl font-heading text-7xl font-black uppercase leading-[.82] tracking-tight sm:text-9xl">
                Built for
                <br />
                <span className="text-red">the next</span>
                <br />
                moment.
              </h1>
              <p className="mt-8 max-w-lg text-base leading-7 text-white/65">
                A player-first academy creating the standards and confidence for
                ambitious young footballers to take their next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/players">
                  Meet the players <ArrowRight />
                </Button>
                <Button href="/trials" secondary>
                  Book a trial
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-16 w-full bg-black [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10">
          <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
            <StatCard value="42" label="Players developing" />
            <StatCard value="3" label="Teams competing" />
            <StatCard value="18" label="Trophies won" trend="+4 this season" />
            <StatCard value="12" label="Years of purpose" />
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
                The squad
              </p>
              <h2 className="font-heading text-6xl font-black uppercase leading-none">
                Faces of
                <br />
                <span className="text-white/30">the future.</span>
              </h2>
            </div>
            <Link
              href="/players"
              className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-white sm:flex"
            >
              View all <ArrowRight />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {players.slice(0, 3).map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </section>

        <section className="bg-surface px-5 py-16 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
                  On the calendar
                </p>
                <h2 className="font-heading text-5xl font-black uppercase">
                  results
                </h2>
              </div>
              <CalendarDays className="text-red" />
            </div>
            <div>
              {matches.slice(0, 4).map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:px-10">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
              Matchday film
            </p>
            <h2 className="font-heading text-6xl font-black uppercase leading-none">
              See it.
              <br />
              <span className="text-red">Feel it.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted">
              Watch the latest action from the academy and see what it means to
              compete with belief.
            </p>
          </div>
          <Video url={matches[0].youtubeUrl} />
        </section>

        <section className="border-y border-red/30 bg-red px-5 py-16 text-center lg:px-10">
          <h2 className="font-heading text-6xl font-black uppercase leading-none sm:text-8xl">
            Ready to make
            <br />
            your mark?
          </h2>
          <div className="mt-8">
            <Button href="/trials" secondary>
              Apply for a trial <ArrowRight />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Players                                                             */
/* ------------------------------------------------------------------ */

function PlayersPage() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')

  const list = players.filter(
    (p) =>
      (filter === 'All' || p.position === filter) &&
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <>
      <Header />
      <PageHeader
        eyebrow="The roster"
        title="Meet the players"
        description="The people, personalities, and potential powering Blaze FC forward."
      />
      <main className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', 'GK', 'DEF', 'MID', 'FWD'].map((x) => (
              <button
                key={x}
                onClick={() => setFilter(x)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                  filter === x
                    ? 'bg-white text-black'
                    : 'border border-white/15 text-muted'
                }`}
              >
                {x}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 border-b border-white/15 py-2 text-muted">
            <Search />
            <input
              aria-label="Search players"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search players"
              className="w-44 bg-transparent text-sm text-white outline-none placeholder:text-muted"
            />
          </label>
        </div>
        <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted">
          {list.length} players shown
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
        {!list.length && (
          <div className="border border-white/10 bg-surface p-12 text-center text-muted">
            No players match those filters.
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

function PlayerPage({ slug }: { slug: string }) {
  const player = players.find((p) => p.slug === slug) || players[0]
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[440px] overflow-hidden border-b border-white/10">
          <CoverImage
            src={player.photoUrl}
            alt={`${player.firstName} ${player.lastName}`}
            className="object-top opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_10%,rgba(10,10,10,.35),#0a0a0a)]" />
          <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] items-end px-5 pb-12 lg:px-10">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
                {player.positionText} · {player.ageGroup}
              </p>
              <h1 className="font-heading text-7xl font-black uppercase leading-[.8]">
                {player.firstName}
                <br />
                <span className="text-red">{player.lastName}</span>
              </h1>
              <p className="mt-5 text-sm text-muted">
                Squad number {String(player.jerseyNumber).padStart(2, '0')} ·{' '}
                {player.preferredFoot} foot · {player.nationality}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1fr_1.3fr] lg:px-10">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
              Player profile
            </p>
            <h2 className="font-heading text-5xl font-black uppercase">
              Built to
              <br />
              <span className="text-white/30">compete.</span>
            </h2>
            <p className="mt-6 leading-7 text-muted">{player.bio}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <StatCard value={String(player.heightCm)} label="Height cm" />
              <StatCard value={String(player.weightKg)} label="Weight kg" />
              <StatCard value="18" label="Appearances" />
              <StatCard value="7" label="Goals" trend="+2 this season" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-red-bright">
              Highlight reel
            </p>
            <Video url={player.highlightVideoUrl} />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border border-white/10 bg-surface p-5">
                <p className="font-heading text-4xl font-black text-red">86%</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted">
                  Pass completion
                </p>
              </div>
              <div className="border border-white/10 bg-surface p-5">
                <p className="font-heading text-4xl font-black text-green">4</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted">
                  Player of match
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Match detail                                                        */
/* ------------------------------------------------------------------ */

function MatchDetail({ slug }: { slug: string }) {
  const match = matches.find((item) => item.slug === slug) || matches[0]
  return (
    <>
      <Header />
      <PageHeader
        eyebrow="Matchday archive"
        title={`Blaze FC vs ${match.opponent}`}
        description={`${match.date} · ${match.venue} · ${match.homeOrAway}`}
      />
      <main className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 lg:grid-cols-[1.3fr_.7fr] lg:px-10">
        <div className="border border-white/10 bg-surface p-3">
          <Video url={match.youtubeUrl} />
          <div className="p-5">
            <p className="font-heading text-6xl font-black text-red">
              {match.scoreFor === null
                ? '—'
                : `${match.scoreFor} : ${match.scoreAgainst}`}
            </p>
            <p className="mt-4 leading-7 text-muted">{match.report}</p>
          </div>
        </div>
        <aside className="grid content-start gap-4">
          <div className="border border-white/10 bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">
              Fixture
            </p>
            <p className="mt-3 text-lg font-bold">
              {match.homeOrAway} · {match.date}
            </p>
            <p className="mt-2 text-sm text-muted">{match.venue}</p>
          </div>
          <div className="border border-white/10 bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">
              Competition
            </p>
            <p className="mt-3 font-heading text-2xl font-black uppercase">
              {competitions.find((c) => c.id === match.competitionId)?.name ||
                'Friendly'}
            </p>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* News detail                                                         */
/* ------------------------------------------------------------------ */

function NewsDetail({ slug }: { slug: string }) {
  const post = posts.find((item) => item.slug === slug) || posts[0]
  return (
    <>
      <Header />
      <PageHeader
        eyebrow={post.type}
        title={post.title}
        description={post.publishedAt}
      />
      <main className="mx-auto max-w-3xl px-5 py-12 lg:px-10">
        <div className="relative aspect-video overflow-hidden">
          <CoverImage src={post.coverImageUrl} alt={post.title} />
        </div>
        <p className="mt-8 text-lg leading-8 text-muted">{post.body}</p>
        <p className="mt-5 text-lg leading-8 text-muted">
          Blaze FC continues to build an environment where players can compete,
          learn, and grow together. Follow the academy for more updates.
        </p>
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Gallery detail                                                      */
/* ------------------------------------------------------------------ */

function GalleryDetail({ slug }: { slug: string }) {
  const album = albums.find((item) => item.slug === slug) || albums[0]
  return (
    <>
      <Header />
      <PageHeader
        eyebrow="Match gallery"
        title={album.title}
        description={`${album.date} · ${album.imageCount} moments`}
      />
      <main className="mx-auto grid max-w-[1440px] gap-4 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {[31, 32, 33, 34, 35, 36].map((seed, i) => (
          <div
            key={seed}
            className="relative aspect-square overflow-hidden border border-white/10"
          >
            <CoverImage src={photo(seed)} alt={`${album.title} moment ${i + 1}`} />
          </div>
        ))}
        <div className="sm:col-span-2 lg:col-span-3">
          <Video url="https://youtu.be/dQw4w9WgXcQ" />
        </div>
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Collection page (competitions / matches / news / gallery)           */
/* ------------------------------------------------------------------ */

function Collection({
  kind,
}: {
  kind: 'competitions' | 'matches' | 'news' | 'gallery'
}) {
  if (kind === 'competitions') {
    return (
      <>
        <Header />
        <PageHeader
          eyebrow="The season"
          title="Competitions"
          description="Every stage is a chance to set a higher standard."
        />
        <main className="mx-auto grid max-w-[1440px] gap-4 px-5 py-12 md:grid-cols-2 lg:px-10">
          {competitions.map((c) => (
            <Link
              key={c.id}
              href={`/competitions/${c.slug}`}
              className="border border-white/10 bg-surface p-6 transition hover:border-red"
            >
              <div className="flex items-start justify-between">
                <Trophy className="text-red" />
                <span className="border border-green/50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-green">
                  {c.status}
                </span>
              </div>
              <h2 className="mt-14 font-heading text-4xl font-black uppercase">
                {c.name}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted">
                {c.season} · {c.type}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-widest">
                <span>Next match</span>
                <ArrowRight />
              </div>
            </Link>
          ))}
        </main>
        <Footer />
      </>
    )
  }

  if (kind === 'matches') {
    return (
      <>
        <Header />
        <PageHeader
          eyebrow="The archive"
          title="Matchday library"
          description="Every result, report, and highlight from the Blaze FC journey."
        />
        <main className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((m) => (
              <article
                key={m.id}
                className="border border-white/10 bg-surface p-3"
              >
                <Video url={m.youtubeUrl} />
                <div className="p-3">
                  <p className="text-xs uppercase tracking-widest text-red-bright">
                    {m.date}
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-black uppercase">
                    Blaze FC vs {m.opponent}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{m.report}</p>
                  <Link
                    href={`/matches/${m.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    Match details <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (kind === 'news') {
    return (
      <>
        <Header />
        <PageHeader
          eyebrow="From the club"
          title="Latest news"
          description="Stories from training, matchday, and the people who make this place special."
        />
        <main className="mx-auto grid max-w-[1440px] gap-5 px-5 py-12 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/news/${p.slug}`}
              className="group border border-white/10 bg-surface"
            >
              <div className="relative aspect-[1.5] overflow-hidden">
                <CoverImage
                  src={p.coverImageUrl}
                  alt={p.title}
                  className="transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-red-bright">
                  {p.type} · {p.publishedAt}
                </p>
                <h2 className="mt-3 font-heading text-3xl font-black uppercase leading-none">
                  {p.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted">{p.body}</p>
              </div>
            </Link>
          ))}
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <PageHeader
        eyebrow="Inside Blaze"
        title="Gallery"
        description="A look at academy life, matchday energy, and the moments in between."
      />
      <main className="mx-auto grid max-w-[1440px] gap-5 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {albums.map((a) => (
          <Link
            key={a.id}
            href={`/gallery/${a.slug}`}
            className="group relative aspect-square overflow-hidden"
          >
            <CoverImage
              src={a.coverImageUrl}
              alt={a.title}
              className="transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="text-xs uppercase tracking-widest text-red-bright">
                {a.date} · {a.imageCount} images
              </p>
              <h2 className="mt-2 font-heading text-4xl font-black uppercase">
                {a.title}
              </h2>
            </div>
          </Link>
        ))}
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Trials                                                              */
/* ------------------------------------------------------------------ */

function Trials() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Header />
      <PageHeader
        eyebrow="Your next chapter"
        title="Book a trial"
        description="Bring your ambition. We will bring the environment to help it grow."
      />
      <main className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
        <div>
          <h2 className="font-heading text-5xl font-black uppercase">
            What to
            <br />
            <span className="text-red">expect.</span>
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              'A focused technical session',
              'Coaching feedback you can act on',
              'A clear pathway for your next step',
            ].map((x, i) => (
              <div key={x} className="flex gap-4 border-b border-white/10 pb-4">
                <span className="font-heading text-3xl font-black text-red">
                  0{i + 1}
                </span>
                <p className="pt-2 text-sm font-bold uppercase">{x}</p>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="border border-white/10 bg-surface p-6 sm:p-8"
        >
          {sent ? (
            <div className="grid min-h-[420px] place-items-center text-center">
              <CheckCircle2 className="text-green" size={48} />
              <h2 className="mt-5 font-heading text-5xl font-black uppercase">
                Application
                <br />
                <span className="text-green">received.</span>
              </h2>
              <p className="mt-4 text-sm text-muted">
                Our team will be in touch soon.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-red-bright">
                Registration form
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  'Applicant name',
                  'Date of birth',
                  'Guardian name',
                  'Email address',
                  'Phone number',
                ].map((x) => (
                  <label
                    key={x}
                    className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted"
                  >
                    {x}
                    <input
                      required
                      className="border border-white/15 bg-black px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-red"
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted">
                  Position
                  <select className="border border-white/15 bg-black px-3 py-3 text-sm font-normal tracking-normal text-white outline-none">
                    <option>Forward</option>
                    <option>Midfielder</option>
                    <option>Defender</option>
                    <option>Goalkeeper</option>
                  </select>
                </label>
              </div>
              <label className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-widest text-muted">
                Message
                <textarea
                  rows={4}
                  className="border border-white/15 bg-black px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-red"
                />
              </label>
              <label className="mt-5 flex gap-3 text-xs text-muted">
                <input type="checkbox" required className="accent-red" />
                I consent to Blaze FC contacting me about this application.
              </label>
              <button className="mt-7 w-full bg-red px-5 py-4 text-xs font-bold uppercase tracking-widest hover:bg-red-bright">
                Submit application
              </button>
            </>
          )}
        </form>
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Simple page wrapper                                                 */
/* ------------------------------------------------------------------ */

function SimplePage({
  title,
  eyebrow,
  children,
}: {
  title: string
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <PageHeader eyebrow={eyebrow} title={title} />
      <main className="mx-auto max-w-[1440px] px-5 py-14 lg:px-10">
        {children}
      </main>
      <Footer />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Admin auth                                                          */
/* ------------------------------------------------------------------ */

function AdminAuth({ mode }: { mode: 'login' | 'signup' }) {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="mx-auto max-w-md">
        <Logo />
        <div className="mt-16 border border-white/10 bg-surface p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto text-green" size={48} />
              <h1 className="mt-5 font-heading text-4xl font-black uppercase">
                {mode === 'login' ? 'Welcome back' : 'Account created'}
              </h1>
              <Link
                href="/admin"
                className="mt-6 inline-flex bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest"
              >
                Open workspace
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="grid gap-5"
            >
              <p className="text-xs font-bold uppercase tracking-[.24em] text-red-bright">
                Blaze FC admin
              </p>
              <h1 className="font-heading text-5xl font-black uppercase">
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </h1>
              {mode === 'signup' && (
                <Field label="Full name">
                  <input required className={inputClass} />
                </Field>
              )}
              <Field label="Email">
                <input required type="email" className={inputClass} />
              </Field>
              <Field label="Password">
                <input
                  required
                  type="password"
                  minLength={8}
                  className={inputClass}
                />
              </Field>
              <button className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest">
                {mode === 'login' ? 'Sign in' : 'Create admin account'}
              </button>
              <Link
                href={mode === 'login' ? '/admin/signup' : '/admin/login'}
                className="text-center text-xs font-bold uppercase tracking-widest text-muted hover:text-white"
              >
                {mode === 'login'
                  ? 'Need an account? Sign up'
                  : 'Already registered? Sign in'}
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Admin dashboard                                                     */
/* ------------------------------------------------------------------ */

function Admin() {
  const [section, setSection] = useState('Dashboard')
  const [role, setRole] = useState('admin')

  const menu = [
    ['Dashboard', LayoutDashboard],
    ['Players', Users],
    ['Matches', CalendarDays],
    ['Competitions', Trophy],
    ['News', ClipboardList],
    ['Gallery', ImagePlus],
    ['Coaches', Users],
    ['Enquiries', Mail],
    ['Trials', Shield],
  ] as const

  return (
    <div className="min-h-screen bg-black">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-surface p-5 lg:block">
          <Logo />
          <p className="mb-4 mt-12 text-[10px] font-bold uppercase tracking-[.24em] text-muted">
            Workspace
          </p>
          <nav className="grid gap-1">
            {menu.map(([label, Icon]) => (
              <button
                key={label}
                onClick={() => setSection(label)}
                className={`flex items-center gap-3 px-3 py-3 text-left text-xs font-bold uppercase tracking-widest ${
                  section === label
                    ? 'bg-red text-white'
                    : 'text-muted hover:bg-surface-2 hover:text-white'
                }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-10 border-t border-white/10 pt-5">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-muted"
            >
              ← View public site
            </Link>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-white/10 bg-surface px-5 py-4 lg:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-muted">
                Blaze FC / Admin
              </p>
              <h1 className="font-heading text-3xl font-black uppercase">
                {section}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="hidden border border-white/15 bg-black px-3 py-2 text-xs uppercase tracking-widest text-muted sm:block"
              >
                <option value="admin">Admin view</option>
                <option value="coach">Coach view</option>
                <option value="editor">Editor view</option>
              </select>
              <div className="grid size-9 place-items-center bg-red text-xs font-black">
                AM
              </div>
            </div>
          </header>
          <div className="p-5 lg:p-8">
            {section === 'Dashboard' ? (
              <Dashboard />
            ) : (
              <AdminWorkspace section={section} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard value="42" label="Total players" trend="+3 this month" />
        <StatCard value="3" label="Active competitions" />
        <StatCard value="24" label="Matches this season" />
        <StatCard value="8" label="New enquiries" trend="+18% this week" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="border border-white/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                Enquiries over time
              </p>
              <p className="mt-1 font-heading text-3xl font-black">126 total</p>
            </div>
            <span className="text-xs font-bold text-green">+18.4%</span>
          </div>
          <div className="mt-8 flex h-52 items-end gap-3 border-b border-l border-white/10 px-3">
            {chartData.map((d) => (
              <div
                key={d.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-red transition hover:bg-red-bright"
                  style={{ height: `${d.enquiries * 5}px` }}
                />
                <span className="text-[10px] text-muted">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-white/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">
              Recent enquiries
            </p>
            <Mail className="text-red" />
          </div>
          <div className="mt-5 grid gap-4">
            {enquiries.slice(0, 4).map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div>
                  <p className="text-sm font-bold">{e.name}</p>
                  <p className="mt-1 text-xs text-muted">{e.email}</p>
                </div>
                <span
                  className={`size-2 rounded-full ${
                    e.status === 'new' ? 'bg-green' : 'bg-white/20'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border border-white/10 bg-surface p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            Upcoming fixtures
          </p>
          <Link
            href="/matches"
            className="text-xs font-bold uppercase tracking-widest text-red-bright"
          >
            View all
          </Link>
        </div>
        <div className="mt-4">
          {matches.slice(8, 11).map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export function BlazeHome({ initialPath = '/' }: { initialPath?: string }) {
  const path = initialPath || '/'

  if (path === '/admin/login') return <AdminAuth mode="login" />
  if (path === '/admin/signup') return <AdminAuth mode="signup" />
  if (path.startsWith('/admin')) return <Admin />

  if (path.startsWith('/matches/') && path.split('/').length > 2)
    return <MatchDetail slug={path.split('/')[2]} />
  if (path.startsWith('/news/') && path.split('/').length > 2)
    return <NewsDetail slug={path.split('/')[2]} />
  if (path.startsWith('/gallery/') && path.split('/').length > 2)
    return <GalleryDetail slug={path.split('/')[2]} />

  if (path === '/players') return <PlayersPage />
  if (path.startsWith('/players/')) return <PlayerPage slug={path.split('/')[2]} />

  if (path === '/coaches')
    return (
      <SimplePage eyebrow="The staff" title="Meet the coaches">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <article
              key={coach.id}
              className="border border-white/10 bg-surface p-3"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={coach.photoUrl}
                  alt={coach.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-red-bright">
                  {coach.team}
                </p>
                <h2 className="mt-2 font-heading text-3xl font-black uppercase">
                  {coach.name}
                </h2>
                <p className="mt-1 text-sm font-bold text-white">{coach.role}</p>
                <p className="mt-4 text-sm leading-6 text-muted">{coach.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </SimplePage>
    )

  if (path === '/competitions' || path.startsWith('/competitions/'))
    return <Collection kind="competitions" />
  if (path === '/matches' || path.startsWith('/matches/'))
    return <Collection kind="matches" />
  if (path === '/news' || path.startsWith('/news/'))
    return <Collection kind="news" />
  if (path === '/gallery' || path.startsWith('/gallery/'))
    return <Collection kind="gallery" />

  if (path === '/trials') return <Trials />

  if (path === '/about')
    return (
      <SimplePage eyebrow="The club" title="More than football">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-6xl font-black uppercase">
              Train with
              <br />
              <span className="text-red">purpose.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted">
              Blaze FC is a player-first academy built to give ambitious young
              footballers the standards, support, and stage to take their next
              step.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Compete with belief.',
              'Own your growth.',
              'Play for each other.',
              'Leave a legacy.',
            ].map((x, i) => (
              <div key={x} className="border border-white/10 bg-surface p-6">
                <p className="font-heading text-4xl font-black text-red">
                  0{i + 1}
                </p>
                <h3 className="mt-10 font-heading text-2xl font-black uppercase">
                  {x}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </SimplePage>
    )

  if (path === '/contact')
    return (
      <SimplePage eyebrow="Get in touch" title="Contact the academy">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid gap-4">
            <div className="border border-white/10 bg-surface p-6">
              <Mail className="text-red" />
              <p className="mt-8 text-xs uppercase tracking-widest text-muted">
                Email
              </p>
              <p className="mt-2 font-heading text-3xl font-black">
                hello@blazefc.com
              </p>
            </div>
            <div className="border border-white/10 bg-surface p-6">
              <MapPin className="text-red" />
              <p className="mt-8 text-xs uppercase tracking-widest text-muted">
                Training centre
              </p>
              <p className="mt-2 font-heading text-3xl font-black">
                NG
              </p>
            </div>
          </div>
          <Trials />
        </div>
      </SimplePage>
    )

  return <Home />
}