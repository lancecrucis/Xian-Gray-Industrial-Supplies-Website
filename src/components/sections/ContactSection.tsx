import { useState } from 'react'
import type { FormEvent } from 'react'
import { company } from '../../data/company'
import { products } from '../../data/products'
import { Container } from '../ui/Container'

export function ContactSection({ category, onCategoryChange }: { category: string; onCategoryChange: (value: string) => void }) {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [copyStatus, setCopyStatus] = useState('Copy email')
  const formEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(company.email)
      setCopyStatus('Copied')
      window.setTimeout(() => setCopyStatus('Copy email'), 1600)
    } catch {
      setCopyStatus('Copy unavailable')
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    for (const input of Array.from(form.elements)) {
      if ((input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) && input.required && !input.value.trim()) {
        input.setCustomValidity('Please enter a value, not just spaces.'); input.reportValidity(); return
      }
    }
    const formData = new FormData(form)
    if (String(formData.get('company_website') ?? '')) return
    if (!formEndpoint) {
      setStatus('Direct online inquiries are being connected. Please try again shortly.')
      return
    }
    setSending(true)
    setStatus('Sending your inquiry…')
    try {
      const response = await fetch(formEndpoint, { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('Request failed')
      form.reset()
      onCategoryChange('')
      setStatus('Thank you. Your inquiry has been sent to Xian & Gray.')
    } catch {
      setStatus('We could not send your inquiry. Please try again in a moment.')
    } finally {
      setSending(false)
    }
  }
  return <section id="contact" className="section contact-section"><Container className="contact-grid">
    <div className="contact-heading" data-reveal="up"><p>Connect with us</p><h2>Tell us what the work requires.</h2></div>
    <form className="quote-form" data-reveal="up" onSubmit={submit} onChange={() => setStatus('')} onInput={event => { const field = event.target; if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity('') }}>
      <div className="form-intro"><h3>Start your inquiry</h3><p>Required fields marked <span aria-hidden="true">*</span></p></div>
      <label className="honeypot" aria-hidden="true">Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-row"><label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Your full name" required maxLength={100} /></label><label>Company name <span>*</span><input name="company" autoComplete="organization" placeholder="Your company" required maxLength={150} /></label></div>
      <div className="form-row"><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label><label>Phone number <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" maxLength={40} /></label></div>
      <label>Product category <span>*</span><select name="category" required value={category} onChange={event => onCategoryChange(event.target.value)}><option value="" disabled>Select a product category</option>{products.map(product => <option key={product.id}>{product.name}</option>)}<option>Other / sourcing inquiry</option></select></label>
      <label>Message / requirements <span>*</span><textarea name="message" required rows={4} maxLength={1500} placeholder="Products, quantities, specifications, and when you need them…" /></label>
      <p className="form-note" id="email-note">Your inquiry will be sent directly to Xian &amp; Gray.</p>
      <div className="email-fallback"><span>Prefer email?</span><a href={`mailto:${company.email}`}>{company.email}</a><button className="button button-secondary" type="button" onClick={copyEmail}>{copyStatus}</button></div>
      <button className="button button-primary submit-button" type="submit" aria-describedby="email-note" disabled={sending}>{sending ? 'Sending…' : 'Send inquiry'}</button>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  </Container></section>
}
