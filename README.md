# Xian & Gray Industrial Supplies

Responsive single-page company website for Xian & Gray Industrial Supplies, built with React 19, Vite 8, TypeScript, and custom CSS.

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

- Business-focused landing section with a technical grid and product imagery
- Eight product categories with optimized WebP imagery
- Company overview and sourcing benefits
- Company profile access by link or QR code
- Three-step inquiry process
- Direct product inquiry form
- Responsive navigation, layouts, and one-time scroll reveals

Company details are stored in `src/data/company.ts`, product information is in `src/data/products.ts`, and the main visual system is in `src/styles/globals.css`.

## Contact form

The inquiry form submits to the configured public Formspree endpoint. To override it for another environment, create `.env.local`:

```env
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/mnpjrvwv
```

Set the same environment variable in the production hosting provider when a different endpoint is required.

## Accessibility and motion

The site includes semantic landmarks, a skip link, labeled form controls, visible keyboard focus, status announcements, and reduced-motion support. Scroll reveal animations run once per page load.
