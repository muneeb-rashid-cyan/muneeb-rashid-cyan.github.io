# Portfolio content audit

Source: `Muneeb_Rashid_AI_Engineer_KSA.pdf`, pages 1–2, including its embedded URL annotations. Audited 10 September 2026. The CV is authoritative even where earlier repository guidance or career-planning notes disagree. Original branch: `main`. No commits or pushes performed.

## Scope and source hierarchy

Read the original HTML, CSS, JavaScript, CLAUDE.md, all seven files in `advancement/`, the full two-page CV, Git status and remote configuration. There are no application dependencies, backend, build configuration, or applicable AGENTS.md files. `advancement/` contains historical advice and proposed projects, not verified portfolio evidence; it remains untouched. Those notes include outdated skill-gap claims and unsupported metrics, so none were imported into the site.

Public GitHub metadata was checked for link availability, then README files and source code were inspected for the selected builds. The API returned 77 public repositories. The CV's three selected project titles have no identifiable matching public repositories, so they remain separate CV case studies. A separate open-source collection now contains seven verified public repositories. The GitHub profile remains linked. No live demo is supplied by the CV or verified in repository metadata, so no demo buttons are shown.

## Identity, location, availability, and contact

| Original claim | CV / action |
|---|---|
| 8+ years in hero, about, and CLAUDE.md | Changed to **5+ years**, verbatim from CV summary. Did not recalculate from earliest part-time employment. |
| Lahore, Pakistan in about/contact; Pakistan SEO positioning | Changed to **Riyadh, Saudi Arabia** in visible content, metadata, and structured data. |
| Actively seeking, immediate start, remote/on-site availability, full-time/contract/consulting availability | Removed unsupported start date and engagement claims. Contact invitation targets the roles the user requested. |
| No Iqama information | Added **Transferable Iqama**, explicitly in CV. User's current CV instruction supersedes old CLAUDE.md prohibition on visa-related phrasing. |
| `Muneeb_Rashid_Resume.pdf` | Missing file; all CV links now download the existing `Muneeb_Rashid_AI_Engineer_KSA.pdf`. |
| `muneebcyan@gmail.com` | Matches CV; retained. |
| `+92-333-0760460` | Number matches; displayed as CV's +92 333 076 0460, with `tel:+923330760460`. |
| Phone / WhatsApp | Changed to phone link only; WhatsApp availability is not in CV. |
| LinkedIn and GitHub URLs | Match PDF annotations; normalized LinkedIn trailing slash. |
| Portfolio URL | Matches CV annotation and Git remote; used for canonical, social metadata, and sitemap. |
| Form reports “Message Sent!” after opening mail client | Removed form and false delivery confirmation; direct mail link plus clipboard action with truthful success/failure status. |

## Employment: every role and date

| Employer | Original | Correct CV content |
|---|---|---|
| Arbisoft | Senior AI Engineer; Plano, Texas, USA; Nov 2024–Present | **Senior AI Engineer; Riyadh, Saudi Arabia; Nov 2024–Present.** Dates/title retained. |
| PureLogics | Senior Artificial Intelligence Engineer; Lahore, Pakistan; May 2023–Oct 2024 | **Senior AI Engineer; Remote, USA; May 2023–Oct 2024.** Dates retained; title normalized to CV. |
| SmartFun Studios (Pvt) Ltd | Machine Learning Engineer; Lahore, Pakistan; Jun 2020–Apr 2023 | **SmartFun Studios; Machine Learning Engineer; Remote, USA; Jun 2020–Apr 2023.** Unsupported legal suffix removed; dates/title retained. |
| Yottabyte | Machine Learning Engineer; Lahore, Pakistan; Jun 2018–Feb 2020 | **Machine Learning Engineer (Part-time); Pakistan; Jun 2018–Feb 2020.** Part-time designation restored; unsupported city removed. |

## Metrics and professional achievements

