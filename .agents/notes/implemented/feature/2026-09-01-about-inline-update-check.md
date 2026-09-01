# Agent Note: inline update check on the About page

Status: implemented

English | [中文](2026-09-01-about-inline-update-check.zh.md)

## Problem

The Settings About page's only update affordance was a button that opened
the separate software-update window. Issue #178's acceptance criteria ask
for "an explicit status when no update exists" — with the check living in
another window, the About page itself never answered whether one is current,
so the criterion was unmet on the page that was built for it.

The earlier note ([Settings About page](2026-08-31-settings-about-page.md))
had rejected exposing the full `DesktopUpdateBridge` to the main window, so
this gap stayed closed until a narrower seam existed.

## Decision

The main process exposes a read-mostly projection of the update state to
the main window: `desktop:about-update:get-state` (snapshot),
`desktop:about-update:check` (trigger a check), and a
`desktop:about-update:state` push that mirrors changes. All three are
gated to the main window's webContents, mirroring the marketplace
channels. The projection type, `AboutUpdateSnapshot`, keeps only what the
page renders — status, current/latest version, error — and deliberately
omits release notes, download progress, and every command but `check`.

`window.dshDesktop.aboutUpdate` carries the three calls; the About page's
update card renders an inline status line and a state-driven button:
"Check for updates" when idle or after a failed check, disabled
"Checking..." while in flight, "Open updater" when an update is available
or downloaded (downloads and installs still happen only inside the
sandboxed update window), and an up-to-date notice when nothing is
offered. Web renders no update card (no desktop bridge), as before.

## Alternatives considered

**Expose the full `DesktopUpdateBridge` to the main window** so the page
could also download and install inline. Rejected again, for the same
reasons as before: it widens the trusted IPC surface and duplicates the
update window's presentation. The narrow projection gives #178 what it
actually asks for without either cost.

**Reuse the gated `desktop:update:get-state`/`command` channels and relax
`assertUpdateWindowSender` to accept the main window.** Rejected: it
would turn the update window's exclusive gate into a two-sender surface,
weakening the isolation the earlier note preserved.

**Have the About page open the update window automatically after a
check.** Rejected: a window appearing unbidden is hostile; the user
chooses when to leave the page.

## Consequences

- The About page now satisfies #178's "explicit status when no update"
  criterion in place: idle/checking/up-to-date/available/error are all
  rendered inline, and `available`/`downloaded` deep-link to the update
  window where the privileged actions live.
- Three new main-window IPC channels exist, each sender-checked to the
  main window; the update window's own channels remain exclusively its
  own. The projection cannot start downloads or installs.
- The projection collapses several update-window states
  (`scheduled` → `downloaded`, `cancelled`/`unsupported`/terminal `error`
  → `idle`) so the card never shows a dead end; the update window keeps
  the full state machine.
- `tests/about-page.test.ts` pins the projection: the two channels exist,
  no `desktop:about-update:command` may exist, and the plugin sources call
  only `check`, never download/install.

## Testing

- `pnpm run typecheck`, `pnpm test` (283 pass; the 9 failures are the
  pre-existing Windows symlink-EPERM cases), and `pnpm run build` pass
  with the projection wired through contracts, preload, main, and the
  About client.
- `tests/about-page.test.ts` gains the read-mostly projection test above.
