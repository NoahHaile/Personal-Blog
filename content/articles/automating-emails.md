---
title: "Case Study #3: Email Triage, Drafting & Follow‑Ups with n8n + Outlook"
Cover: "mailbox.jpg"
tags:
    - "Automation"
    - "Case Study"
    - "n8n"
    - "Revenue Operations"
date: "2025-08-07T10:57:26+03:00"
---
## Client Snapshot
![Introductions GIF](/boy.gif)
**Industry:** Website Design Agency for local Australian businesses  
**Key Contact:** Michael, Agency Owner  
**Customers:** Brick‑and‑mortar SMBs across Australia (trades, hospitality, clinics, retailers)

## Key Results Summary
- Prototype in 1 day; live in 5 days
- 20–30 emails/day auto‑handled (plus scheduled follow‑ups)
- Founder time cut from 3.5 hours/day to ~0.5 hours/day
- Lead replies in seconds; invoice nudges go out on time, every time

## The Challenge
![Challenged GIF](/worry-simpsons.gif)
Michael ran everything from a single Outlook inbox—no automations, no CRM. He needed to:

- Categorize incoming emails reliably (leads, invoices, support, spam)
- Send instant, hyper‑personalized replies where safe; draft others for quick approval
- Keep invoice and lead follow‑ups on schedule without manual tracking
- Stay compliant with Australia’s Spam Act and retain his brand’s personable tone
- Do it all inside Outlook, with a lightweight way to review and control


## The Goal
![Relax GIF](/relax.gif)
Replace manual inbox management with an AI‑assisted workflow that:

- Auto‑classifies messages and triggers the right action (send, draft, queue follow‑up)
- Operates entirely via Outlook and a simple Google Sheets dashboard
- Reduces founder time dramatically without sacrificing personalization
- Ships a demo in 1 day and a production system in under a week


## Solution at a Glance
A production‑ready n8n workflow that watches Michael’s Outlook inbox, classifies each message, drafts or sends a response, and schedules follow‑ups for leads and invoices. All activity is logged to Google Sheets for review.

**Inputs:** New Outlook emails (single mailbox), manual “review” label for edge cases  
**Processing:** AI‑assisted triage and drafting; rules for timing, tone, and business hours  
**Outputs:** Sent replies, saved drafts, next‑action reminders, inbox categories updated  
**Operations:** Idempotent processing, retries with backoff, run logs, email alerts on failures

**System Architecture:**  
Outlook → n8n on VPS → Classifier/Drafter → Google Sheets log → Outlook actions


## Lightning‑Fast Process

1. **Clickable demo in 1 day**
    - Live triage on a small inbox subset
    - Immediate feedback on categories, tone, and safe‑send rules

2. **Daily iteration (2 refinements)**
    - Tight loop with Michael to tune templates and follow‑up cadences
    - Added business‑hours sending and an approval lane for sensitive drafts

3. **Standardize and ship (day 5)**
    - Hardened workflow, error handling, and logging
    - Loom walkthroughs and a quickstart doc for simple self‑management


## What It Does
![Explainer GIF](/explain.gif)
**Classification:** Lead, Quote/Proposal, Invoice/Payment, Support, Spam/Promotions, OOO

**Replies:**
- Instant send for low‑risk, high‑confidence cases (e.g., basic info requests)
- Draft‑only for nuanced messages; Michael approves with one click

**Lead follow‑ups:** Day 0 instant reply; nudges at +2 and +5 business days; auto‑stop on reply or booked call

**Invoice follow‑ups:** Pre‑due (−3 days), due‑day, +3 and +7 business days; pauses after 2 unanswered nudges

**Personalization:** Templates enriched with business name, suburb, service requested, prior thread context, and Australian tone/spelling

**Business hours:** AEST/AEDT; no weekends or public holidays

**Logging:** Every action and next step recorded in Google Sheets


## The Results

- Founder time dropped from ~3.5 hours/day to ~0.5 hours/day
- Lead response time improved to seconds in straightforward cases; “draft‑first” cut the rest to minutes
- Invoices got consistent, on‑brand reminders without manual tracking

| Before (Manual Inbox)      | After (AI‑Assisted Flow)                |
|----------------------------|-----------------------------------------|
| Missed and late follow‑ups | Scheduled nudges for leads and invoices |
| Slow, inconsistent replies | Instant replies or ready‑to‑send drafts |
| No system of record        | Google Sheets log with status and next step |
| High founder time cost     | 3+ hours/day saved                      |

---

## Performance & Reliability

- 20–30 inbound emails/day auto‑handled (plus follow‑ups queued)
- Hosted on a client VPS; secure OAuth app for Microsoft 365
- Outlook integration via Microsoft Graph (delta notifications) to avoid polling
- Idempotent processing with message IDs; retries with exponential backoff
- Email alerts to Michael on failures or items needing approval
- Rate‑limit aware; sends restricted to local business hours (AEST/AEDT)


## Compliance & Brand

- Australia Spam Act 2003: sender identification and opt‑out line on non‑transactional follow‑ups
- No cold blasting; responses are to inbound or ongoing threads
- DKIM/SPF/DMARC validated through Microsoft 365 tenant
- PII limited to email metadata and thread content; retention and access controlled on the VPS and Sheets


## Deliverables

- n8n workflow (JSON) deployed on VPS
- Google Sheets dashboard (status, outcomes, next actions)
- Template library (lead, proposal, invoice, support, OOO) with style guide
- Taxonomy and routing rules; quickstart + Loom walkthroughs
- Optional hypercare support for the first two weeks


## Tech Stack

- **Orchestration:** n8n on VPS
- **Email:** Microsoft 365 Outlook via Graph API (delta subscriptions)
- **Data:** Google Sheets for queueing/logs
- **AI:** Triage and personalized drafting with few‑shot templates
- **Ops:** Email alerts, run logs, retries, idempotency keys


## The Client Says

> “My inbox used to run my day. Now it’s the other way around. Replies go out fast, follow‑ups never slip, and I only review the tricky ones. I got back about three hours every day without losing the personal touch.”


## Like These Results?

Let’s tame your inbox, keep follow‑ups on schedule, and win back hours each week.

[Share your stack and goals. I’ll send a quick build plan and timeline.](mailto:noah@noahhaile.com?subject=I%20Saw%20Your%20Case%20Study%20-%20I%20Have%20A%20Request)
---