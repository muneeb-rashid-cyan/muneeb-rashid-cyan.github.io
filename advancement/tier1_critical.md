# Tier 1 — Critical Gaps (Learn These First)

These are skills that appear in 60–80% of Senior/Staff AI Engineer job descriptions at
top companies right now. You have adjacent knowledge but not depth here.

---

## 1. Reasoning Models & Chain-of-Thought Orchestration

**Why it matters:** o1, o3, o4-mini, DeepSeek R1, Gemini 2.5 Pro Thinking — reasoning
models are now the default for complex tasks. Knowing *when* to use them vs. standard
models, how to structure prompts for extended thinking, and how to chain reasoning steps
is a distinct skill most engineers still lack.

**What to learn:**
- OpenAI o3/o4-mini API — structured prompting, effort levels, token budgets
- DeepSeek R1 — open-weights reasoning model, self-hosted with vLLM
- Anthropic Claude Extended Thinking (claude-sonnet-4-6 / opus-4-8)
- Chain-of-thought prompting patterns: ReAct, Tree-of-Thoughts, Self-Consistency
- When reasoning models break: long-context limits, cost vs. speed tradeoffs
- Combining reasoning models with tool use in LangGraph

**Hands-on project idea:** Build a research agent that uses o3 for planning, GPT-4o for
retrieval, and o4-mini for final summarization — demonstrating model routing by complexity.

**Resources:**
- OpenAI reasoning guide: platform.openai.com/docs/guides/reasoning
- DeepSeek R1 paper: arxiv.org/abs/2501.12948
- Anthropic extended thinking docs

---

## 2. Production LLM Serving — vLLM, TGI, SGLang

**Why it matters:** You know FastAPI + Azure Container Apps but you are deploying *API
wrappers*, not *model servers*. Companies building private LLM infrastructure need
engineers who can serve models efficiently. This gap appears in almost every role that
involves on-premise or cost-sensitive deployments.

**What to learn:**
- **vLLM** — PagedAttention, continuous batching, tensor parallelism, OpenAI-compatible server
- **TGI (Text Generation Inference)** — HuggingFace's production server, quantized serving
- **SGLang** — RadixAttention, structured generation, multi-modal serving
- **Ollama** — local model serving, useful for dev and demos
- Quantization formats: GPTQ, AWQ, GGUF, BitsAndBytes 4-bit
- Speculative decoding — 2-3x throughput with a draft model
- KV Cache optimization, max throughput benchmarking

**Key metrics to know:** tokens/sec, TTFT (time-to-first-token), p50/p99 latency,
GPU memory utilization

**Hands-on project idea:** Deploy LLaMA 3.1 8B with vLLM on a RunPod/Lambda Labs GPU,
expose OpenAI-compatible endpoint, benchmark vs. Groq API.

**Resources:**
- vLLM docs: docs.vllm.ai
- TGI: huggingface.co/docs/text-generation-inference
- SGLang: github.com/sgl-project/sglang

---

## 3. Fine-tuning at Production Depth — QLoRA, DPO, ORPO

**Why it matters:** You have "LoRA Fine-tuning" on your resume. Most candidates have that.
What separates you is knowing the *alignment* techniques (DPO, ORPO, RLHF) and running
efficient fine-tuning pipelines end-to-end — from dataset curation to HuggingFace Hub
publishing to serving.

**What to learn:**
- **QLoRA** — 4-bit quantized LoRA, Unsloth for 2x speed
- **Unsloth** — the fastest open-source fine-tuning library (must-know in 2025)
- **Axolotl** — production fine-tuning orchestration
- **DPO (Direct Preference Optimization)** — train models on human preference pairs
- **ORPO (Odds Ratio Preference Optimization)** — newer, more stable than DPO
- **GRPO** — Group Relative Policy Optimization (used in DeepSeek R1)
- Dataset curation: cleaning, deduplication, quality filtering, synthetic data generation
- Evaluation after fine-tuning: perplexity, task-specific benchmarks, vibe checks
- Pushing to HuggingFace Hub, GGUF conversion for Ollama

