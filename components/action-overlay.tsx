'use client'

import { useState } from 'react'
import { ArrowRight, Check, MapPin, ShieldCheck, Star, X } from 'lucide-react'

type Overlay = 'services' | 'map' | 'menu' | 'bid' | 'profile' | 'help' | 'payments' | 'rate' | 'job'
type Person = { name: string; trade: string; rating: string; distance: string; initials: string }

export function ActionOverlay({ type, person, job, close, notify }: { type: Overlay; person: Person | null; job: string; close: () => void; notify: (message: string) => void }) {
  const [done, setDone] = useState(false)
  const [category, setCategory] = useState('')
  const finish = (message: string) => { setDone(true); notify(message); window.setTimeout(close, 900) }
  const title = type === 'map' ? 'Artisans near you' : type === 'services' ? (category ? `${category} job details` : 'What do you need help with?') : type === 'bid' ? 'Place your bid' : type === 'profile' ? (person?.name ?? 'Your profile') : type === 'help' ? 'How can we help?' : type === 'payments' ? 'Payment methods' : type === 'rate' ? 'Rate your artisan' : job
  return <div className="overlay-backdrop" role="dialog" aria-modal="true" aria-label={title} onClick={close}><section className="action-sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-head"><div><p className="eyebrow">Meortra</p><h2>{title}</h2></div><button className="icon-button" onClick={close} aria-label="Close"><X size={18} /></button></div>{done ? <div className="success-state"><span><Check /></span><h3>Request sent</h3><p>Your request is now open for 7 days. We&apos;ll contact nearby artisans as spaces become available.</p></div> : <OverlayContent type={type} person={person} category={category} setCategory={setCategory} finish={finish} />}</section></div>
}

function JobRequestForm({ category }: { category: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [work, setWork] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const detailsLabel = category === 'Construction' ? 'Rooms, dimensions, materials' : category === 'Plumbing' ? 'Area needed: kitchen, bathroom, shower' : category === 'Electrical' ? 'Number of points, rooms, fittings' : category === 'Painting' ? 'Rooms, wall condition, colour preference' : 'Add useful specifics for the artisan'
  if (submitted) return <div className="bid-preview"><div className="request-status"><span>1</span><div><strong>Request sent to nearby artisans</strong><p>Up to 3 artisans can submit offers.</p></div></div><div className="request-status"><span>7d</span><div><strong>Open for 7 days</strong><p>If nobody accepts, the request closes automatically.</p></div></div><div className="request-status"><span>3</span><div><strong>Compare up to 3 bids</strong><p>See price, rating, distance, and reviews before choosing.</p></div></div></div>
  return <form className="job-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>What work is required?<input value={work} onChange={(event) => setWork(event.target.value)} placeholder={category === 'Construction' ? 'e.g. Build a boundary wall' : `e.g. ${category} repair`} required /></label><label>Describe the task<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Include the area size, access details, and anything important" required /></label><label>{detailsLabel}<input value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Add specifics" /></label><div className="bid-note"><strong>How bidding works</strong><span>We&apos;ll invite 3 nearby artisans. They can accept and submit their price. You choose the best fit based on price and rating.</span></div><button className="primary-button full" type="submit">Send request <ArrowRight size={16} /></button></form>
}

function OverlayContent({ type, person, category, setCategory, finish }: { type: Overlay; person: Person | null; category: string; setCategory: (value: string) => void; finish: (message: string) => void }) {
  if (type === 'services' && !category) return <div className="overlay-grid">{['Construction', 'Electrical', 'Automotive', 'Fabrication', 'Plumbing', 'Painting'].map((item) => <button key={item} className="overlay-option" onClick={() => setCategory(item)}><span>{item.slice(0, 1)}</span><strong>{item}</strong><ArrowRight size={15} /></button>)}</div>
  if (type === 'services' && category) return <JobRequestForm category={category} />
  if (type === 'map') return <><div className="map-preview"><MapPin size={30} /><span>Ayo · 1.2 km</span><span>Chika · 2.4 km</span><span>Tunde · 3.1 km</span></div><button className="primary-button full" onClick={() => finish('Map view saved')}>Use this area <ArrowRight size={16} /></button></>
  if (type === 'profile') return <><div className="overlay-profile"><div className="profile-avatar">{person?.initials ?? 'JD'}</div><div><h3>{person?.name ?? 'Jordan Davis'}</h3><p>{person?.trade ?? 'Customer profile'}</p><span><Star size={13} fill="currentColor" /> {person?.rating ?? 'Verified member'}</span></div></div><button className="primary-button full" onClick={() => finish('Profile changes saved')}>Save profile <Check size={16} /></button></>
  if (type === 'help') return <><p className="overlay-copy">Our support team is available for booking, payments, and account questions.</p><button className="overlay-action" onClick={() => finish('Support chat opened')}>Start support chat <ArrowRight size={15} /></button><button className="overlay-action" onClick={() => finish('Help center opened')}>Browse help center <ArrowRight size={15} /></button></>
  if (type === 'payments') return <><div className="payment-card"><ShieldCheck size={19} /><div><strong>Visa ending 4242</strong><p>Default payment method</p></div><Check size={16} /></div><button className="primary-button full" onClick={() => finish('Payment method added')}>Add payment method <ArrowRight size={16} /></button></>
  if (type === 'rate') return <><div className="rating-row">{[1, 2, 3, 4, 5].map((star) => <button key={star} aria-label={`${star} stars`} onClick={() => finish(`Rated ${star} stars`)}><Star size={29} fill="currentColor" /></button>)}</div><p className="overlay-copy center">Your feedback helps the best artisans stand out.</p></>
  return <><p className="overlay-copy">Add a little more detail, review the request, and we&apos;ll keep you updated.</p><button className="primary-button full" onClick={() => finish(type === 'bid' ? 'Bid submitted successfully' : 'Job details saved')}>{type === 'bid' ? 'Submit bid' : 'View job details'} <ArrowRight size={16} /></button></>
}
