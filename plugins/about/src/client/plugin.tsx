import { useState } from 'react'
import type { DesktopBridge } from '../../../../src/contracts.ts'
import type { LocaleService, Translate } from '../../../shared/i18n.ts'
import aboutCss from './about.css'
import { ABOUT_MESSAGES, type AboutMessage } from './i18n.ts'
import { aboutVersions, type VersionEntry } from './versions.ts'

/** Product version injected by scripts/build.mjs like src/version.ts. */
declare const __OH_DSH_BUILD_VERSION__: string

interface AboutRowProps {
  /** Owner share of a settings section; the shell owns the open state. */
  close(): void
  openUpdater(): void
  t: Translate<AboutMessage>
}

interface SlotsService {
  inject(name: string, register: () => unknown): void
  register(options: {
    id: string
    inject(actions: object): { openUpdater(): void }
    label: () => string
    locale: string
    name: string
    order: number
  }, component: (props: AboutRowProps) => JSX.Element): unknown
}

interface ClientContext {
  effect(effect: () => (() => void) | void, label?: string): void
  get(name: string): unknown
}

declare global {
  interface Window {
    dshDesktop?: DesktopBridge
  }
}

export const inject = ['locale', 'slots']

const SETTINGS_NAMESPACE = 'oh-dsh.about'
const SETTINGS_STYLE_ATTRIBUTE = 'data-oh-dsh-about'
const SETTINGS_SECTION_ORDER = 90

const GITHUB_URL = 'https://github.com/hust-open-atom-club/oh-dsh'
const LICENSE_URL = 'https://github.com/hust-open-atom-club/oh-dsh/blob/main/LICENSE'

/** Inline 16px stroke icons, colored via currentColor. */
function Icon({ path, size = 16 }: { path: string; size?: number }): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="oh-dsh-about-icon"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={path} />
    </svg>
  )
}

const ICON_PACKAGE = 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8'
const ICON_CODE = 'M8 7l-5 5 5 5M16 7l5 5-5 5'
const ICON_PLUG = 'M12 3v6M12 21v-6M5.6 5.6l4.2 4.2M18.4 5.6l-4.2 4.2M9 15h6v3a3 3 0 01-6 0v-3z'
const ICON_CHEVRON = 'M9 6l6 6-6 6'
const ICON_UPDATE = 'M21 12a9 9 0 11-2.6-6.3M21 3v6h-6'

function productVersion(): string {
  return typeof __OH_DSH_BUILD_VERSION__ === 'string'
    ? __OH_DSH_BUILD_VERSION__
    : '0.0.0'
}

function installSettingsStyles(): () => void {
  const style = document.createElement('style')
  style.setAttribute(SETTINGS_STYLE_ATTRIBUTE, 'true')
  style.textContent = aboutCss
  document.head.append(style)
  return () => { style.remove() }
}

function IconChip({ path }: { path: string }): JSX.Element {
  return (
    <span className="oh-dsh-about-chip">
      <Icon path={path} size={15} />
    </span>
  )
}