| Original claim / omission | Resolution |
|---|---|
| 15+ production models | Removed; not in CV. |
| 3 cloud platforms | AWS/Azure/GCP are supported, but replaced this low-signal counter with a sourced achievement. |
| 100,000+ users attached generally to personal products / enterprise RAG | Scoped to **the healthcare platform containing MedQuery**, as stated in CV. No claim that every platform user uses RAG. |
| General 95%+ accuracy / healthcare concern identification accuracy | Removed; not in CV. |
| Storybook 10,000+ daily active users | Retained as platform scale, with CV's **Storybook Studio** name. |
| 50+ scenes and 15+ languages | Retained, scoped to Arbisoft workflows. |
| 60% fewer regenerations; 85% scene consistency; 40% fewer generation errors | Removed all three unsupported metrics. |
| Leonardo AI, Imagen3, DALL-E, Veo3 vs Sora, reference image conditioning, ElevenLabs, Meta Seamless | Removed employer-specific implementation claims not present in CV. Retained text/image/video/audio APIs and **Gemini Flash validation**. |
| 5,000+ daily workflow automation tasks | Removed metric; retained **FlowAssist**, n8n/Zapier and CV packaging details. |
| Three-stage quality gates, AKS at Arbisoft | Removed unsupported stage count/service. Restored **AgentOps**, MLflow registry, Azure Container Apps, Azure DevOps, quality gates and rollback. |
| GPT-4 healthcare implementation | Removed model attribution; CV does not specify it. |
| 2TB+ daily data, 500+ concurrent users, 90%+ retrieval accuracy, <1s response | Removed all four unsupported PureLogics metrics. |
| 200+ hours saved monthly, 30% infrastructure savings | Removed both unsupported business metrics. Retained demand/cost management through elastic scaling and vector-index optimization. |
| MedQuery / DataLens names and PII redaction, access controls, audit logging absent | Restored from CV; retained direct US/Canadian client delivery and production handover. |
| Face recognition pipeline described generically | Uses **FaceLite** with CV's model quantization and local-inference explanation; avoids unsupported extra model-type claims. |
| 8s → 800ms; 90% faster on Android Mali-T860 | Retained exactly, scoped to FaceLite. |
| 99.15% drowsiness accuracy; SMS/email alert channels | Removed unsupported metric and channel details. Uses **DriveGuard** and real-time alerts. |
| Mobile gaming/prediction/decision-automation work at SmartFun | Removed unsupported scope. |
| Mentored 3 junior engineers and authored training documentation | Retained; restored **DVC/Git experimentation and evaluation workflow**. |
| Yottabyte: 40% faster deployment, 90%+ accuracy, large-scale data/feature engineering, MLflow registry | Removed unsupported metrics and employer-specific details. Retained Azure ML/DevOps, Docker/ACR, classification/regression, quality gates and rollback. |
| Broad clients across Pakistan, USA, Canada and cross-functional leadership | Rephrased to the precise CV evidence: US/Canadian clients, client-facing delivery, engineer mentoring. |

## Skills

Replaced the broad tool catalogue and subjective language progress bars with the CV's four technical categories. No invented proficiency percentages or levels remain.

**Removed unsupported standalone skills, versions, or stronger specificity:** GPT-4, Claude, generic Gemini (Gemini Flash remains within sourced Arbisoft work), DALL-E, Imagen3, Veo3, Sora, prompt engineering, BM25 + vector + RRF specifics, cross-encoder specificity, semantic chunking, hallucination detection, query rewriting, citation tracking, OpenAI Agents SDK, FastMCP, custom MCP servers, ChromaDB, AKS/EKS specificity, Terraform, Azure AI Foundry, Jenkins, Databricks, AWS SageMaker, AWS Lambda, Azure OpenAI, BigQuery, Cosmos DB, YOLO, SAM, TensorFlow Lite, OpenVINO, ElevenLabs, Whisper, R, Bash/Shell. Removed Python 96%/Expert, SQL 85%/Advanced, R 70%/Intermediate, Bash 72%/Intermediate.

**Retained or normalized from CV:** LangGraph, LangChain, LlamaIndex, MCP, hybrid search, reranking, Pinecone, Weaviate, PyTorch, LoRA, ONNX, TensorRT, OpenCV, TensorFlow, RAGAS, LangSmith, Langfuse, Azure ML, Azure DevOps, MLflow, DVC, AWS Bedrock, GCP Vertex AI, Docker, Kubernetes, Python, SQL, FastAPI. n8n, Zapier and Azure Container Registry remain within documented work. LLaMA 3 remains in the selected fine-tuning project.

**Restored missing CV strengths:** GraphRAG/Neo4j, QLoRA, DeepSpeed, DPO, vLLM, AWQ, DeepEval, Azure AI Search, Azure Container Apps, PostgreSQL, Redis, PII redaction, access controls, audit logging, regression gates, canary deployment. Selected projects include their explicitly listed GitHub Actions, Jetson, TensorRT INT8, Prometheus and MLflow stacks.

## Projects

Replaced twelve old cards with three selected projects on CV page 2, then added seven verified public GitHub builds in a separate collection:

1. **Distributed LLM Fine-Tuning & Inference Platform:** ZeRO-3, 4-bit QLoRA, checkpointing/offload, adapter merge, AWQ, vLLM continuous batching/speculative decoding, MLflow and versioned evaluation-gated release.
2. **Self-Improving Agent Platform:** trace-to-preference pairs, DPO, deterministic/LLM scoring, bootstrap confidence intervals, canary deployment and regression-triggered rollback.
3. **Edge Vision Fleet Platform:** ONNX/TensorRT INT8 on Jetson, per-target accuracy/latency checks, signed OTA bundles, 1%/10% canaries, drift rollback and cloud escalation of uncertain frames.

The three CV architecture diagrams are explanatory visualizations, not screenshots of a deployed dashboard. They do not imply benchmark measurements or live telemetry. GPU 01/02/… illustrates CV-described multi-GPU sharding, not a claimed fleet count. The seven GitHub cards are grounded in repository implementation details and link directly to each repository. Business/engineering impact is qualitative where neither source gives a numerical outcome. No dates, links, scale claims, benchmarks, or completion credentials were invented.

