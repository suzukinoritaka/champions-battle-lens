# Battle Lens — 撮るだけダメ計

Pokémon Champions の見せ合い画面を選び、相手6体を確認して、登録パーティとのダメージ・素早さ・タイプ相性を比較する iPhone 向けPWA試作です。

## アプリを開く

<https://suzukinoritaka.github.io/champions-battle-lens/>

iPhoneを横向きにして使用します。Safariの共有メニューから「ホーム画面に追加」すると、アプリのように起動できます。

## v08の機能

- 見せ合い画面のスクリーンショット選択
- Championsのメニュースプライトを使った端末内の相手6体認識
- 色違い・フォルム・メガ候補を含む98画像の照合
- 低信頼時だけOpenAI画像認識へ切り替える任意のAI補助
- Championsの「能力」「ステータス」2枚をAI解析してパーティ作成
- バトメモのパーティ画像1枚をAI解析してパーティ作成
- 日本語テキスト6体分からパーティ作成
- パーティの確認編集・名前変更・複製・削除・新規作成
- iPhone内への保存と計算画面への即時反映
- ダメージ・素早さ・タイプ相性の比較
- 認識結果の個別修正
- パーティデータのiPhone内保存
- 解析結果の信頼度表示と個別修正

## スクリーンショット認識

- 見せ合い画面を6枠に分け、登録済みChampionsアイコンと端末内で照合します。
- 通常の選出画面認識にはAPI利用料がかかりません。
- 信頼度が低い枠がある場合だけ、ホーム画面の設定に従ってAI補助を使用します。
- 現在の端末内認識対象は、提供いただいたスクリーンショットに登場した33種です。
- 実スクリーンショット3枚・相手18枠で18枠一致を確認しています。

## 画像・名称データ

- 名称・図鑑番号・フォルムの照合には [PokéWikiのポケモン一覧](https://www.pokewiki.de/Pok%C3%A9mon-Liste) を参考にしています。
- 認識用画像には [Bulbagarden ArchivesのChampions menu sprites](https://archives.bulbagarden.net/wiki/Category%3AChampions_menu_sprites) を使用しています。
- 各画像の個別ページと元画像URLは `assets/recognition/manifest.json` に記録しています。
- 画像は個人使用・非営利の試作に限って扱い、再配布時は各画像の利用条件を再確認してください。

## AI補助の構成

- Web画面にAPIキーを置かず、Cloudflare Workerを中継します。
- WorkerはOpenAI Responses APIへ画像を送り、厳格なJSON Schemaで6体分を受け取ります。
- OpenAIリクエストは `store: false` です。アプリ／Workerは画像を保存しません。
- 許可したGitHub Pagesのオリジン以外からは解析APIを利用できません。
- モデル既定値は精度優先の `gpt-5.6-sol` です。

## 公開設定

1. `npm install`
2. `npm run worker:deploy`
3. `wrangler secret put OPENAI_API_KEY --config worker/wrangler.toml`
4. 公開されたWorker URLの末尾を除いた値を `config.js` の `analysisApiUrl` に設定
5. `npm run build`

## 注意

- 端末内認識だけならOpenAI API利用料はかかりません。AI補助またはパーティ画像解析にはAPI利用枠が必要です。
- 今回いただいたChampions／バトメモの画面構成に最適化しています。低信頼度の結果は必ず確認してください。
- 相手配分が不明なため、計算結果は想定幅です。
- 個人使用向けの非公式ツールであり、株式会社ポケモン・任天堂等とは関係ありません。
