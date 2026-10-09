'use client'

import { useState } from 'react'
import { ActionOverlay } from './action-overlay'
import {
  ArrowRight, Bell, BriefcaseBusiness, CalendarDays, Check, ChevronRight,
  CircleDollarSign, Clock3, Construction, Home, MapPin, MessageCircle,
  Search, ShieldCheck, Sparkles, Star, Sun, Moon, UserRound, Wrench, X
} from 'lucide-react'

type Tab = 'home' | 'jobs' | 'activity' | 'account'

const trades = [
  { name: 'Construction', icon: Construction, tone: 'sand' },
  { name: 'Electrical', icon: Sparkles, tone: 'blue' },
  { name: 'Automotive', icon: Wrench, tone: 'slate' },
  { name: 'Fabrication', icon: BriefcaseBusiness, tone: 'rose' },
]

const nearby = [
  { name: 'Ayo Adeyemi', trade: 'Electrical & Electronics', rating: '4.9', distance: '1.2 km', initials: 'AA', color: 'navy' },
  { name: 'Chika Okafor', trade: 'Construction & Civil', rating: '4.8', distance: '2.4 km', initials: 'CO', color: 'gold' },
  { name: 'Tunde Bello', trade: 'Mechanical & Automotive', rating: '4.9', distance: '3.1 km', initials: 'TB', color: 'blue' },
]

export function RemoteArtisanApp() {
  const [tab, setTab] = useState<Tab>('home')
  const [mode, setMode] = useState<'customer' | 'artisan'>('customer')
  const [showSearch, setShowSearch] = useState(false)
  const [toast, setToast] = useState('')
  const [overlay, setOverlay] = useState<'menu' | 'services' | 'map' | 'bid' | 'profile' | 'help' | 'payments' | 'rate' | 'job' | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<(typeof nearby)[number] | null>(null)
  const [selectedJob, setSelectedJob] = useState('')
  const [jobFilter, setJobFilter] = useState<'All' | 'In progress' | 'Completed'>('All')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <main className={theme === 'dark' ? 'app-stage dark-theme' : 'app-stage'}>
      <aside className="desktop-rail">
        <div className="brand-mark"><span>R</span></div>
        <div className="rail-label">REMOTE<br />ARTISAN</div>
        <nav className="rail-nav" aria-label="Main navigation">
          {([['home', Home, 'Home'], ['jobs', BriefcaseBusiness, 'My jobs'], ['activity', Clock3, 'Activity'], ['account', UserRound, 'Account']] as const).map(([id, Icon, label]) => (
            <button className={tab === id ? 'rail-link active' : 'rail-link'} key={id} onClick={() => setTab(id)}><Icon size={19} /><span>{label}</span></button>
          ))}
        </nav>
        <div className="rail-bottom"><ShieldCheck size={17} /><span>Verified<br />marketplace</span></div>
      </aside>

      <section className="phone-shell">
        <header className="topbar">
          <div className="mobile-brand"><span>meortra</span></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Search" onClick={() => setShowSearch(!showSearch)}><Search size={19} /></button>
            <button className="icon-button theme-toggle" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><button className="icon-button notification" aria-label="Notifications" onClick={() => notify('You have 2 new updates')}><Bell size={19} /><i /></button>
            <button className="avatar" onClick={() => setTab('account')} aria-label="Open profile">JD</button>
          </div>
        </header>

        {showSearch && <div className="search-panel"><Search size={17} /><input autoFocus placeholder="Search artisans, services..." /><button onClick={() => setShowSearch(false)}><X size={16} /></button></div>}

        <div className="content-scroll">
          {tab === 'home' && <HomeView mode={mode} setMode={setMode} notify={notify} openOverlay={setOverlay} selectPerson={setSelectedPerson} />}
          {tab === 'jobs' && <JobsView notify={notify} openOverlay={setOverlay} selectJob={setSelectedJob} filter={jobFilter} setFilter={setJobFilter} />}
          {tab === 'activity' && <ActivityView openOverlay={setOverlay} />}
          {tab === 'account' && <AccountView mode={mode} setMode={setMode} notify={notify} openOverlay={setOverlay} />}
        </div>

        {overlay && <ActionOverlay type={overlay} person={selectedPerson} job={selectedJob} close={() => setOverlay(null)} notify={notify} />}

        <nav className="bottom-nav" aria-label="Mobile navigation">
          {([['home', Home, 'Home'], ['jobs', BriefcaseBusiness, 'Jobs'], ['activity', Clock3, 'Activity'], ['account', UserRound, 'Account']] as const).map(([id, Icon, label]) => (
            <button key={id} className={tab === id ? 'bottom-link active' : 'bottom-link'} onClick={() => setTab(id)}><Icon size={20} /><span>{label}</span></button>
          ))}
        </nav>
        {toast && <div className="toast"><Check size={16} /> {toast}</div>}
      </section>
    </main>
  )
}

