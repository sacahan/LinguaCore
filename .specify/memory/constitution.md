<!--
Sync Impact Report

- Version change: template (unversioned) → 1.0.0
- Modified principles: N/A (initial adoption)
- Added sections: Core Principles, Product & Technical Constraints, Development Workflow & Quality Gates, Governance
- Removed sections: N/A
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md (Constitution Check guidance aligned)
	- ✅ .specify/templates/tasks-template.md (test guidance aligned)
	- ✅ .specify/templates/spec-template.md (no change required)
	- ✅ .specify/templates/checklist-template.md (no change required)

Follow-up TODOs: N/A
-->

# LinguaCore Constitution

## Core Principles

### I. 學習成效優先（Outcome-First）

LinguaCore 的每個功能必須能明確支持「中文母語者掌握英文 12 時態」這個目標。
任何新增功能都必須能說清楚：它要改善哪個學習痛點、如何被使用者驗證、以及如何衡量成效。

- 不做與學習成效無關的功能堆疊（避免為了“看起來更完整”而增加複雜度）。
- UI/流程以降低認知負擔為優先：少步驟、清晰指引、即時回饋。
- 對外宣稱的能力必須能被具體行為或指標佐證。

### II. 文法正確與可解釋性（NON-NEGOTIABLE）

本專案的核心價值是「正確、可理解、可遷移的語法知識」。內容錯誤會直接破壞信任，因此不得妥協。

- 任何顯示給使用者的「時態定義、公式、例句、翻譯、解析」必須以正確性為第一優先。
- AI 生成內容必須遵循可驗證的輸出結構（例如 JSON schema、必要欄位），並在 UI 層提供合理的失敗處理。
- 內容呈現以繁體中文為主、英文為輔，並維持術語一致（例如：現在完成式 / Present Perfect）。

### III. 進度與解題判斷必須可重現

學習進度、解題結果與解鎖邏輯屬於使用者信任的基礎，必須是可重現且一致的。

- 任何影響「答題正誤」「進度計算」「時態解鎖」的邏輯必須是決定性的（同樣輸入 → 同樣輸出）。
- 若使用 AI 生成題目：必須保存足以重現當次判斷的最小必要資料（例如題目內容、正確答案）。
- 不得將 UI 狀態當作真實資料來源；狀態的來源與更新必須清晰可追。

### IV. 隱私與金鑰安全

本專案會呼叫外部 AI 服務。金鑰管理與資料最小化是必備底線。

- 任何 API key、token、私密設定不得進版控；一律使用環境變數（例如 `.env.local`）與文件說明。
- 日誌不得包含敏感資訊（API key、完整 prompt、可能識別個人的輸入內容）。
- 若未來新增帳號或雲端儲存：必須明確定義資料收集目的、保存期限與刪除機制。

### V. 簡單、型別安全、可維護

以 React + TypeScript 的優勢（明確資料結構與可預期行為）來降低維護成本。

- 優先使用現有檔案與結構（`pages/`, `components/`, `constants.ts`, `types.ts`），避免不必要的抽象與重構。
- 對外資料結構（例如 AI 回傳）必須有明確型別或 schema；不要以 `any` 逃避契約。
- 改動必須小且可回滾；每次 PR 聚焦在單一目的。

## Product & Technical Constraints

- **Target users**: 中文母語者；目標是系統化掌握英文 12 時態。
- **Platform**: Web App（React + TypeScript + Vite）。
- **AI integration**: 使用 Google Gemini 生成題目與文法解析；必須有 loading/錯誤狀態與降級策略（例如顯示錯誤、允許重試）。
- **Performance**: 主要互動（切頁、查看文法、作答）應保持流暢；避免在主執行緒做重計算或大量同步工作。
- **Language**: 主要介面文字以繁體中文呈現，必要時輔以英文；用詞一致。

## Development Workflow & Quality Gates

- **PR discipline**: 所有變更以 PR 方式進行；描述必須包含使用者影響、風險、回滾方式。
- **Build gate**: 變更前後必須能 `npm run build` 成功。
- **Testing policy**:
  - 任何影響「答題正誤」「進度計算」「解鎖規則」「AI 回應解析」的邏輯：必須新增對應的自動化測試或等價的可重現驗證方式。
  - 純 UI 排版/視覺微調：可用手動驗證取代測試，但必須在 PR 描述寫清楚驗證步驟。
- **Prompt/schema changes**: 任何 prompt 或 schema 調整必須同步更新對應解析邏輯與錯誤處理。

## Governance

本憲章高於所有習慣性做法與樣板；若文件或流程與憲章衝突，以憲章為準。

- **Amendments**: 任何人可提出修訂，必須以 PR 形式提交並在描述中：
  - 說明要解決的問題與影響範圍
  - 列出受影響的模板/文件與同步更新計畫
  - 若涉及破壞性變更，提供遷移步驟
- **Versioning policy**: 使用 Semantic Versioning（MAJOR.MINOR.PATCH）
  - MAJOR：移除/重定義核心原則或治理流程，導致既有規範不相容
  - MINOR：新增原則、或對原則/流程做實質擴充
  - PATCH：澄清、文字修正、非語意調整
- **Compliance review**: 每個 PR reviewer 必須檢查本憲章，至少回答：
  - 是否影響文法內容正確性？
  - 是否新增/改動 AI 契約（schema、必要欄位）？
  - 是否有金鑰/隱私風險？
  - 是否讓進度/判斷更不可重現？

**Version**: 1.0.0 | **Ratified**: 2026-01-03 | **Last Amended**: 2026-01-03
