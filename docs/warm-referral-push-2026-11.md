# Aria warm-referral push — send window 2026-11-01 onwards

Queued: 2026-05-13 · Trigger date: ~2026-11-01 · Channel: WhatsApp/iMessage + LinkedIn

**Why this date, not now:** The 3 practice clients (EJ Roofing, How High
Scaffolding, Dolled by Louise) need 5-6 months of accumulated Aria booking
data before they can credibly vouch. Premature DMs would land with no proof
beyond "kyle made this thing" — recipients can't be enthusiastic without
concrete receipts. By Nov 2026 each owner can say *"it booked me X jobs at
night last month"* — that's the language that triggers warm referrals.

## Pre-send checklist (run before firing)

- [ ] Confirm aria.html still live at aireyai.co.uk/aria.html
- [ ] Confirm the 3 demo sites still have working Aria widgets
- [ ] Pull each client's actual booking count from their dashboard (replace
      `{count}` placeholders below)
- [ ] Get first name for EJ Roofing owner + How High Scaffolding owner
      (Louise is already named)
- [ ] Check that standalone Aria pricing on aria.html still matches what
      you want to quote (currently: £0 trial / £300+£80 Basic / £500+£150 Pro)

---

## DM 1 — EJ Roofing owner

```
morning [name] — quick one. aria (the chat thing
that's been booking your roof inspections at
night for the last 6 months — i think you're up
to {count} captured leads now) is going out as
its own product. 14 days free for anyone, then
£80/mo.

if anyone in the trades comes to mind who'd
benefit, can you ping them this?
aireyai.co.uk/aria — your site's one of the 3
live demos on the page so they can chat with
the version running on yours.

cheers, no rush.
```

## DM 2 — How High Scaffolding owner

```
morning [name] — favour. aria (the bot that's
been handling your survey enquiries — bagged
{count} for you since we switched it on) is now
a standalone product other firms can rent.

your site's one of the 3 live demos on the
page. any scaffolder / trades mate who'd want
to play with it can chat with your version
direct: aireyai.co.uk/aria

14 days free, then £80/mo. if a name or two
comes to mind, send 'em the link.

ta.
```

## DM 3 — Louise (Dolled by Louise)

```
morning louise — quick favour. aria's now
available as its own thing (not just bundled
with new sites). 14 days free, then £80/mo.

your site is one of the 3 live demos —
aireyai.co.uk/aria. any salon / lash / brow /
nails folk you know who'd want it, ping them
the link?

she's booked you about {count} appointments
out-of-hours since we switched her on — that's
the line that'll sell it.

would owe you one.
```

---

## LinkedIn post (queue for Mon/Tue ~9am UK for max trades-owner feed time)

Post from your personal LinkedIn, not a company page — personal posts get
5-10× the reach. No hashtags spam, just one or two relevant.

```
the contact form on most small-business
websites is dead between 6pm and 9am.

every late-night enquiry that doesn't get a
response within 10 minutes goes to a
competitor. that's most of them.

so 6 months ago we built an ai receptionist
that bolts onto your existing site in 48
hours. answers questions, books jobs,
captures leads — 24/7.

3 cumbria businesses have been running it
live since may. between them they've captured
{combined_count} after-hours leads that
would've gone to voicemail or bounce.

you can chat with their version on the page:

aireyai.co.uk/aria

14 days free to try. no card. no rebuild.
cancel anytime.

if your phone's been off since 5pm and your
contact form is still quiet, you already know
how much you're losing.

#smallbusiness #trades
```

---

## After-send tracking

- Log each DM/post in `~/jarvis/agents/data/aireyai/referral_log.jsonl`
  (one line per send: timestamp, channel, recipient, draft_id)
- Check aria.html traffic in PostHog 48h after each batch
- Any trial signups arrive via mailto to kyle.airey@hotmail.com — search
  inbox for subject containing "Aria 14-day free trial"
- If 0 signups after 1 week + 0 page traffic: the referral chain didn't
  fire. Re-engage clients personally.
- If 1-2 signups: validated. Move to outreach proposal Option 2 (authorize
  the new tiers in reply_template.md, add reply path G).

---

## Killswitch

If by Nov 2026 any of the practice clients has churned, gone cold, or had a
falling-out — DO NOT send their DM. Asking for a referral from a cold relationship
burns goodwill. Pull just the surviving relationships.

If aria.html has been retired or repositioned in the interim — re-draft
against whatever's actually live, don't send these as-is.
