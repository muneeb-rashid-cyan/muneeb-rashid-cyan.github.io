# Tier 3 — Emerging / Frontier Bets

These are not mature enough to put on a resume yet but are bets worth following closely.
Experiment, don't commit study hours — read papers, try toy projects.

---

## 1. Multimodal Real-Time APIs

**Status:** Early production. OpenAI Realtime API (GPT-4o audio), Gemini Live API.

**What it enables:** Voice agents with sub-200ms latency, audio-visual understanding in
real-time, live video analysis.

**Why watch it:** Your storybook platform already handles multimodal. Real-time is the
next jump. This will matter for your current role at Arbisoft.

**Action:** Build a demo with OpenAI Realtime API. Compare latency vs your current
ElevenLabs + Whisper stack.

---

## 2. Test-Time Compute Scaling

**Status:** Research becoming production. o3, Gemini 2.5 Pro.

**What it is:** Spending more compute at inference time (not training) to get better
answers — repeated sampling, voting, search over reasoning paths.

**Why watch it:** Changes how you architect agent systems. Instead of calling an LLM once,
you might run 8 samples and take the best-of-N answer.

**Action:** Read the DeepSeek R1 paper and the OpenAI o3 system card. Understand MCTS
(Monte Carlo Tree Search) applied to LLMs.

---

## 3. A2A Protocol (Agent-to-Agent)

**Status:** Google launched it in April 2025. Still being adopted.

**What it is:** A standard protocol for agents from different frameworks (LangGraph,
CrewAI, ADK) to communicate with each other. Like MCP but for agent-to-agent calls
instead of model-to-tool calls.

**Why watch it:** You already know MCP. A2A is the natural next protocol. If it gets
adopted widely (possible given Google's push), being an early expert is high-value.

**Action:** Read the A2A spec at google.github.io/A2A. Build a toy LangGraph agent that
speaks to a CrewAI agent over A2A.

---

## 4. Mixture of Agents (MoA) & Routing

**Status:** Research → production. Used by Together AI, Martian.

**What it is:** Instead of one big LLM, route queries to the cheapest/fastest model that
can handle them. Similar to mixture-of-experts but at the API level.

**Why watch it:** Cost optimization for high-volume products (like your 10K DAU storybook
platform). Can cut LLM costs by 60-80% with the right router.

**Action:** Try LiteLLM's model routing. Experiment with RouteLLM (open-source router).

---

## 5. Long-Context Everything

**Status:** Arriving fast. Gemini 2.5 Pro (1M tokens), GPT-4.1 (1M tokens).

**What it changes:** Many RAG use cases will shift to "just stuff everything in context."
But this doesn't kill RAG — it changes when RAG is needed (cost, latency, fresh data).

**Why watch it:** The engineer who knows *when* to use RAG vs. long-context vs. fine-tuning
for a given problem is extremely valuable. This is not obvious.

**Action:** Benchmark your Azure LLMOps RAG system vs. long-context GPT-4.1 on your
documents. Understand the cost/accuracy tradeoff empirically.

---

## 6. Synthetic Data Generation at Scale

**Status:** Production at leading labs. Growing in enterprise.

**What it is:** Using frontier models (GPT-4o, Claude) to generate training data for
smaller models. Powers much of the fine-tuning revolution.

**Why watch it:** The future of fine-tuning is: (1) generate 100K synthetic examples
with GPT-4o, (2) filter with a judge, (3) fine-tune a 7B model. You'll need this for
Tier 1 fine-tuning projects.

**Action:** Use the Distilabel library (Argilla) to generate a synthetic QA dataset.
Then fine-tune on it with Unsloth.

---

## Papers Worth Reading (High Signal)

1. DeepSeek R1 — arxiv.org/abs/2501.12948
2. Microsoft GraphRAG — arxiv.org/abs/2404.16130
3. Self-Play Fine-Tuning (SPIN) — arxiv.org/abs/2401.01335
4. Constitutional AI — arxiv.org/abs/2212.08073
5. MCP Specification — modelcontextprotocol.io/specification
6. RouteLLM — arxiv.org/abs/2406.18665
