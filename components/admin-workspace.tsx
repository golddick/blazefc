// 'use client'

// import { useMemo, useState } from 'react'
// import { ImagePlus, Mail, MoreHorizontal, Plus, Save, Upload, X } from 'lucide-react'
// import { albums, coaches, competitions, enquiries, matches, players, trials } from '@/lib/mock-data'

// type Section = 'Players' | 'Matches' | 'Competitions' | 'Enquiries' | 'Trials' | 'Gallery' | 'Coaches'
// type Notice = { text: string } | null
// const inputClass = 'w-full border border-white/15 bg-black px-3 py-3 text-sm text-white outline-none focus:border-red'
// const Field = ({ label, children }: { label: string; children: React.ReactNode }) => <label className="grid gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">{label}{children}</label>
// const Panel = ({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) => <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/70 p-0 backdrop-blur-sm sm:p-5"><div className="max-h-[96vh] w-full overflow-y-auto border border-white/10 bg-surface p-5 shadow-2xl sm:max-w-xl sm:p-7"><div className="mb-7 flex items-start justify-between border-b border-white/10 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-red-bright">Admin workspace</p><h2 className="mt-2 font-heading text-4xl font-black uppercase">{title}</h2></div><button onClick={close} aria-label="Close panel" className="border border-white/15 p-2 text-muted hover:text-white"><X /></button></div>{children}</div></div>
// function AddPanel({ section, close }: { section: Section; close: () => void }) { const [notice, setNotice] = useState<Notice>(null); const title = section === 'Gallery' ? 'gallery album' : section === 'Coaches' ? 'coach' : section.toLowerCase().slice(0,-1); return <Panel title={`Add ${title}`} close={close}><form onSubmit={e => { e.preventDefault(); setNotice({text:`${section === 'Gallery' ? 'Gallery album' : section.slice(0,-1)} saved to the public website.`}) }} className="grid gap-5"><Field label={section === 'Coaches' ? 'Coach name' : section === 'Gallery' ? 'Album title' : 'Name'}><input required className={inputClass} placeholder={section === 'Coaches' ? 'Jordan Ellis' : 'Enter a name'} /></Field>{section === 'Coaches' && <><Field label="Role"><input required className={inputClass} placeholder="Head Coach" /></Field><Field label="Team / squad"><input required className={inputClass} placeholder="U18 Academy" /></Field><Field label="Bio"><textarea className={`${inputClass} min-h-28 resize-y`} /></Field></>}{section === 'Gallery' && <><Field label="Cover image"><input type="file" accept="image/*" className={inputClass} /></Field><Field label="Match highlights video URL"><input type="url" className={inputClass} placeholder="https://youtube.com/..." /></Field><Field label="Album date"><input type="date" className={inputClass} /></Field></>}{section === 'Players' && <><div className="grid gap-5 sm:grid-cols-2"><Field label="Shirt number"><input type="number" min="1" max="99" className={inputClass} /></Field><Field label="Position"><select className={inputClass}><option>GK</option><option>DEF</option><option>MID</option><option>FWD</option></select></Field></div><Field label="Player image"><input type="file" accept="image/*" className={inputClass} /></Field></>}{section === 'Matches' && <><Field label="Opponent"><input required className={inputClass} /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Date"><input type="date" className={inputClass} /></Field><Field label="Venue"><input className={inputClass} /></Field></div><Field label="Fixture type"><select className={inputClass}><option>Friendly</option>{competitions.map(c => <option key={c.id}>{c.name}</option>)}</select></Field></>}{section === 'Competitions' && <><Field label="Season"><input className={inputClass} placeholder="2026/27" /></Field><Field label="Type"><select className={inputClass}><option>League</option><option>Cup</option><option>Tournament</option></select></Field></>}{notice && <p className="text-sm text-green">{notice.text}</p>}<button className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest"><Save className="mr-2 inline" /> Save {title}</button></form></Panel> }
// function MatchPanel({ id, close }: { id: string; close: () => void }) { const match = matches.find(m => m.id === id) || matches[0]; const [notice, setNotice] = useState<Notice>(null); return <Panel title="Update match result" close={close}><form onSubmit={e => {e.preventDefault();setNotice({text:'Score, player of the match and video saved.'})}} className="grid gap-5"><p className="text-sm text-muted">Blaze FC vs {match.opponent} · {match.date}</p><div className="grid gap-5 sm:grid-cols-2"><Field label="Blaze FC score"><input type="number" min="0" defaultValue={match.scoreFor ?? 0} className={inputClass}/></Field><Field label="Opponent score"><input type="number" min="0" defaultValue={match.scoreAgainst ?? 0} className={inputClass}/></Field></div><Field label="Player of the match"><select className={inputClass}>{players.map(p => <option key={p.id}>{p.firstName} {p.lastName}</option>)}</select></Field><Field label="Highlights video URL"><input type="url" defaultValue={match.youtubeUrl} className={inputClass}/></Field><Field label="Match report"><textarea defaultValue={match.report} className={`${inputClass} min-h-28 resize-y`}/></Field>{notice && <p className="text-sm text-green">{notice.text}</p>}<button className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest"><Save className="mr-2 inline"/> Save result</button></form></Panel> }
// function DetailPanel({ section, id, close }: { section: Section; id: string; close: () => void }) { const [reply,setReply]=useState(''); const [notice,setNotice]=useState<Notice>(null); if(section==='Matches') return <MatchPanel id={id} close={close}/>; if(section==='Gallery'){const a=albums.find(x=>x.id===id)||albums[0];return <Panel title={a.title} close={close}><div className="grid gap-5"><Field label="Cover image"><img src={a.coverImageUrl} alt={a.title} className="aspect-video w-full object-cover"/></Field><Field label="Image count"><p className="text-sm text-white">{a.imageCount} uploaded moments</p></Field><button className="border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-widest"><Upload className="mr-2 inline"/> Upload gallery media</button><button className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest">Save gallery changes</button></div></Panel>} if(section==='Coaches'){const c=coaches.find(x=>x.id===id)||coaches[0];return <Panel title={c.name} close={close}><div className="grid gap-5"><Field label="Role"><input defaultValue={c.role} className={inputClass}/></Field><Field label="Team"><input defaultValue={c.team} className={inputClass}/></Field><Field label="Bio"><textarea defaultValue={c.bio} className={`${inputClass} min-h-28`}/></Field><button className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest">Save coach</button></div></Panel>} if(section==='Enquiries'){const e=enquiries.find(x=>x.id===id)||enquiries[0];return <Panel title={e.name} close={close}><div className="grid gap-5"><Field label="Email"><p className="text-sm text-white">{e.email}</p></Field><Field label="Phone"><p className="text-sm text-white">{e.phone}</p></Field><Field label="Full enquiry"><p className="text-sm leading-6 text-muted">{e.message}</p></Field><Field label="Response"><textarea value={reply} onChange={e=>setReply(e.target.value)} className={`${inputClass} min-h-28`}/></Field>{notice&&<p className="text-sm text-green">{notice.text}</p>}<button onClick={()=>setNotice({text:'Reply sent to enquirer.'})} className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest"><Mail className="mr-2 inline"/> Send reply</button></div></Panel>} const t=trials.find(x=>x.id===id)||trials[0]; return <Panel title={t.applicantName} close={close}><div className="grid gap-5"><Field label="Position"><p className="text-sm text-white">{t.position}</p></Field><Field label="Contact email"><p className="text-sm text-white">{t.contactEmail}</p></Field><Field label="Message"><p className="text-sm leading-6 text-muted">{t.message}</p></Field><button className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest">Open trial invitation</button></div></Panel> }
// export function AdminWorkspace({ section }: { section: string }) { const active = (section as Section) || 'Players'; const [selected,setSelected]=useState<string|null>(null); const [showAdd,setShowAdd]=useState(false); const data=useMemo(()=>active==='Players'?players.map(p=>({id:p.id,name:`${p.firstName} ${p.lastName}`,meta:`${p.positionText} · ${p.ageGroup}`,status:p.status})):active==='Matches'?matches.map(m=>({id:m.id,name:`Blaze FC vs ${m.opponent}`,meta:`${m.date} · ${m.venue}`,status:m.scoreFor===null?'upcoming':'complete'})):active==='Competitions'?competitions.map(c=>({id:c.id,name:c.name,meta:`${c.season} · ${c.type}`,status:c.status})):active==='Enquiries'?enquiries.map(e=>({id:e.id,name:e.name,meta:`${e.email} · ${e.phone}`,status:e.status})):active==='Trials'?trials.map(t=>({id:t.id,name:t.applicantName,meta:`${t.position} · ${t.createdAt}`,status:t.status})):active==='Gallery'?albums.map(a=>({id:a.id,name:a.title,meta:`${a.date} · ${a.imageCount} moments`,status:'published'})):coaches.map(c=>({id:c.id,name:c.name,meta:`${c.role} · ${c.team}`,status:c.isActive?'active':'inactive'})),[active]); const label=active==='Gallery'?'album':active==='Coaches'?'coach':active.slice(0,-1).toLowerCase(); return <div className="grid gap-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><p className="text-sm text-muted">Manage the same {active.toLowerCase()} content shown on the public website.</p><button onClick={()=>setShowAdd(true)} className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest"><Plus className="mr-2 inline"/> Add {label}</button></div><div className="border border-white/10 bg-surface"><div className="border-b border-white/10 p-4"><input aria-label={`Search ${active}`} placeholder={`Search ${active.toLowerCase()}`} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted"/></div><div className="divide-y divide-white/10">{data.map(item=><div key={item.id} className="flex items-center justify-between gap-4 p-4 transition hover:bg-surface-2"><div className="min-w-0"><p className="truncate font-bold">{item.name}</p><p className="mt-1 truncate text-xs text-muted">{item.meta}</p></div><div className="flex shrink-0 items-center gap-3"><span className="border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">{item.status}</span><button onClick={()=>setSelected(item.id)} aria-label={`Manage ${item.name}`} className="border border-white/10 p-2 text-muted transition hover:border-red hover:text-white"><MoreHorizontal/></button></div></div>)}</div></div>{selected&&<DetailPanel section={active} id={selected} close={()=>setSelected(null)}/>} {showAdd&&<AddPanel section={active} close={()=>setShowAdd(false)}/>}</div>}
// export default AdminWorkspace















