---
title: google-sheets-crm-follow-up-automation-for-solo-consultants
date_created: 2026-05-24 23:20:00
date_modified: 2026-05-24 23:20:00
tags: [automation-lab, google-sheets, crm, follow-up, freelancers, apps-script]
lane: automation-lab
artifactType: checklist
author:
  name: Josh Peterson
  picture: /assets/blog/authors/2017_profile_pic.jpg
coverImage: /assets/blog/images/google-sheets-crm-follow-up-cover.png
date: 2026-05-24T23:30:00-06:00
excerpt: "A practical first lab build for solo consultants: a Google Sheets CRM that turns follow-up from memory into a repeatable operating system."
ogImage:
  url: /assets/blog/images/google-sheets-crm-follow-up-cover.png
---
# Google Sheets CRM + Follow-Up Automation for Solo Consultants

Most solo consultants do not need a full CRM on day one. They need a place to see who matters, what was promised, and what needs follow-up before the thread goes cold.

This is the first Automation Lab anchor because it is small enough to build quickly, painful enough to matter, and flexible enough to become a template, a service offer, or a niche-site content series.

## The Operating Problem

Follow-up usually fails in three places:

- the next action is not written down
- the due date is not visible during the workday
- the pipeline is reviewed only when panic arrives

The minimum useful system is a Google Sheet with clear stages, a follow-up date, and a short automation that surfaces what needs attention.

## Artifact: CRM Build Checklist

Use one sheet called `Opportunities` with these columns:

- `Contact`
- `Company`
- `Offer`
- `Stage`
- `Last Touch`
- `Next Follow-Up`
- `Next Action`
- `Value`
- `Source`
- `Notes`

Use these starter stages:

- `Lead`
- `Contacted`
- `Conversation`
- `Proposal`
- `Won`
- `Lost`
- `Nurture`

Then add one filtered view for each day:

- overdue follow-ups
- due today
- proposals waiting on a reply
- nurture contacts older than 30 days

## Starter Apps Script

This script finds rows due today or earlier and writes a short summary that can be adapted for email, Slack, or a daily dashboard.

```javascript
function getFollowUpsDue() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Opportunities");
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const followUpIndex = headers.indexOf("Next Follow-Up");
  const contactIndex = headers.indexOf("Contact");
  const actionIndex = headers.indexOf("Next Action");
  const stageIndex = headers.indexOf("Stage");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return values
    .filter((row) => {
      const followUpDate = row[followUpIndex];
      return followUpDate instanceof Date && followUpDate <= today;
    })
    .map((row) => ({
      contact: row[contactIndex],
      stage: row[stageIndex],
      action: row[actionIndex],
      followUpDate: row[followUpIndex],
    }));
}
```

## What Makes This A Good Niche Pilot

This is not a generic "best CRM tools" article. It is a working workflow. A useful version can turn into:

- a downloadable Google Sheet template
- a setup checklist
- a client intake service
- a before-and-after case study
- a small library of Apps Script recipes

The test is simple: does the artifact help one operator see and act on the next follow-up faster than they could yesterday?

## Next Lab Step

The next build is a daily follow-up digest: the sheet checks due items each morning and sends a concise summary to Gmail or Slack. That turns the CRM from a storage place into an operating rhythm.
