# gg-sites Cloudflare Workers Builds

既存の `code-frontend` (Create React App) を Cloudflare Workers Builds でビルド・公開する設定。既存の GitHub Pages (`/gg-sites/`) と本番URLは、本PRでは変更せず、別Worker `gg-sites-ci` で比較する。旧 PARALYZE AREA 関連ページと現行の `charukun/paralyze-area` は別リポジトリなので、混同しない。

Cloudflare Workers & Pages で Worker `gg-sites-ci` を作り、Settings → Builds → Git repository `charukun/gg-sites` を接続する。

| 設定 | 値 |
| --- | --- |
| Production branch | `main` |
| Root directory | `code-frontend` |
| Build command | `CI=false PUBLIC_URL=/ REACT_APP_PAGES_BASE=/ npm run build` |
| Deploy command | `npx --yes wrangler@4.92.0 deploy --config wrangler.jsonc` |
| Preview command | `npx --yes wrangler@4.92.0 preview --config wrangler.jsonc` |
| Build variables | `NODE_VERSION=22`。外部APIに必要な公開フロント用変数は別途既存環境と整合させる |
| Build watch paths | `code-frontend/*` の変更に限定する |

依存は `code-frontend/package-lock.json` を使う。Build command はCRAの静的ビルドだけで、Playwright/画面撮影/GPU検査は実行しない。プレビューのアセットURL、ルーティング、Supabase側への接続と権限を実機で確認する。Cloudflare Workerから表示できるだけでなく、本番向け資産のbase pathが変わる点も確認する。

この準備PRで `paralyze-build.yml` の自動ビルドは停止するが、現行GitHub Pagesの公開を担う `paralyze-pages.yml` のpush起動は維持する。Cloudflare Git連携と配信確認が成功し、新URLへの導線を準備してからマージする。GitHub所有の `charukun.github.io/gg-sites/` への配信はマージ後に自動更新されなくなるため、閲覧者向けの切替を別途行う。Supabase endpointの簡易状態確認ワークフローはビルドCIとは別用途なので残す。
