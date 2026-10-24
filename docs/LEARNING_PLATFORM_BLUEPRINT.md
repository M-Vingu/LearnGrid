# LearnGrid learning platform blueprint

**Product scope:** a global learning platform spanning Grade 1 through advanced and higher education. The first market is the United States, with English as the initial language. Kenya and additional regions are planned through separately reviewed curriculum and localization packs. The first content pilot remains primary mathematics.

**First pilot subject:** mathematics. Fractions are a proposed first unit because they support a clear path from concrete visuals to symbolic reasoning and applied problems. Confirm the target primary grade/age band before writing final content.

## Global curriculum and localization model

LearnGrid should maintain a shared, curriculum-independent concept and prerequisite graph, then map that graph to versioned regional curriculum frameworks. A learner's pathway is determined by demonstrated understanding, selected goals, and local curriculum context, without assuming that a grade means the same thing in every country. The intended long-term range is Grade 1 through upper secondary, tertiary, professional, and advanced study; this is a product scope, not a claim that all subjects or levels are available at launch.

The U.S. is the first market. There is no single mandatory U.S. curriculum: state and local expectations differ, and Common Core is a voluntary framework adopted or adapted by jurisdictions. Each U.S. alignment must name the state or district, framework and edition, standard identifier, and effective period. Kenya's curriculum pack should map objectives against current Kenya Institute of Curriculum Development (KICD) designs, beginning with the appropriate grade band and subject; it must be reviewed by educators familiar with Kenyan classrooms. Other countries require their own current authoritative frameworks and local review. UNESCO's ISCED may help compare broad education levels across countries, but it is not a substitute for a national or local curriculum.

Each curriculum mapping should record jurisdiction, framework publisher, framework version, grade/course/stage label, objective identifiers, source link, reviewer, review date, and active dates. Preserve old mappings when a framework changes so historical learner records retain their original context. Shared concepts may map to different grade bands or sequences in different places; do not force a one-to-one grade equivalence.

The initial release is English. Design content records for localization from the start: keep instructional text separate from examples, units, number/date formatting, terminology, and translated strings. Later language packs should use qualified human translation and local educator review, preserve mathematical meaning, and identify language and locale. Add Kiswahili and other learner-relevant languages based on community and market needs; do not infer language from country. Keep source material and content reuse rights explicit across regions.

The first rollout decisions are now recorded as **U.S. first** and **English initially**. They do not reduce the broader goal of supporting Kenya and global learners.

## Product promise

For every topic, LearnGrid should make a sound first explanation accessible, give learners a low-pressure way to practice, and offer a more demanding step when their work shows readiness. The platform should make the evidence behind lessons visible and make review dates and corrections part of the content itself.

“All knowledge” is not a finite or maintainable first release. Start with a small, high-quality, reviewed collection and expand it through a repeatable scholarly and editorial process. A simple explanation should preserve the core truth, state where it is simplified, and introduce nuance as learners advance.

## Learning experience

Build each unit around explicit learning objectives and a graph of concepts and prerequisites, rather than one overall learner level.

1. **Find a starting point.** Offer a brief, ungraded diagnostic or let the learner choose “start from the beginning.” Treat it as a clue, not a label.
2. **Introduce the idea simply.** Use plain words, concrete examples, diagrams, and short chunks. Teach vocabulary in context. Show a worked example before expecting independent work.
3. **Check understanding.** Ask the learner to recall, explain, sort, predict, or solve. Explain why an answer works and offer a hint or a different example when they are stuck.
4. **Practice in varied ways.** Use small games as practice formats: matching, sorting, prediction, a puzzle, or a short simulation. The game action must exercise the learning objective; points and speed alone are not evidence of understanding.
5. **Raise the challenge gradually.** Move from recognition to supported use, independent use, explanation, and transfer to a new situation. Use multiple questions and more than one session for important skills. Do not gate progress on speed, streaks, or one lucky answer.
6. **Bring ideas back later.** Schedule brief recall and mixed practice so a learner revisits earlier ideas while learning related ones. Let the teacher see which objectives need a different explanation or more practice.

