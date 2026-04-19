# ReadersUniverse — Product interview guide

Use this document to prepare for **product manager**, **product analyst**, **associate product**, or **growth** interviews where you pitch or defend a portfolio project. It mirrors what ReadersUniverse actually does today (see `README.md`) and extends into strategy, metrics, and roadmap ideas you can discuss credibly.

---

## 1. Elevator pitch (30 seconds)

ReadersUniverse is a reader-centric web app: sign up, set genre preferences, build a wishlist, track books you are reading with progress, discover readers with overlapping tastes, and post on a lightweight community feed. Users can also add books to a shared catalog so discovery stays fresh. Position it as **social reading + personal library** rather than a full Goodreads replacement unless you have evidence to claim parity.

---

## 2. Problem, audience, and value

### 2.1 Problem statement (practice articulating)

- Readers juggle **what to read next**, **what they are in the middle of**, and **who shares their taste** across notes, spreadsheets, and disconnected apps.
- Casual social products rarely tie **taste signals** (genres, wishlist overlap) to **people**, so discovery feels noisy.

### 2.2 Primary personas (examples)

| Persona | Needs | How the product helps today |
|--------|--------|-----------------------------|
| **Casual reader** | Simple lists, low friction | Wishlist, current reading, progress |
| **Community-oriented reader** | Light social layer | Feed posts, reader matches |
| **Contributor / curator** | Share books with others | Add book to shared catalog |

### 2.3 Differentiation you can claim honestly

- **Taste-based matching** (genres + wishlist overlap) as a core loop, not an afterthought.
- **Unified stack**: account, lists, social, and catalog in one flow (good for “full-stack product thinking” stories).

---

## 3. Existing features — product Q&A

Interviewers often ask: *“Walk me through your product.”* Map answers to real capabilities.

| Feature area | What exists | Product talking points |
|--------------|-------------|-------------------------|
| **Onboarding** | Register with profile + genre prefs; JWT login | First-run data capture enables personalization and matching; discuss trust (password handling) at high level only unless technical interview |
| **Dashboard** | Curated book cards; flows into wishlist / currently reading | “Home” is the hub for action; ask how you would measure engagement here |
| **Wishlist** | Add / list / remove | Classic retention driver; discuss deduping as quality bar |
| **Currently reading** | Add / list / update progress / remove | Habit loop; natural place for streaks, reminders, or “finished” state in roadmap |
| **Matches** | Suggested readers (genre + wishlist overlap) | Core differentiator; be ready to discuss privacy, abuse, and “why match?” |
| **Feed** | Create, list, delete **own** posts | Scope is intentionally narrow—good for discussing MVP vs moderation at scale |
| **Add book** | Title, author, genre, optional metadata → `Book` collection | UGC and catalog growth; duplicates and quality control are fair critique |
| **Profile / settings / about** | Supporting IA | Mention information architecture and what you would add next (edit profile, privacy) |

### Drill questions (answer out loud)

1. Who is the **first user** you would onboard in a beta, and why?
2. Why **wishlist + currently reading** instead of a single “shelf” model?
3. What user job does **matches** solve that the feed does not?
4. Why allow **delete only your own posts**—what product principle does that reflect?
5. What happens to the product if the **shared catalog** fills with duplicate books?

---

## 4. Metrics and success (how PMs think)

Pick a north-star and supporting inputs. Tie every metric to a **hypothesis** and **instrumentation** you would add.

### 4.1 Example north-star metrics

- **Weekly active readers** completing at least one “meaningful” action (e.g., progress update, wishlist add, or feed post).
- **Match engagement rate**: % of users who view a match profile or start a conversation (if you add messaging later).

### 4.2 Funnel examples

- Registration → genre selection completeness → first wishlist add → first current read → first match view → return visit D7.

### 4.3 Guardrail metrics

- Time to first value (TTFV), error rate on auth, feed spam rate, duplicate book ratio in catalog.

### 4.4 Interview prompts

- “How would you **prioritize** three metrics if you only had one engineer for two weeks?”
- “What would you **A/B test** on onboarding first?”

---

## 5. New features — backlog ideas (prioritize with a framework)