The seven GitHub cards use README and source evidence as follows:

| Open-source build | Repository evidence used | Public link |
|---|---|---|
| Azure Multimodal RAG & Document Intelligence | README, ingestion, retrieval, generation, evaluation, dashboard, tests, Azure pipeline | [Repository](https://github.com/muneeb-rashid-cyan/Azure-LLmops-Rag-Doc-Intelligence-Hybrid-Search) |
| Multi-Agent Research Pipeline | README, Supervisor/Researcher/Writer nodes, FastAPI API, tests, Docker and Azure pipeline | [Repository](https://github.com/muneeb-rashid-cyan/LLMOps-Multi-Agent-Azure-CICD-Pipeline-) |
| DevMind — AI Developer Assistant | README, triage/specialist agents, MCP factories, guardrails, SQLite session | [Repository](https://github.com/muneeb-rashid-cyan/Devmind-AI-Dev-Assistant) |
| Customer Support Agent | README, async graph, specialist tools, interrupt approval, AsyncSqliteSaver | [Repository](https://github.com/muneeb-rashid-cyan/LangGraph-Customer-Support-Agent) |
| Voice Research Assistant | README, FastAPI voice handler, STT/agent/TTS workflow, guardrails, SQLite session | [Repository](https://github.com/muneeb-rashid-cyan/Multi-Agent-Voice-Assistant) |
| Smart Interview Prep Agent | README, typed LangGraph nodes, FastAPI routes, Docker, ACR/ACI and four-stage Azure pipeline | [Repository](https://github.com/muneeb-rashid-cyan/Interview-Prep-Agent-Azure-ACI) |
| Multi-Model Serving on Azure Container Apps | README, service structure, Docker/ACR and Azure Container Apps deployment documentation | [Repository](https://github.com/muneeb-rashid-cyan/azure-container-apps-multi-model-serving) |

These cards describe architecture and technology only. They do not imply live deployments, current uptime, employment ownership, or additional performance metrics. No live demo URL was found in the reviewed repositories.

The following other former cards are absent from the focused showcase (their repository names do exist in the public account):

| Former card | Public repository |
|---|---|
| MarketPulse AI — MCP Intelligence Agent | `langgraph-mcp-intelligence-agent` |
| Azure LLMOps RAG — Hybrid Search & Doc Intelligence | `Azure-LLmops-Rag-Doc-Intelligence-Hybrid-Search` |
| LangGraph Customer Support Agent | `LangGraph-Customer-Support-Agent` |
| Multi-Agent Voice Assistant | `Multi-Agent-Voice-Assistant` |
| LangGraph SQL Agent | `LangGraph-SQL-Agent` |
| AI Interview Prep Agent | `Interview-Prep-Agent-Azure-ACI` |
| AI Travel Booking Agent | `AI-Travel-Booking-Agent` |
| Devmind — AI Developer Assistant | `Devmind-AI-Dev-Assistant` |
| Multi-Agent Research Pipeline | `LLMOps-Multi-Agent-Azure-CICD-Pipeline-` |
| Azure News Intelligence Dashboard | `LLMops-Azure-News-Dashboard` |
| AI Job Application Agent | `AI-Job-Application-Agent-Azure-WebApps` |
| Multi-Model Serving on Azure Container Apps | `azure-container-apps-multi-model-serving` |

## Certification, training, and education

| Original claim | Resolution |
|---|---|
| Microsoft credential missing | Added exact **Microsoft Certified: Machine Learning Operations Engineer Associate (AI-300)**. No issue/expiry date or verification URL invented. |
| Generative AI with Large Language Models — DeepLearning.AI/Coursera | Removed: absent from CV. |
| Natural Language Processing Specialization — DeepLearning.AI/Coursera | Removed: absent from CV. |
| Deep Learning Specialization — DeepLearning.AI/Coursera | Removed: absent from CV. |
| MLOps Bootcamp: Mastering AI Operations; Azure ML & MLOps: Beginner to Advance presented as certifications | Reclassified as **professional development/training**, using only CV names: Azure Machine Learning & MLOps; MLOps Bootcamp — Udemy. |
| MS Data Science, FAST NUCES Islamabad, 2021–2023, GPA 3.73/4.0 | All match; retained. “Teacher Assistant” corrected to **Teaching Assistant: Machine Learning & Advanced ML**. |
| MS focus areas: deep learning architectures/statistical modeling/large-scale data engineering | Removed unsupported academic focus descriptions. |
| BS Mathematics, Bahauddin Zakariya University Multan, 2017–2021, GPA 3.53/4.0 | All match; retained. |
| BS specific calculus/linear algebra/probability/numerical-methods curriculum | Removed unsupported curriculum detail. |

## Repository guidance

Updated CLAUDE.md to reflect the current CV, new design, working download, interactions, and source rules. Historical `advancement/` notes remain user-owned and unmodified. The CV remains byte-for-byte unchanged and must be staged explicitly when publishing so the download works on GitHub Pages.