**Full pipeline to master:**
Raw data → synthetic augmentation (GPT-4o) → Unsloth QLoRA training →
model evaluation → GGUF conversion → Ollama/vLLM serving

**Hands-on project idea:** Fine-tune LLaMA 3.2 3B on a domain-specific QA dataset
(healthcare or legal), DPO-align it, push to HuggingFace, serve with Ollama, and publish
benchmark results. This is a portfolio-grade project that immediately differentiates you.

**Resources:**
- Unsloth: github.com/unslothai/unsloth
- Axolotl: github.com/OpenAccess-AI-Collective/axolotl
- DPO paper: arxiv.org/abs/2305.18290
- TRL library (HuggingFace): huggingface.co/docs/trl

---

## 4. Evals-First LLM Development

**Why it matters:** You use RAGAS, LangSmith, and Langfuse. Good. But "evals-first" as a
*methodology* — where you write evaluations before building the pipeline, run them on every
PR, and make deployment decisions based on eval results — is a distinct engineering
practice. Companies hiring for Staff+ roles now expect this rigor.

**What to learn:**
- **Promptfoo** — open-source LLM eval framework, red-teaming, CI integration
- **Braintrust** — production eval platform (similar to LangSmith but eval-focused)
- **LLM-as-judge patterns** — G-Eval, MT-Bench methodology
- Writing custom eval suites: groundedness, faithfulness, instruction-following, format
- A/B testing prompts and models systematically
- Regression testing: detecting when a new model/prompt breaks existing behavior
- Eval-driven iteration loop: build → eval → fail → fix → pass → deploy
- Synthetic dataset generation for evals (using GPT-4o to auto-generate test cases)

**Full eval stack to build:**
Task definition → test case generation → judge prompt design →
Promptfoo/RAGAS runner → CI gate (fail if score drops >5%) → dashboard

**Hands-on project idea:** Take your existing Azure LLMOps RAG project and retrofit a
full eval harness. Add a GitHub Actions step that runs Promptfoo on every PR and blocks
merge if groundedness score drops below threshold.

**Resources:**
- Promptfoo: promptfoo.dev
- Braintrust: braintrust.dev
- G-Eval paper: arxiv.org/abs/2303.16634
- RAGAS: docs.ragas.io

---

## 5. GraphRAG & Knowledge Graphs

**Why it matters:** Flat vector RAG has a ceiling — it can't answer multi-hop questions
("which employees worked on projects in Q2 that used vendor X who was blacklisted in Q3?").
Knowledge graph RAG (GraphRAG) solves this and is increasingly requested for enterprise
use cases. Microsoft's GraphRAG paper was one of the most cited AI papers of 2024.

**What to learn:**
- **Microsoft GraphRAG** — entity extraction → knowledge graph → community detection → hierarchical retrieval
- **Neo4j** — Cypher query language, graph data modeling, Python driver
- **LightRAG** — simpler alternative to GraphRAG, dual-level retrieval
- **LlamaIndex Property Graph** — combining vector + property graph
- Hybrid graph+vector retrieval: when to use which
- Entity and relation extraction with LLMs
- Graph construction from unstructured documents

**Hands-on project idea:** Build a GraphRAG system over a corpus of company documents
(annual reports, news articles) using Neo4j + LlamaIndex. Compare retrieval quality
against your existing hybrid vector RAG on multi-hop questions.

**Resources:**
- Microsoft GraphRAG: microsoft.github.io/graphrag
- LightRAG: github.com/HKUDS/LightRAG
- Neo4j + LLM: neo4j.com/docs/cypher-manual
- LlamaIndex Property Graph: docs.llamaindex.ai/en/stable/module_guides/indexing/lpg_index_guide

---

## Summary Priority Order

```
1. Reasoning Models      ← 1-2 weeks, highest ROI right now
2. vLLM/TGI Serving     ← 2-3 weeks, hard differentiator
3. QLoRA / DPO / ORPO   ← 3-4 weeks, major portfolio upgrade
4. Evals-First Dev      ← 2 weeks, methodology shift
5. GraphRAG + Neo4j     ← 2-3 weeks, enterprise differentiation
```

Total: ~12 weeks to own all five at a demonstrable level.
