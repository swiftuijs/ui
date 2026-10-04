import { projectLinks, siteInfo } from '@/lib/site-info';

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={`border-t border-fd-border text-sm text-fd-muted-foreground ${compact ? 'mt-8 pt-5' : 'mx-auto w-full max-w-6xl px-6 py-8 md:px-8'}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p>
          SwiftUI.js{' '}
          <a
            href={`${siteInfo.repository}/releases/tag/v${siteInfo.version}`}
            className="underline-offset-4 hover:underline"
          >
            v{siteInfo.version}
          </a>
        </p>
        <nav
          aria-label="Project resources"
          className="flex flex-wrap gap-x-5 gap-y-1"
        >
          {projectLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center underline-offset-4 hover:text-fd-foreground hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