function HomeView({ mode, setMode, notify, openOverlay, selectPerson }: { mode: 'customer' | 'artisan'; setMode: (m: 'customer' | 'artisan') => void; notify: (m: string) => void; openOverlay: (o: 'services' | 'map' | 'profile' | 'bid') => void; selectPerson: (p: (typeof nearby)[number]) => void }) {
  return <>
    <section className="welcome-row"><div><p className="eyebrow">Tuesday, October 7</p><h1>Good morning, <strong>Jordan</strong></h1></div><div className="weather-dot" /></section>
    <div className="mode-switch"><button className={mode === 'customer' ? 'selected' : ''} onClick={() => setMode('customer')}>Find an artisan</button><button className={mode === 'artisan' ? 'selected' : ''} onClick={() => setMode('artisan')}>My artisan profile</button></div>
    {mode === 'customer' ? <>
      <section className="hero-card"><div className="hero-copy"><span className="hero-kicker"><ShieldCheck size={13} /> Safe, skilled & nearby</span><h2>Get it fixed.<br /><em>Get life moving.</em></h2><p>Book a verified professional for your next project.</p><button className="primary-button" onClick={() => openOverlay('services')}>Post a job <ArrowRight size={16} /></button></div><div className="hero-orb"><Wrench size={38} /></div></section>
      <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Quick start</p><h3>What do you need?</h3></div><button className="see-all" onClick={() => openOverlay('services')}>See all <ChevronRight size={15} /></button></div><div className="trade-grid">{trades.map(({ name, icon: Icon, tone }) => <button className="trade-tile" key={name} onClick={() => notify(`${name} request selected`)}><span className={`trade-icon ${tone}`}><Icon size={22} /></span><span>{name}</span></button>)}</div></section>
      <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Recommended for you</p><h3>Top near you</h3></div><button className="see-all" onClick={() => openOverlay('map')}>View map <MapPin size={14} /></button></div><div className="artisan-list">{nearby.map((person) => <article className="artisan-card" key={person.name}><div className={`person-avatar ${person.color}`}>{person.initials}<span className="online" /></div><div className="artisan-info"><div className="name-line"><h4>{person.name}</h4><ShieldCheck size={15} /></div><p>{person.trade}</p><div className="meta-line"><span><Star size={13} fill="currentColor" /> {person.rating}</span><span><MapPin size={12} /> {person.distance}</span></div></div><button className="round-arrow" aria-label={`View ${person.name}`} onClick={() => { selectPerson(person); openOverlay('profile') }}><ChevronRight size={17} /></button></article>)}</div></section>
    </> : <ArtisanDashboard notify={notify} openOverlay={openOverlay} />}
  </>
}

function ArtisanDashboard({ notify, openOverlay }: { notify: (m: string) => void; openOverlay: (o: 'bid') => void }) { return <><section className="earnings-card"><div><p className="eyebrow light">Your earnings</p><strong>$1,284.60</strong><p className="muted-light">Available Wednesday, Oct 15</p></div><CircleDollarSign size={36} /></section><div className="stat-row"><div><span>Active jobs</span><strong>3</strong></div><div><span>This month</span><strong>$2,940</strong></div><div><span>Rating</span><strong>4.9 <Star size={13} fill="currentColor" /></strong></div></div><section className="section-block"><div className="section-heading"><div><p className="eyebrow">Matching your skills</p><h3>New job requests</h3></div><span className="count-badge">3 new</span></div><div className="request-card"><div className="request-top"><div><h4>Install ceiling lights</h4><p><MapPin size={12} /> Lekki Phase 1 · 2.1 km</p></div><strong>$120–180</strong></div><div className="request-footer"><span><Clock3 size={13} /> Ends in 6 days</span><button onClick={() => openOverlay('bid')}>View & bid <ArrowRight size={14} /></button></div></div><div className="request-card"><div className="request-top"><div><h4>Repair kitchen sockets</h4><p><MapPin size={12} /> Ikoyi · 4.8 km</p></div><strong>$90–140</strong></div><div className="request-footer"><span><Clock3 size={13} /> Ends in 5 days</span><button onClick={() => openOverlay('bid')}>View & bid <ArrowRight size={14} /></button></div></div></section></> }