'use client'

import { useMemo, useState } from 'react'
import { ImagePlus, Mail, MoreHorizontal, Plus, Save, Upload, X } from 'lucide-react'
import {
  albums,
  coaches,
  competitions,
  enquiries,
  matches,
  players,
  trials,
} from '@/lib/mock-data'

type Section =
  | 'Players'
  | 'Matches'
  | 'Competitions'
  | 'Enquiries'
  | 'Trials'
  | 'Gallery'
  | 'Coaches'

type Notice = { text: string } | null

const inputClass =
  'w-full border border-white/15 bg-black px-3 py-3 text-sm text-white outline-none focus:border-red'

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

function Panel({
  title,
  close,
  children,
}: {
  title: string
  close: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/70 p-0 backdrop-blur-sm sm:p-5">
      <div className="max-h-[96vh] w-full overflow-y-auto border border-white/10 bg-surface p-5 shadow-2xl sm:max-w-xl sm:p-7">
        <div className="mb-7 flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-red-bright">
              Admin workspace
            </p>
            <h2 className="mt-2 font-heading text-4xl font-black uppercase">
              {title}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Close panel"
            className="border border-white/15 p-2 text-muted hover:text-white"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Add panel                                                           */
/* ------------------------------------------------------------------ */

function AddPanel({
  section,
  close,
}: {
  section: Section
  close: () => void
}) {
  const [notice, setNotice] = useState<Notice>(null)

  const title =
    section === 'Gallery'
      ? 'gallery album'
      : section === 'Coaches'
        ? 'coach'
        : section.toLowerCase().slice(0, -1)

  return (
    <Panel title={`Add ${title}`} close={close}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setNotice({
            text: `${
              section === 'Gallery' ? 'Gallery album' : section.slice(0, -1)
            } saved to the public website.`,
          })
        }}
        className="grid gap-5"
      >
        <Field
          label={
            section === 'Coaches'
              ? 'Coach name'
              : section === 'Gallery'
                ? 'Album title'
                : 'Name'
          }
        >
          <input
            required
            className={inputClass}
            placeholder={section === 'Coaches' ? 'Jordan Ellis' : 'Enter a name'}
          />
        </Field>

        {section === 'Coaches' && (
          <>
            <Field label="Role">
              <input required className={inputClass} placeholder="Head Coach" />
            </Field>
            <Field label="Team / squad">
              <input required className={inputClass} placeholder="U18 Academy" />
            </Field>
            <Field label="Bio">
              <textarea className={`${inputClass} min-h-28 resize-y`} />
            </Field>
          </>
        )}

        {section === 'Gallery' && (
          <>
            <Field label="Cover image">
              <input type="file" accept="image/*" className={inputClass} />
            </Field>
            <Field label="Match highlights video URL">
              <input
                type="url"
                className={inputClass}
                placeholder="https://youtube.com/..."
              />
            </Field>
            <Field label="Album date">
              <input type="date" className={inputClass} />
            </Field>
          </>
        )}

        {section === 'Players' && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Shirt number">
                <input
                  type="number"
                  min="1"
                  max="99"
                  className={inputClass}
                />
              </Field>
              <Field label="Position">
                <select className={inputClass}>
                  <option>GK</option>
                  <option>DEF</option>
                  <option>MID</option>
                  <option>FWD</option>
                </select>
              </Field>
            </div>
            <Field label="Player image">
              <input type="file" accept="image/*" className={inputClass} />
            </Field>
          </>
        )}

        {section === 'Matches' && (
          <>
            <Field label="Opponent">
              <input required className={inputClass} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date">
                <input type="date" className={inputClass} />
              </Field>
              <Field label="Venue">
                <input className={inputClass} />
              </Field>
            </div>
            <Field label="Fixture type">
              <select className={inputClass}>
                <option>Friendly</option>
                {competitions.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
          </>
        )}

        {section === 'Competitions' && (
          <>
            <Field label="Season">
              <input className={inputClass} placeholder="2026/27" />
            </Field>
            <Field label="Type">
              <select className={inputClass}>
                <option>League</option>
                <option>Cup</option>
                <option>Tournament</option>
              </select>
            </Field>
          </>
        )}

        {notice && <p className="text-sm text-green">{notice.text}</p>}

        <button className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest">
          <Save className="mr-2 inline" /> Save {title}
        </button>
      </form>
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Match panel                                                         */
/* ------------------------------------------------------------------ */

function MatchPanel({ id, close }: { id: string; close: () => void }) {
  const match = matches.find((m) => m.id === id) || matches[0]
  const [notice, setNotice] = useState<Notice>(null)

  return (
    <Panel title="Update match result" close={close}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setNotice({
            text: 'Score, player of the match and video saved.',
          })
        }}
        className="grid gap-5"
      >
        <p className="text-sm text-muted">
          Blaze FC vs {match.opponent} · {match.date}
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Blaze FC score">
            <input
              type="number"
              min="0"
              defaultValue={match.scoreFor ?? 0}
              className={inputClass}
            />
          </Field>
          <Field label="Opponent score">
            <input
              type="number"
              min="0"
              defaultValue={match.scoreAgainst ?? 0}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Player of the match">
          <select className={inputClass}>
            {players.map((p) => (
              <option key={p.id}>
                {p.firstName} {p.lastName}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Highlights video URL">
          <input
            type="url"
            defaultValue={match.youtubeUrl}
            className={inputClass}
          />
        </Field>
        <Field label="Match report">
          <textarea
            defaultValue={match.report}
            className={`${inputClass} min-h-28 resize-y`}
          />
        </Field>
        {notice && <p className="text-sm text-green">{notice.text}</p>}
        <button className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest">
          <Save className="mr-2 inline" /> Save result
        </button>
      </form>
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Detail panel                                                        */
/* ------------------------------------------------------------------ */

function DetailPanel({
  section,
  id,
  close,
}: {
  section: Section
  id: string
  close: () => void
}) {
  const [reply, setReply] = useState('')
  const [notice, setNotice] = useState<Notice>(null)

  if (section === 'Matches') return <MatchPanel id={id} close={close} />

  if (section === 'Gallery') {
    const a = albums.find((x) => x.id === id) || albums[0]
    return (
      <Panel title={a.title} close={close}>
        <div className="grid gap-5">
          <Field label="Cover image">
            <img
              src={a.coverImageUrl}
              alt={a.title}
              className="aspect-video w-full object-cover"
            />
          </Field>
          <Field label="Image count">
            <p className="text-sm text-white">{a.imageCount} uploaded moments</p>
          </Field>
          <button className="border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-widest">
            <Upload className="mr-2 inline" /> Upload gallery media
          </button>
          <button className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest">
            Save gallery changes
          </button>
        </div>
      </Panel>
    )
  }

  if (section === 'Coaches') {
    const c = coaches.find((x) => x.id === id) || coaches[0]
    return (
      <Panel title={c.name} close={close}>
        <div className="grid gap-5">
          <Field label="Role">
            <input defaultValue={c.role} className={inputClass} />
          </Field>
          <Field label="Team">
            <input defaultValue={c.team} className={inputClass} />
          </Field>
          <Field label="Bio">
            <textarea
              defaultValue={c.bio}
              className={`${inputClass} min-h-28`}
            />
          </Field>
          <button className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest">
            Save coach
          </button>
        </div>
      </Panel>
    )
  }

  if (section === 'Enquiries') {
    const e = enquiries.find((x) => x.id === id) || enquiries[0]
    return (
      <Panel title={e.name} close={close}>
        <div className="grid gap-5">
          <Field label="Email">
            <p className="text-sm text-white">{e.email}</p>
          </Field>
          <Field label="Phone">
            <p className="text-sm text-white">{e.phone}</p>
          </Field>
          <Field label="Full enquiry">
            <p className="text-sm leading-6 text-muted">{e.message}</p>
          </Field>
          <Field label="Response">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className={`${inputClass} min-h-28`}
            />
          </Field>
          {notice && <p className="text-sm text-green">{notice.text}</p>}
          <button
            onClick={() => setNotice({ text: 'Reply sent to enquirer.' })}
            className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest"
          >
            <Mail className="mr-2 inline" /> Send reply
          </button>
        </div>
      </Panel>
    )
  }

  const t = trials.find((x) => x.id === id) || trials[0]
  return (
    <Panel title={t.applicantName} close={close}>
      <div className="grid gap-5">
        <Field label="Position">
          <p className="text-sm text-white">{t.position}</p>
        </Field>
        <Field label="Contact email">
          <p className="text-sm text-white">{t.contactEmail}</p>
        </Field>
        <Field label="Message">
          <p className="text-sm leading-6 text-muted">{t.message}</p>
        </Field>
        <button className="bg-red px-4 py-3 text-xs font-bold uppercase tracking-widest">
          Open trial invitation
        </button>
      </div>
    </Panel>
  )
}

/* ------------------------------------------------------------------ */
/* Admin workspace                                                     */
/* ------------------------------------------------------------------ */

export function AdminWorkspace({ section }: { section: string }) {
  const active = (section as Section) || 'Players'
  const [selected, setSelected] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const data = useMemo(() => {
    if (active === 'Players')
      return players.map((p) => ({
        id: p.id,
        name: `${p.firstName} ${p.lastName}`,
        meta: `${p.positionText} · ${p.ageGroup}`,
        status: p.status,
      }))
    if (active === 'Matches')
      return matches.map((m) => ({
        id: m.id,
        name: `Blaze FC vs ${m.opponent}`,
        meta: `${m.date} · ${m.venue}`,
        status: m.scoreFor === null ? 'upcoming' : 'complete',
      }))
    if (active === 'Competitions')
      return competitions.map((c) => ({
        id: c.id,
        name: c.name,
        meta: `${c.season} · ${c.type}`,
        status: c.status,
      }))
    if (active === 'Enquiries')
      return enquiries.map((e) => ({
        id: e.id,
        name: e.name,
        meta: `${e.email} · ${e.phone}`,
        status: e.status,
      }))
    if (active === 'Trials')
      return trials.map((t) => ({
        id: t.id,
        name: t.applicantName,
        meta: `${t.position} · ${t.createdAt}`,
        status: t.status,
      }))
    if (active === 'Gallery')
      return albums.map((a) => ({
        id: a.id,
        name: a.title,
        meta: `${a.date} · ${a.imageCount} moments`,
        status: 'published',
      }))
    return coaches.map((c) => ({
      id: c.id,
      name: c.name,
      meta: `${c.role} · ${c.team}`,
      status: c.isActive ? 'active' : 'inactive',
    }))
  }, [active])

  const label =
    active === 'Gallery'
      ? 'album'
      : active === 'Coaches'
        ? 'coach'
        : active.slice(0, -1).toLowerCase()

  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          Manage the same {active.toLowerCase()} content shown on the public
          website.
        </p>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-red px-5 py-3 text-xs font-bold uppercase tracking-widest"
        >
          <Plus className="mr-2 inline" /> Add {label}
        </button>
      </div>

      <div className="border border-white/10 bg-surface">
        <div className="border-b border-white/10 p-4">
          <input
            aria-label={`Search ${active}`}
            placeholder={`Search ${active.toLowerCase()}`}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted"
          />
        </div>
        <div className="divide-y divide-white/10">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 p-4 transition hover:bg-surface-2"
            >
              <div className="min-w-0">
                <p className="truncate font-bold">{item.name}</p>
                <p className="mt-1 truncate text-xs text-muted">{item.meta}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">
                  {item.status}
                </span>
                <button
                  onClick={() => setSelected(item.id)}
                  aria-label={`Manage ${item.name}`}
                  className="border border-white/10 p-2 text-muted transition hover:border-red hover:text-white"
                >
                  <MoreHorizontal />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <DetailPanel
          section={active}
          id={selected}
          close={() => setSelected(null)}
        />
      )}
      {showAdd && <AddPanel section={active} close={() => setShowAdd(false)} />}
    </div>
  )
}

export default AdminWorkspace