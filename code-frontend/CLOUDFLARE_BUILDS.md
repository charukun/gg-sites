# gg-sites Cloudflare Workers Builds

2026-10-09、Cloudflare MCP/APIでGit接続とmainの自動CIを設定済み。Workerは`gg-sites-ci`、対象は`charukun/gg-sites`の`code-frontend`。既存のGitHub Pagesと正式ドメインは変更しない。`charukun/paralyze-area`とは別リポジトリ。

## 設定

| 設定 | 値 |
| --- | --- |
| Production branch | `main` |
| Root directory | `code-frontend` |
| Build command | `npm install --no-audit --no-fund && CI=false PUBLIC_URL=/ REACT_APP_PAGES_BASE=/ npm run build` |
| Deploy command | `node scripts/cloudflare-verify.mjs stamp build && npx --yes wrangler@4.92.0 deploy --config wrangler.jsonc && node scripts/cloudflare-verify.mjs verify build https://gg-sites-ci.c-okamoto.workers.dev` |
| Build variables | `NODE_VERSION=22`, `SKIP_DEPENDENCY_INSTALL=1` |
| Preview builds | 無効 |
| Build watch paths | `*` |

公開先: https://gg-sites-ci.c-okamoto.workers.dev

初回の自動`npm ci`は、既存のpackage.jsonとpackage-lock.jsonが不整合で失敗した。既存Actionsと同じ`npm install`に明示的にそろえ、Cloudflareの自動依存導入をスキップする設定で復旧。package-lock.json自体を同期済みと扱わない。依存の解決方法は従来通りであり、完全なロック再現性を新たに保証するものではない。

## 公開の受入条件

`cloudflare-verify.mjs`は、git HEADと配信ファイルのSHA-256を`build/_ci-release.json`に記録してから公開する。その後、同じoriginから全ファイルをHTTPで読み戻し、bytes/hashとJS/CSS/WASMのMIMEを検証する。同一originのHTML正規化リダイレクトだけを許可する。失敗はCI失敗になる。

ビルド成功と実機の表示品質は別。CIでPlaywrightやGPUを起動しない。既存GitHub Pagesの公開経路は旧URLを維持するため保持する。

手動でAPI再実行するときは、GETで現在のmain SHAを取得し、`branch`と`commit_hash`の両方をPOSTする。branchだけを渡した最初の呼出しではWORKERS_CI_COMMIT_SHAにブランチ名が入った実例があるため、版の証拠には使わない。API鍵は既存Build tokenを再利用し、Gitやログに値を置かない。

作業と受入結果はCI移行PRに記録する。現在の完了判定はCloudflare Build outcomeとCI_VERIFIEDログを確認する。