Use **RICE** (Reach, Impact, Confidence, Effort) or a simple **Impact vs Effort** matrix in interviews. Below are plausible extensions aligned with the current architecture.

### 5.1 High user value / common interview answers

| Idea | User value | Product notes |
|------|------------|---------------|
| **“Finished” shelf + ratings** | Closure and recommendations | Unlocks reviews, year-in-reading, better matching |
| **Comments / replies on feed** | Real community | Requires moderation policy, reporting, block |
| **Follow users** (not only match suggestions) | Control over social graph | Changes privacy model; clearer than anonymous overlap alone |
| **Reading goals** | Motivation | Annual book count, genre diversity |
| **Notifications** (email / in-app) | Reactivation | Progress nudges, new matches, replies |

### 5.2 Discovery and catalog

| Idea | User value | Product notes |
|------|------------|---------------|
| **External book metadata** (ISBN, cover API) | Richer cards, fewer bad duplicates | Dependency on third-party APIs, cost, attribution |
| **Search & filters** on catalog | Findability | Essential before scale |
| **Editorial lists / themes** | Curated discovery | Complements UGC |

### 5.3 Trust, safety, and compliance

| Idea | Why it matters in PM interviews |
|------|----------------------------------|
| **Block / report**, **age-appropriate defaults** | Shows you think past happy path |
| **Data export / delete account** | GDPR-style literacy |
| **Rate limits on posts and catalog submissions** | Anti-abuse at low cost |

### 5.4 Monetization (only if interviewer goes there)

- **Affiliate links** for buy buttons (disclosure, locale, partner terms).
- **Premium tier**: extra shelves, advanced stats, ad-free (hypothesis-heavy—validate willingness to pay).
- **B2B**: book clubs, schools (long sales cycle—position as “phase 3” unless you have domain expertise).

---

## 6. Competitive landscape (sound structured, not encyclopedic)

Be ready to name **Goodreads**, **StoryGraph**, **Literal**, bookish corners of **Reddit/Discord**, and **Notes/Notion** for power users. For each, one line: **what they optimize for** vs **what ReadersUniverse optimizes for** (e.g., lightweight social + overlap matching without building a full reviews corpus on day one).

---

## 7. Roadmap storytelling (30 / 60 / 90 days)

Practice a **now / next / later** narrative:

- **Now**: Solid core loop—account, lists, progress, basic feed, matches.
- **Next**: Discovery (search, dedupe), social depth (follow or comments) with minimal viable safety.
- **Later**: Recommendations engine, mobile apps, partnerships—only with validated retention.

---

## 8. Behavioral PM questions — tie answers to this project

Use **STAR** (Situation, Task, Action, Result). Even if “Result” is learning from a student project, be specific.

| Question | Angle using ReadersUniverse |
|----------|------------------------------|
| Tell me about a time you **said no** to a feature | e.g., full messaging vs matches-only MVP |
| **Conflicting stakeholder** priorities | Engineering time for moderation vs new feed features |
| **Launched something** with incomplete data | Ship feed with delete-only; what you would measure next |
| **Biggest mistake** | e.g., duplicate books in catalog; how you would fix process + UX |
| **Disagreed with engineering** | Token expiry vs session UX; tradeoffs you would user-test |

---

## 9. Case-style exercises you can self-practice

1. **Root cause**: DAU is flat but registrations grew—what do you investigate first?
2. **Prioritization**: Pick two items from §5.1 and defend order with user evidence you would collect.
3. **PRD outline**: Write a one-page PRD for “Follow a reader” (problem, goals, non-goals, metrics, rollout, risks).
4. **Go-to-market**: Launch on a college campus vs BookTok creators—who, message, channel, success metric?
5. **Pricing**: Free forever vs freemium—what would change in the product roadmap?

---

## 10. Questions to ask the interviewer (product role)

- How does your team balance **discovery** vs **technical debt**?
- What does **“good”** look like for a PRD or spec in your org?
- How do PMs partner with **design and research** here?
- What is the hardest **user problem** your squad is solving this quarter?

---

## 11. Keeping this guide accurate

When you change features in code, update **§3** and the elevator pitch so your interview story matches the repo. Cross-reference `README.md` for feature lists and `TECHNICAL_GUIDE_AND_INTERVIEW_QNA.md` for API-level truth.