function JobsView({ notify, openOverlay, selectJob, filter, setFilter }: { notify: (m: string) => void; openOverlay: (o: 'services' | 'job') => void; selectJob: (j: string) => void; filter: 'All' | 'In progress' | 'Completed'; setFilter: (f: 'All' | 'In progress' | 'Completed') => void }) { const jobs = [{ title: 'Bathroom plumbing', artisan: 'Samuel Johnson', status: 'In progress', price: '$240', date: 'Today, 10:00 AM', color: 'blue' }, { title: 'Paint 2-bedroom flat', artisan: 'Chika Okafor', status: 'Completed', price: '$560', date: 'Sep 28, 2026', color: 'gold' }, { title: 'AC maintenance', artisan: 'Tunde Bello', status: 'Completed', price: '$85', date: 'Sep 16, 2026', color: 'navy' }] as const; const visibleJobs = filter === 'All' ? jobs : jobs.filter((j) => j.status === filter); return <><div className="page-title"><p className="eyebrow">Your activity</p><h1>My jobs</h1></div><div className="filter-row">{(['All', 'In progress', 'Completed'] as const).map((item) => <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item} <span>{item === 'All' ? jobs.length : jobs.filter((j) => j.status === item).length}</span></button>)}</div><div className="job-list">{visibleJobs.map((job) => <button className="job-card job-card-button" key={job.title} onClick={() => { selectJob(job.title); openOverlay('job') }}><Job {...job} /></button>)}</div><button className="outline-button" onClick={() => openOverlay('services')}><span>+</span> Post another job</button></> }
function Job({ title, artisan, status, price, date, color }: { title: string; artisan: string; status: string; price: string; date: string; color: string }) { return <article className="job-card"><div className={`person-avatar small ${color}`}>{artisan.split(' ').map((x) => x[0]).join('')}</div><div className="job-info"><div className="name-line"><h4>{title}</h4><span className={status === 'Completed' ? 'status complete' : 'status'}>{status}</span></div><p>{artisan} · {date}</p><strong>{price}</strong></div><ChevronRight size={16} className="job-chevron" /></article> }
function ActivityView({ openOverlay }: { openOverlay: (o: 'rate') => void }) { return <><div className="page-title"><p className="eyebrow">Your timeline</p><h1>Activity</h1></div><section className="activity-card"><div className="activity-item"><span className="activity-icon blue"><Check size={15} /></span><div><strong>Job completed</strong><p>Bathroom plumbing · Today</p></div><span className="activity-price">$240</span></div><div className="activity-item"><span className="activity-icon green"><ShieldCheck size={15} /></span><div><strong>Payment secured</strong><p>Funds held safely in escrow</p></div></div><div className="activity-item"><span className="activity-icon gold"><Star size={15} /></span><div><strong>Rate your artisan</strong><p>Share your experience with Samuel</p></div><button className="text-button" onClick={() => openOverlay('rate')}>Rate</button></div></section><div className="trust-panel"><ShieldCheck size={22} /><div><strong>Your payments are protected</strong><p>Funds are only released when you approve the completed work.</p></div></div></> }
function AccountView({ mode, setMode, notify, openOverlay }: { mode: 'customer' | 'artisan'; setMode: (m: 'customer' | 'artisan') => void; notify: (m: string) => void; openOverlay: (o: 'help' | 'payments' | 'profile') => void }) { return <><div className="profile-header"><div className="profile-avatar">JD</div><div><p className="eyebrow">Your account</p><h1>Jordan Davis</h1><p>Lagos, Nigeria · Member since 2024</p></div><button className="icon-button" onClick={() => openOverlay('profile')} aria-label="Edit profile"><ChevronRight size={18} /></button></div><div className="verification-banner"><ShieldCheck size={20} /><div><strong>Identity verified</strong><p>Your account is protected and ready to book.</p></div><Check size={16} /></div><div className="account-menu"><button onClick={() => { setMode(mode === 'customer' ? 'artisan' : 'customer'); notify('Profile mode switched') }}><UserRound size={18} /><span>Switch to {mode === 'customer' ? 'artisan' : 'customer'} mode</span><ChevronRight size={16} /></button><button onClick={() => openOverlay('help')}><MessageCircle size={18} /><span>Help & support</span><ChevronRight size={16} /></button><button onClick={() => openOverlay('payments')}><CalendarDays size={18} /><span>Payment methods</span><ChevronRight size={16} /></button></div><button className="signout" onClick={() => notify('You have been signed out')}>Sign out</button></> }

export default RemoteArtisanApp
