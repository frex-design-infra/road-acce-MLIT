# 附属物点検管理システム
**株式会社フレックスデザイン 専用**

道路附属物（標識・照明施設等）の定期点検記録を管理し、xROAD（全国道路施設点検データベース）への一括登録用CSVを出力するWebシステムです。

---

## 🚀 GitHub Pagesでの公開手順（初回のみ）

### 1. リポジトリの作成
1. GitHubにログイン → 右上「＋」→「New repository」
2. Repository name: `inspection-system`（任意）
3. **Public** を選択（GitHub Pagesは無料プランではPublicのみ）
4. 「Create repository」

### 2. ファイルのアップロード
```bash
git clone https://github.com/[ユーザー名]/inspection-system.git
cd inspection-system
cp /path/to/index.html .
git add index.html README.md
git commit -m "初期設定"
git push origin main
```

### 3. GitHub Pagesの有効化
1. リポジトリページ → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)` → Save
4. 数分後に `https://[ユーザー名].github.io/inspection-system/` でアクセス可能

### 4. URLを社員に共有
上記URLをチャットやメールで共有するだけで全員がアクセスできます。

---

## 📱 使い方

### 基本的なワークフロー

```
業務登録 → 施設追加（手動 or Excelインポート）→ 点検記録入力 → CSV出力 → xROADへアップロード
```

### Excelインポート（過年度調書の取り込み）
1. サイドメニュー「Excelインポート」
2. インポート先の業務を選択
3. Excelファイルをドロップ（.xlsx / .xls）
4. プレビューを確認して「インポート」

**対応するExcel列名（自動認識）：**
| データ | 認識する列名 |
|------|------------|
| 管理番号 | 管理番号、管番 |
| 施設名 | 施設名、名称 |
| 施設種別 | 施設種別、種別 |
| 所在地 | 所在地、設置場所、住所 |
| 緯度 | 緯度、latitude |
| 経度 | 経度、longitude |
| 設置年月 | 設置年月、設置年 |
| 支柱形式 | 支柱形式 |

### 点検記録入力
6つのタブで入力：
1. **基本情報・諸元** - 現地確認日、施設情報、構造情報
2. **健全性診断** - 区分Ⅰ〜Ⅳの選択と補足
3. **損傷程度評価** - 部材別にa/c/eで評価
4. **措置の必要性** - 部材別措置の有無・理由・所見
5. **写真管理** - 位置図・全景・損傷写真のファイル名管理
6. **板厚調査** - 測定値・評価区分の入力

### CSV出力（xROAD納品）
1. サイドメニュー「CSV出力（xROAD）」
2. 業務・対象を絞り込み
3. 「CSVを一括ダウンロード」で5種類を順次ダウンロード

**出力されるCSV：**
- `01 附属物の諸元と定期点検結果.CSV`
- `02 措置の必要性の検討結果.CSV`
- `03 損傷写真.CSV`
- `04 損傷程度の評価記録.CSV`
- `05 板厚調査記録.CSV`

### データのバックアップ
設定画面から「全データをJSONでエクスポート」でバックアップ取得可能。

---

## 🗂️ データ共有について

### 現在の方式（ローカルストレージ）
- データは各ブラウザのローカルストレージに保存
- **同じPCの同じブラウザ**のみでデータを共有
- バックアップJSONをGitHubリポジトリにコミットすることで擬似共有可能

### 将来の拡張（GitHub API方式）
設定画面でGitHub Personal Access Tokenを設定することで、データをGitHubリポジトリのJSONファイルとして保存・共有できます。

```
data/
  businesses.json     # 業務マスター
  facilities.json     # 施設マスター
  inspections/
    2024/
      biz_xxx.json    # 業務別点検記録
```

---

## ⚙️ 技術仕様

- **フレームワーク**: 純粋なHTML/CSS/JavaScript（依存ライブラリなし）
- **Excelライブラリ**: SheetJS (CDN)
- **データ保存**: localStorage（ブラウザ内）
- **対応ブラウザ**: Chrome, Firefox, Edge, Safari（最新版）
- **サーバー不要**: GitHub Pages（静的ホスティング）

---

## 📋 xROAD納品フロー

```
このシステム                    xROAD
    │                              │
    ├─ CSV出力（5種類）            │
    │                              │
    ├─ 写真ファイルを整理          │
    │   └─ Image/                  │
    │       └─ {施設ID}_{日付}/    │
    │           ├─ 位置図.jpg      │
    │           ├─ 全景写真_1.jpg  │
    │           └─ 損傷写真/       │
    │               └─ 損傷写真_01.jpg
    │                              │
    ├─ zipに圧縮 ──────────────── → 一括登録用データ登録
    │                              │
    └─ 完了 ───────────────────── → 登録確認・更新
```

---

## 📞 サポート

システムに関する問い合わせは開発担当まで。