Use task-focused, encouraging feedback. Keep an alternate path available so a learner can review a prerequisite or continue with support instead of being locked out. The evidence review in *How People Learn II* supports prior-knowledge-aware instruction, retrieval, spaced and varied practice, explanation, and feedback matched to learners’ needs. The U.S. What Works Clearinghouse practice guide also recommends active retrieval and spacing. These are design inputs, not a substitute for evaluating LearnGrid with real classrooms. [National Academies, *How People Learn II*](https://www.nationalacademies.org/read/24783/chapter/7), [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)

### A sample primary lesson

For a fractions unit, begin with “a fraction names equal parts of a whole,” show one whole split into equal pieces, and work through one example. A matching game can pair a shaded model with its fraction. Then ask the learner to draw or explain an example, compare two fractions, and solve a word problem in a different context. If their explanation or answer reveals a misconception, return to a visual model and retry with support. Bring the idea back in a later mixed-practice session.

This is a lesson pattern, not finalized curriculum content. Every published example and answer key needs source and subject review.

### How to use games

Use games to give purposeful practice, feedback, choice, and a reason to try again. Keep them short and accessible. Reward accuracy, explanations, revision, and effort; do not punish mistakes or make speed the main ranking. Do not ship public leaderboards in the first release. Research reviews find positive average effects for some game-based learning designs, but results vary by game design and context, so measure learning and delayed recall rather than assuming game engagement means learning. [Clark, Tanner-Smith & Killingsworth, systematic review and meta-analysis](https://doi.org/10.3102/0034654315582065), [2022 STEM game-based learning meta-analysis](https://link.springer.com/article/10.1186/s40594-022-00344-0)

## Knowledge library: reviewed and traceable, not a scrape of the web

Build a curated knowledge library that stores small, teachable units with provenance. Search services and scholarly metadata can help editors find and track sources; they do not make an automatically generated lesson true. Crossref provides public scholarly metadata and records some licenses and post-publication updates, but abstracts can remain copyrighted. NCBI E-utilities expose databases such as PubMed and PMC. Use these to find and identify sources, then check the actual source, its status, and its reuse rights before adapting content. [Crossref REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/), [NCBI APIs](https://www.ncbi.nlm.nih.gov/home/develop/api/)

### Source policy by subject

| Area | Preferred starting sources | Editorial treatment |
|---|---|---|
| Biology and general science | Peer-reviewed reviews and research, national science academies, universities, government science agencies, and maintained reference databases | Distinguish established findings from active research; cite the specific study, review, or dataset used. |
| Health and medicine | Current public-health and clinical guidance from WHO and the relevant national health authority; systematic reviews and peer-reviewed research | Require health-specialist review, display the guidance date and jurisdiction, and keep educational material distinct from personal diagnosis or treatment advice. |
| Geography and Earth science | National statistics and mapping agencies, geological and meteorological services, NASA, NOAA, UNESCO, and IPCC reports where relevant | Date datasets and maps; identify scale and geography; note when boundaries or interpretations are disputed. |
| History | Primary sources held by archives, libraries, museums, and reputable digital collections; peer-reviewed historical scholarship and university presses | Separate primary evidence from later interpretation, identify whose perspectives are represented, and present well-supported scholarly disagreements fairly. |
| Mathematics | Published curricula and standards, textbooks with clear provenance, mathematical societies, and peer-reviewed mathematics education research | Mathematical facts are often stable, but examples, pedagogy, standards, and local terminology still need dated review. |

These are starting categories, not an approved source list. The subject editor should maintain named sources, scope, quality criteria, reuse rights, and review cadence for each collection. A scholar’s title is not a replacement for checking the evidence, method, conflicts, and relevance of their contribution.

### Content review and freshness workflow

1. **Register a source.** Record title, authors or organization, source type, DOI or stable URL, publication/update date, jurisdiction, license/usage notes, and the subject areas it can support.
2. **Draft teachable claims.** A claim is a small factual statement used by a lesson. Link it to the exact sources supporting it and record what those sources do and do not establish.
3. **Create age-level versions.** Write the introductory explanation, vocabulary, worked examples, practice, and more challenging applications. Record simplifications and likely misconceptions.
4. **Review separately.** Require subject review and age-appropriate teaching/editing review. High-impact health content needs an appropriately qualified reviewer. Record reviewer role, date, conflicts, and decision.
5. **Publish an immutable version.** Published content keeps its source snapshot and citations. Corrections create a new version; they do not silently rewrite what an earlier learner saw.
6. **Monitor and re-review.** Check source corrections, retractions, revised guidelines, and new editions. Assign each source and lesson a review-by date based on how quickly that kind of knowledge changes. Flag overdue material to editors and unpublish material if its basis is no longer dependable.
7. **Show provenance to learners.** Let learners, teachers, and guardians open a short “Sources and review” view with links, dates, and the lesson version. Keep citations usable on mobile.

AI may help editors locate relevant passages, draft plain-language variants, or generate question candidates from approved material. It must not invent citations, decide evidence quality, publish without a human reviewer, or answer beyond the approved lesson sources. An answer with missing or conflicting evidence should be escalated for review instead of presented as fact.

## Platform structure

Preserve the current student, teacher, and administrator roles and visual direction. The role switcher in the current frontend is a demo; it is not authorization. New routes and data must use real server-side identity and permissions before serving learner records.

### Content and learning records

The first persistent model should support:

- `jurisdiction`, `curriculum_framework`, `framework_version`, and `curriculum_mapping` records, including source, grade/course labels, effective dates, and review history.
- A shared concept graph that is independent of grade labels, with curriculum-specific mappings for local sequencing and coverage.
- `subject`, `concept`, `concept_prerequisite`, and `learning_objective` records.
- `source` and `source_update` records for provenance, rights, update/retraction checks, and review due dates.
- `content_item` and immutable `content_version` records with reading band, language, objective, explanation, examples, accessibility alternatives, and editorial status.
- `content_citation` and claim-to-source links, so each factual lesson can be traced to its evidence.
- `question_item` and `answer_option` records with objective, response format, hint, explanation, difficulty attributes, and reviewed answer key.
- `attempt` records for learner responses and feedback, plus per-objective `mastery_state` and next-review date. Keep assessment evidence separate from engagement metrics.
- `review_decision` and `correction` records with author, reviewer, timestamps, and prior published version.

Do not add these tables until database verification is available. Design them with ownership and access rules before exposing learner data. Do not keep unnecessary child data; make teacher and administrator access auditable.

### First student flow

`Choose unit → optional starting check → simple explanation → worked example → guided practice/game → explain or apply → challenge when ready → review later`

### Teacher and administrator flows

- **Teacher:** select reviewed units, assign or adjust practice, see objective-level progress and misconceptions, and add contextual feedback. Teachers can author drafts but cannot silently publish source-reviewed material.
- **Administrator/editor:** manage subjects, source registry, reviewers, content versions, review queues, corrections, and publication status. Keep platform administration distinct from academic approval.
- **Learner:** see an inviting next step and understand why it was suggested. Never show fixed “ability” labels based on a short diagnostic.

## Build sequence

1. **Finish backend verification.** Restore a PostgreSQL 18 test service, make the real integration test run, and establish migration generation/application/repeatability. This remains blocked in the current environment.
2. **Set the first pilot scope.** U.S. first, English initially; start with a small primary mathematics fractions unit. Confirm the specific U.S. state/framework and target grade/age band, then identify a classroom teacher and subject reviewer. Keep the shared concept model curriculum-independent, but align published content to the chosen local framework and record local examples and vocabulary.
3. **Complete identity and permissions.** Implement server-enforced student, teacher, reviewer, and administrator access before storing learner histories.
4. **Model the curriculum and reviewed content.** Add migrations, source/citation/version workflows, authoring review states, and API contracts. Publish content only through an auditable approval step.
5. **Build one end-to-end unit.** Integrate the existing dashboard with real API data and implement the complete learner path above, including hints, feedback, game practice, challenge progression, and a later review.
6. **Validate with classrooms.** Observe whether learners understand explanations, whether challenge recommendations match their work, whether the game teaches the intended skill, and whether recall lasts after a delay. Improve content and rules before scaling subjects.
7. **Expand the library deliberately.** Extend from the first primary unit across Grade 1 through advanced study, one reviewed subject and stage at a time. Add state-by-state U.S. mappings, then a KICD-reviewed Kenya pack and other regional packs; add languages through qualified translation and educator review. Grow contributors, source monitoring, and adaptive recommendations only after editorial and safeguarding workflows work for the pilot.

## First-release acceptance checks

- Every lesson version has a stated objective, reading band, source citations, rights notes, subject reviewer, teaching review, and review-by date.
- Each answer has an explanation, and incorrect work results in a useful next step rather than a penalty or dead end.
- A learner can start at an introductory level and reach a challenge through demonstrated understanding across varied practice; fast guessing alone cannot trigger advancement.
- A teacher can identify which objective needs attention without seeing a misleading single score as the whole learner profile.
- A content editor can correct or retire a source-backed lesson while retaining the earlier version and its review history.
- Keyboard, screen-reader, reduced-motion, low-bandwidth, and small-screen paths are tested for each activity type.

## Current project constraints

- `frontend/src/App.jsx` is an interactive sample dashboard with local React state; it has no API-backed course or learning data yet.
- `backend/` has Fastify health endpoints and PostgreSQL configuration, but no user, content, assessment, or progress schema, and no migrations.
- Backend unit tests pass, but PostgreSQL integration and migration checks are blocked until PostgreSQL 18 is available.
- Therefore the next code change should follow a scoped product/content design and database verification; do not wire simulated learner progress into a false production API. The product goal covers Grade 1 through advanced/higher education globally; the current launch scope is U.S.-first, English, with a primary mathematics pilot.