/** Expandable component row: chevron rotates and the version table unfolds. */
function ComponentRow({ entries, iconPath, t, title, description }: {
  entries: VersionEntry[]
  iconPath: string
  title: AboutMessage
  description: AboutMessage
  t: Translate<AboutMessage>
}): JSX.Element {
  const [open, setOpen] = useState(false)
  return (
    <div className="oh-dsh-about-fold">
      <button
        className="oh-dsh-about-row"
        type="button"
        aria-expanded={open}
        onClick={() => { setOpen(value => !value) }}
      >
        <IconChip path={iconPath} />
        <span className="oh-dsh-about-copy">
          <strong>{t(title)}</strong>
          <small>{t(description)}</small>
        </span>
        <span className={`oh-dsh-about-chevron${open ? ' oh-dsh-about-chevron-open' : ''}`}>
          <Icon path={ICON_CHEVRON} size={14} />
        </span>
      </button>
      {open && (
        <dl className="oh-dsh-about-versions">
          {entries.map(entry => (
            <div className="oh-dsh-about-version" key={entry.id}>
              <dt>{entry.id}</dt>
              <dd>{entry.version}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

function AboutSectionRow({ openUpdater, t }: AboutRowProps): JSX.Element {
  const versions = aboutVersions()
  const desktop = typeof window !== 'undefined' ? window.dshDesktop : undefined
  const desktopAvailable = desktop?.openUpdater !== undefined
  return (
    <div className="oh-dsh-about">
      <header className="oh-dsh-about-hero">
        <div className="oh-dsh-about-mark">Oh</div>
        <h3 className="oh-dsh-about-name">{t('about.product-name')}</h3>
        <p className="oh-dsh-about-subtitle">{t('about.product-subtitle')}</p>
        <span className="oh-dsh-about-badge">
          {t('about.version-badge', { version: productVersion() })}
        </span>
      </header>

      <section className="oh-dsh-about-group">
        <h4>{t('about.section.runtime')}</h4>
        <div className="oh-dsh-about-card">
          <div className="oh-dsh-about-row">
            <IconChip path={ICON_PACKAGE} />
            <span className="oh-dsh-about-copy">
              <strong>{t('about.runtime.dsh')}</strong>
              <small>{t('about.runtime.dsh-description')}</small>
            </span>
            <span className="oh-dsh-about-pill">{versions.sourceVersion}</span>
          </div>
          <div className="oh-dsh-about-row oh-dsh-about-row-divided">
            <IconChip path={ICON_CODE} />
            <span className="oh-dsh-about-copy">
              <strong>{t('about.runtime.package')}</strong>
              <small>{t('about.runtime.package-description')}</small>
            </span>
            <span className="oh-dsh-about-pill">{versions.sourceVersion}</span>
          </div>
        </div>
      </section>

      <section className="oh-dsh-about-group">
        <h4>{t('about.section.components')}</h4>
        <div className="oh-dsh-about-card">
          <ComponentRow
            description="about.components.plugins-description"
            entries={versions.plugins}
            iconPath={ICON_PLUG}
            t={t}
            title="about.components.plugins"
          />
          <ComponentRow
            description="about.components.dependencies-description"
            entries={versions.dependencies}
            iconPath={ICON_PACKAGE}
            t={t}
            title="about.components.dependencies"
          />
        </div>
      </section>

      {desktopAvailable && (
        <section className="oh-dsh-about-group">
          <h4>{t('about.section.update')}</h4>
          <div className="oh-dsh-about-card">
            <div className="oh-dsh-about-row">
              <span className="oh-dsh-about-chip oh-dsh-about-chip-ok">
                <Icon path={ICON_UPDATE} size={15} />
              </span>
              <span className="oh-dsh-about-copy">
                <strong>{t('about.product-name')} {productVersion()}</strong>
                <small>{t('about.update-hint')}</small>
              </span>
              <button
                className="oh-dsh-about-button"
                type="button"
                onClick={() => { openUpdater() }}
              >
                {t('about.update-button')}
              </button>
            </div>
          </div>
        </section>
      )}

      <footer className="oh-dsh-about-footer">
        <div className="oh-dsh-about-links">
          <button className="oh-dsh-about-link" type="button"
            onClick={() => { void desktop?.openExternal(GITHUB_URL) }}>
            <Icon path={ICON_CODE} size={13} />
            {t('about.footer.github')}
          </button>
          <span className="oh-dsh-about-separator">|</span>
          <button className="oh-dsh-about-link" type="button"
            onClick={() => { void desktop?.openExternal(LICENSE_URL) }}>
            <Icon path={ICON_PACKAGE} size={13} />
            {t('about.footer.license')}
          </button>
        </div>
        <p className="oh-dsh-about-copyright">{t('about.footer.copyright')}</p>
      </footer>
    </div>
  )
}

export function apply(ctx: ClientContext): void {
  const locale = ctx.get('locale') as LocaleService
  const slots = ctx.get('slots') as SlotsService

  ctx.effect(
    () => locale.register('oh-dsh.about', ABOUT_MESSAGES),
    'oh-dsh-about: dictionaries',
  )
  ctx.effect(
    () => typeof document === 'undefined' ? undefined : installSettingsStyles(),
    'oh-dsh-about: settings styles',
  )
  const t: Translate<AboutMessage> = locale.bind(SETTINGS_NAMESPACE)

  slots.inject('settings.section', () => slots.register({
    name: 'settings.section',
    id: 'oh-dsh-about',
    order: SETTINGS_SECTION_ORDER,
    locale: 'oh-dsh.about',
    label: () => t('about.title'),
    inject: () => ({
      openUpdater: () => {
        if (typeof window !== 'undefined') void window.dshDesktop?.openUpdater()
      },
    }),
  }, AboutSectionRow))
}
