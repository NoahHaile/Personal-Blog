---
title: "Case Study #4: Cold Outbound Automation (Clay → Smartlead via n8n)"
Cover: "plane.jpg"
tags:
    - "Automation"
    - "Case Study"
    - "n8n"
    - "Revenue Operations"
date: "2025-08-09T10:57:26+03:00"
---
## Client Snapshot
![Introductions GIF](/boy.gif)
**Industry:** Visitor attribution SaaS (identifies up to 70% of U.S. website visitors)  
**Key Contact:** Stephen, Founder  
**Targets:** Marketing and revenue leaders (Demand Gen, Growth, RevOps, CMOs)

## Key Results
- End‑to‑end Clay → Smartlead pipeline automated with self‑hosted n8n
- AI‑driven persona templates personalized by industry, company size, title, and role
- Up to 1,000 emails/day with safe sending and governance
- Reply rate lifted to 2%
- Supabase used for clean data storage, suppressions, and logs

## The Challenge
![Running GIF](/running.gif)
The team could enrich prospects in Clay and had Smartlead ready to send, but they lacked:
- A reliable way to sync “ready” records into the right Smartlead campaigns at scale
- Cleanliness and governance (dedupes, suppressions for customers/competitors, opt‑outs)
- On‑message personalization across industries and roles without breaking deliverability
- A feedback loop to classify replies and route positives quickly

Manual CSV shuffling and inconsistent fields slowed launch and risked sender reputation.

## The Goal

Ship a scalable cold outbound engine that:
- Automatically syncs qualified records from Clay to the correct Smartlead campaigns
- Personalizes copy by industry, company size, title, and role with AI‑assisted templates
- Protects deliverability with inbox rotation, daily caps, and domain hygiene
- Classifies replies and routes positives to book meetings fast
- Provides clear logs and controls without adding a heavy CRM

## Solution at a Glance

An n8n‑orchestrated pipeline that turns Clay tables into live, personalized Smartlead campaigns—with data governance and a closed‑loop on replies.

**System Architecture:**  
Clay → n8n Orchestrator → Smartlead Campaigns → Reply Webhooks → n8n Router → Email/Slack Alerts + Supabase Logs

**Inputs:** Clay table/webhook with enriched, validated prospects  
**Orchestration:** n8n maps fields, dedupes, applies suppressions, and assigns campaigns  
**Sending:** Smartlead across rotating inboxes with daily caps and ramp schedules  
**Storage/Logs:** Supabase for lead status, suppressions, and run history  
**Outputs:** Replies classified; positives routed; OOOs rescheduled; bounces suppressed


## Lightning‑Fast Process

1. **Prototype**
    - Mapped Clay fields to Smartlead custom fields and campaigns
    - Staged safe personalization rules and fallbacks (fail‑closed)
2. **Iterate**
    - A/B tested subject lines, first lines, and CTAs by persona and industry
    - Tuned send windows, inbox rotation, and daily caps
3. **Standardize & Ship**
    - Added reply classification and positive‑reply routing
    - Implemented logging, alerts, and a simple tuning playbook


## What It Does
![Plans GIF](/live.gif)
### Clay Intake
- Pulls “Ready” rows (valid email, persona tags, industry, company size)
- Normalizes fields and verifies status before syncing

### Data Hygiene
- Dedupes by email and domain
- Global suppressions for customers/partners/competitors and past unsubscribers
- Optional catch‑all filtering based on risk tolerance

### Personalization
- AI‑assisted templates tailored by industry, company size, title/role
- First‑line and proof‑point snippets derived from Clay context
- Fallbacks if key fields are missing (never send half‑baked personalization)

### Campaigning
- Assigns to Smartlead campaign by persona/segment
- Respects per‑mailbox daily caps, ramp plan, and time‑zone windows
- Inbox rotation and staggered sends to protect reputation

### Replies and Routing
- Smartlead webhook → n8n classifier (positive/neutral/negative/OOO/bounce)
- Positive → instant alert with booking link and owner assignment
- OOO → reschedule on return date; bounce → suppress and log

### Observability
- Supabase log of every record, campaign, send status, and next action
- Daily digest + error alerts via email/Slack


## Email Optimization Highlights

### Persona System
- AI‑generated variants by industry (e.g., SaaS, eCommerce, B2B services) and role (Demand Gen, RevOps, CMO)
- Value props framed to the product’s core proof (attribution on anonymous traffic → better retargeting, higher paid ROI, clearer pipeline attribution)

### Copy Format
- Short, plain‑text, mobile‑friendly; one clear CTA
- Clay‑verified context only; no over‑specific claims

### Testing
- Subject lines, first lines, and CTAs by persona
- Winner criteria focused on positive replies/meetings, not opens

---

## The Results

- Clay → Smartlead sync fully automated with governance and observability
- Personalized outreach at scale without sacrificing deliverability
- Up to 1,000 emails/day with safe sending and reliable routing of positives
- Reply rate improved to 2% with persona‑specific messaging

| Before (Manual/Ad‑hoc)         | After (Automated & Governed)              |
| ------------------------------ | ----------------------------------------- |
| CSV imports and field drift    | n8n mapping and validation at the edge    |
| Duplicates and bad targets     | Dedup + suppressions + safety checks      |
| Generic, one‑size‑fits‑all     | AI‑assisted persona templates by segment  |
| Missed replies and OOOs        | Webhook routing and automated reschedules |

---

## Performance & Reliability

- **Volume:** up to 1,000 emails/day across rotating inboxes
- **Deliverability safeguards:** SPF/DKIM/DMARC on sending domains/subdomains; gradual warmup and daily caps
- **Governance:** idempotent keys (Clay row ID + email), retries with backoff, global suppressions
- **Monitoring:** Supabase run logs; daily performance digest; error alerts
- **Hosting:** self‑hosted n8n on VPS; credentials stored in n8n; least‑privilege access

---

## Compliance & Brand

- **U.S. compliance:** clear sender identity, physical address, functional opt‑out (CAN‑SPAM)
- Honor unsubscribes and data subject requests; no sending to suppressed domains
- Minimal data retained in Supabase; access scoped and rotated

---

## Deliverables
![Jump GIF](/jump.gif)
- n8n workflows (JSON) for Clay intake, Smartlead sync, and reply routing
- Field mapping and data dictionary (Clay → Smartlead)
- AI‑assisted persona template library + testing plan
- Supabase schema for leads, suppressions, and logs
- SOPs, Loom walkthroughs, and a tuning playbook

---

## Tech Stack

- **Orchestration:** n8n (self‑hosted)
- **Prospecting/Enrichment:** Clay
- **Sending:** Smartlead (multi‑mailbox rotation, webhooks)
- **Data/Logs:** Supabase
- **Alerts:** Email/Slack
- **DNS:** SPF, DKIM, DMARC for sending domains/subdomains

---

## Like These Results?

Let’s connect Clay and Smartlead the right way—clean data in, safe sending out, and persona‑driven copy that gets replies.

**Share your stack and goals. I’ll send a quick build plan and timeline.**