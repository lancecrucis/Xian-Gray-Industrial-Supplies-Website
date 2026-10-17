import type { ReactNode } from 'react'
export function SectionHeading({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return <div className="section-heading"><h2>{title}</h2>{children && <p className="section-description">{children}</p>}</div>
}
