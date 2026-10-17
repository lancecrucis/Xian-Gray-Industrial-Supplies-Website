# Xian & Gray Industrial Supplies

Responsive single-page company website for Xian & Gray Industrial Supplies, built with React 19, Vite 8, TypeScript, Tailwind CSS 4, and custom CSS.

## Development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Website structure

- Logo-led landing section with a technical grid background
- Scroll-driven sticky parallax transition into the product catalogue
- Eight product categories with optimized WebP imagery
- Company overview and sourcing benefits
- Three-step inquiry process
- Direct product inquiry form
- Responsive navigation, layouts, and one-time scroll reveals

Company details are stored in `src/data/company.ts`, product information is in `src/data/products.ts`, and the main visual system is in `src/styles/globals.css`.

## Contact form

The inquiry form submits directly to a configured form endpoint. Create `.env.local` for local development:

```env
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

Set the same environment variable in the production hosting provider before deploying. Without an endpoint, the site displays an unavailable message instead of opening an email application or claiming the inquiry was sent.

## Accessibility and motion

The site includes semantic landmarks, a skip link, labeled form controls, visible keyboard focus, status announcements, and reduced-motion support. Scroll reveal animations run once per page load. The catalogue transition uses a sticky, scroll-driven parallax scene.
