# あした、 / ASHITA LETTERS

未来の自分から届いたような日記を読み、同じ未来を選ぶことから出会いを体験する、独立したブラウザアプリです。

## Public preview

https://rawcdn.githack.com/charukun/gg-sites/d62eb37b9be76a5b1d9ebe9433ed7524e1143bac/apps/ashita/index.html

This address pins the application commit. The external CDN may display a confirmation page before opening HTML. Availability is not guaranteed by this repository. The dedicated preview workflow verifies the public response against the locally tested source.

## Isolation

All application files live in `apps/ashita/` on `feat/ashita-future-diary`, based on the existing `dev` branch. No existing application imports, production files, main/dev branch refs, Amplify configuration, or game repositories are changed. Do not merge this preview into the existing business site merely to publish it. The commit-pinned CDN preview does not need a merge.

## Implemented

- Responsive Japanese interface, envelope opening, diary reading, three activity themes.
- User-selected nickname, general area, time, mood; no geolocation collection.
- Selected diary history, self-reported activity checklist, personal notes, browser-local persistence and deletion.
- Calendar ICS generation in Japan Standard Time, data export.
- Two-browser invitation flow: invite link -> recipient's reply link -> sender's confirmation link -> recipient's confirmation display.
- Explicit age self-declaration and disclosure before sharing nickname and plan.
- Strictly labeled fictional conversation sample; no fictitious member count or disguised automatic chat.
- Schema checks, bounded input sizes, HTML escaping, expiry checks and correlation with locally stored invitation records.
- Native dialogs, keyboard closing, reduced-motion support and browser share/clipboard fallbacks.

## Not implemented / not a production dating platform

Member accounts, identity/age verification, stranger discovery, automatic member matching, a shared backend/database, live chat, push/email delivery, moderation, reporting operations and partner venue reservations are not implemented. Diary generation uses authored templates, not an AI API. Encounter preference is saved as a local note, not applied to a matching algorithm. Opening the site is required to receive a diary.

Links are manually exchanged outside this app. Nicknames are self-declared, not authenticated. The link token correlates local records but is not a proof of identity. Link possession exposes the nickname and plan. Links cannot be remotely revoked, and deleting local data does not delete copies held by others. This demonstration is not suitable for confidential information. The shared CDN origin is not a dedicated security boundary for sensitive browser storage.

## Verification

The exact application bytes were checked with Node syntax validation and Chromium DOM interaction tests. The source Git blob SHA is `cb23500919175c671bd9b8f70fd04d28ab233ffb`; SHA-256 is `4ba5ffd0eb1b9a7767c02885a70372f1b1f1bd1f6bcac7279fd1cf484715774c`.

42 targeted checks passed, including opening/selecting diaries, three checklist steps, note escaping, restoration from saved JSON, preferences, complete two-party link exchange, ICS generation, clearly labeled sample chat, dialog closing, malformed links and no horizontal overflow across four pages at 344/390/650/768/1024/1440px. No JavaScript runtime errors occurred in those checks.

The local execution environment blocks URL navigation. Local Chromium tests therefore used in-memory rendering of the exact source, a localStorage test double and a download capture double. They do not establish real deployed-page navigation, real browser-storage permissions, actual clipboard permission or successful file import. Public URL verification is a separate CI smoke check; read its result before claiming live verification.

## Run independently

Open `index.html` in a modern browser, or serve this directory with any static HTTPS host. File-open mode disables creation of web invitation links. There are no external runtime dependencies, font downloads, API keys or build step. No paid service has been provisioned.
