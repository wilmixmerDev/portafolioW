<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Code discovery protocol

This repo is indexed in `codebase-memory-mcp`. Before reading or grepping code to verify how something works, use the graph tools first — they return precise results in ~500 tokens vs ~80K for a broad grep/read:
1. `search_graph` / `trace_path` / `get_code_snippet` / `query_graph` / `get_architecture` to locate and inspect symbols.
2. Fall back to Grep/Read only for non-code files, text search, or when the graph doesn't have what you need.
3. Always `Read` a file before editing it, even if you found it via the graph.

# Installed skills (.agents/skills)

These live in `.agents/skills/`, not `.claude/skills/`, so they do **not** show up as `/`-invocable skills — read the relevant `SKILL.md` directly before the matching work, don't skip it because it "looks like a one-liner." Managed via `skills-lock.json` (tracked in git); the vendored skill files themselves are gitignored.

Apply **always** (not just when asked), for any frontend change in this repo:
- `frontend-design` — distinctive visual/aesthetic direction, avoid templated-AI defaults. (Already the mandated one, see [[feedback_frontend_design_skill]] memory.)
- `emil-design-eng` — UI polish, component design, animation decisions, invisible details.
- `apple-design` — gesture-driven UI, spring animations, drag/swipe/sheet, momentum, translucent materials, typography.

Apply situationally, read the SKILL.md when the trigger matches:
- `find-animation-opportunities` — read-only audit of what doesn't animate but should; use when asked "what could be animated here?"
- `improve-animations` — read-only audit + prioritized roadmap for motion fixes across the codebase.
- `review-animations` — reviews motion code against a high craft bar; default to flagging.
- `animation-vocabulary` — reverse-lookup glossary, turns a vague motion description into its exact term.
- `pick-ui-library` — only when explicitly asked to choose a library (numbers, OTP, charts, command menus, virtualization, drag&drop, toasts, state, styling).
- `prototype` — only when explicitly asked to build multiple UI variants behind a picker.
