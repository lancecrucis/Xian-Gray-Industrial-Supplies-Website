import type { AnchorHTMLAttributes } from 'react'
export function Button({ children, className = '', variant = 'primary', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'secondary' | 'dark' }) {
  return <a className={`button button-${variant} ${className}`} {...props}>{children}</a>
}
