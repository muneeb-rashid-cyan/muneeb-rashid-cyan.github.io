# Portfolio Project Ideas (Demonstrable GitHub Projects)

These are designed to fill your skill gaps AND give you a new GitHub repo that you can
add to your portfolio. Each one is scoped to be completable in 1-2 weekends.

---

## Priority 1 — Reasoning Model Router

**Demonstrates:** Reasoning models, model routing, cost optimization
**Stack:** LangGraph + o3 + GPT-4o-mini + o4-mini

**What it does:** A smart router that classifies incoming queries by complexity
(simple / medium / hard) and routes them to the appropriate model. Simple → GPT-4o-mini
($0.15/1M), Medium → GPT-4o ($2.50/1M), Hard → o3-mini ($3/1M). Log latency and cost
per query. Show 60% cost savings over always using o3.

**Why it's impressive:** Shows model economics understanding — which is what Principal
engineers care about, not just "I know how to call an API."

---

## Priority 2 — Private LLM Serving Benchmark

**Demonstrates:** vLLM, quantization, serving infrastructure
**Stack:** vLLM + LLaMA 3.2 3B/8B + GPTQ/AWQ + RunPod

**What it does:** Deploy the same model in 4 configurations (float16, int8, int4 GPTQ,
int4 AWQ) on a RunPod A100. Benchmark tokens/sec, TTFT, p99 latency, and GPU VRAM for each.
Expose OpenAI-compatible endpoint. Write up findings.

**Why it's impressive:** Nobody does this systematically and publishes results. Instant
credibility with infra-focused hiring managers.

---

## Priority 3 — Domain Fine-Tuning Pipeline (End-to-End)

**Demonstrates:** QLoRA, DPO, Unsloth, synthetic data, HuggingFace Hub, vLLM serving
**Stack:** GPT-4o (data gen) → Unsloth (training) → RAGAS (eval) → vLLM (serving)

**Domain idea (pick one):**
- Medical Q&A (use PubMedQA dataset + synthetic augmentation)
- Legal contract analysis (use CUAD dataset)
- Code review assistant (use your own GitHub repos as training data)

**What it does:** (1) Generate 5K synthetic instruction pairs with GPT-4o. (2) Fine-tune
LLaMA 3.2 3B with Unsloth QLoRA. (3) DPO-align with 1K preference pairs. (4) Evaluate
with RAGAS against base model. (5) Push to HuggingFace Hub. (6) Serve with vLLM.

**Why it's impressive:** This is the complete fine-tuning loop. Most engineers have done
step 2 at most. Doing all 6 steps and publishing the results (model card, eval scores)
is genuinely rare.

---

## Priority 4 — Eval-Gated RAG CI Pipeline

**Demonstrates:** Evals-first development, Promptfoo, GitHub Actions, RAGAS
**Stack:** Your existing Azure LLMOps RAG + Promptfoo + GitHub Actions

**What it does:** Add a full eval harness to your existing Azure RAG project:
- 50 test cases (25 factual, 15 multi-hop, 10 adversarial)
- Promptfoo running groundedness, faithfulness, and hallucination checks
- GitHub Actions step that runs evals on every PR
- Automatic PR block if any metric drops below threshold
- Eval result dashboard in the README

**Why it's impressive:** This is the "senior to staff" upgrade. Shows you think about
quality systematically, not just feature delivery.

---

## Priority 5 — GraphRAG vs. Vector RAG Comparison

**Demonstrates:** GraphRAG, Neo4j, LlamaIndex, evaluation methodology
**Stack:** Neo4j + LlamaIndex Property Graph + Microsoft GraphRAG + RAGAS

**What it does:** Take a corpus of 50+ interconnected documents (company wikis, research
papers, news). Build two retrieval systems: (1) standard hybrid vector RAG, (2) GraphRAG
with Neo4j. Design 30 questions: 10 simple, 10 multi-hop, 10 aggregation. Benchmark
accuracy, latency, and cost of each. Write up findings with clear conclusions on when
to use each.

**Why it's impressive:** Multi-hop Q&A is the hardest RAG problem. Publishing a rigorous
comparison with real numbers is publishable content.

---

## Priority 6 — LangGraph + Mem0 Personal AI Assistant

**Demonstrates:** Long-term agent memory, Mem0, conversational AI
**Stack:** LangGraph + Mem0 + GPT-4o + FastAPI + Streamlit

**What it does:** A personal AI assistant that remembers:
- Your preferences (communication style, working hours, expertise)
- Past conversations (what projects you discussed, decisions made)
- Learned facts about your context (your tech stack, your team members)
- Time-aware memory (recent memories weighted higher)

Includes a memory management UI where you can view, edit, and delete memories.

**Why it's impressive:** Solves a real pain point. Most AI assistants forget everything
between sessions. Demonstrates understanding of agent state beyond checkpointing.

---

## Priority 7 — MCP Security Audit Tool

**Demonstrates:** AI safety, red-teaming, MCP ecosystem, prompt injection
**Stack:** FastMCP + Promptfoo red-teaming + LangGraph

**What it does:** A tool that automatically red-teams MCP servers. Given an MCP server,
it: (1) enumerates all tools and their descriptions, (2) generates adversarial test cases
(prompt injection via tool descriptions, exfiltration attempts, scope creep), (3) runs
them against the LangGraph agent using the MCP server, (4) produces a security report.

**Why it's impressive:** You already have MCP expertise. This is the natural security
extension of it. Niche, in-demand, and nobody else is doing it.

---

## Naming Convention for GitHub Repos

Use this pattern (consistent with your existing repos):
- `vllm-llm-serving-benchmark`
- `end-to-end-fine-tuning-pipeline`
- `eval-gated-rag-ci`
- `graphrag-vs-vector-comparison`
- `langgraph-mem0-personal-assistant`
- `mcp-security-audit-tool`
- `reasoning-model-router`

---

## Sequencing

Do them in this order if time-limited:
1. Eval-Gated RAG CI → lowest effort, retrofits existing project
2. Reasoning Model Router → 1 weekend, high visibility
3. Fine-Tuning Pipeline → highest portfolio impact
4. GraphRAG Comparison → enterprise differentiation
5. vLLM Benchmark → infra credibility
6. Mem0 Assistant → product demo ability
7. MCP Security Tool → niche specialization
