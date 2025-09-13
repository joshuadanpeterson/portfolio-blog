---
title: slack-api-secrets-overcoming-the-canvas-editing-one-change-limit
date_created: 2025-04-05 09:07:34
date_modified: 2025-08-03 02:12:17
tags: [informative, analysis, documentation, slack-api, canvas-editing, automation-challenges]
favorite: 
id: 01JBTX108VXRC8Z8Y3Q1EABXWD
author:
  name: Josh Peterson
  picture: /assets/blog/authors/2017_profile_pic.jpg
coverImage: /assets/blog/images/slack-api-secrets-cover.png
date: 2025-04-05T01:00:00.322Z
excerpt: Turns out, the Slack API enforces a one-change-per-request limit, and it’s a game-changer for bulk edits. 
ogImage:
  url: /assets/blog/images/slack-api-secrets-cover.png
---
# Slack API Secrets: Overcoming the Canvas Editing One-Change Limit

If you’ve ever tried to automate edits to Slack canvases—like removing multiple sections in one go—you might’ve hit a wall that’s not spelled out in the docs. I did, and it took some digging to figure out why my `canvases.edit` calls were failing with a cryptic error: `"no more than 1 items allowed"`. Turns out, the Slack API enforces a one-change-per-request limit, and it’s a game-changer for bulk edits. In this post, I’ll break down this hidden rule, how I stumbled into it, and the simple fix that got me back on track. Let’s crack this open.

## The Setup: Editing a Canvas

I was working on a project to clean up canvases in a bunch of Slack channels—53 of them, to be exact. Each canvas had a section with an H2 heading "Reported Issues" and a paragraph below it: "Please detail any issues found during the inspection below:". My goal? Remove both sections programmatically using the Slack API. Easy, right?

I started with `canvases.sections.lookup` to find the `section_id`s (more on that adventure later) and planned to zap them out with `canvases.edit`. Here’s what my first attempt looked like:

```javascript
const editOptions = {
  method: 'post',
  contentType: 'application/json; charset=utf-8',
  headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
  payload: JSON.stringify({
    canvas_id: 'F1234567890',
    changes: [
      { "operation": "delete", "section_id": "temp:C:abc123" }, // H2
      { "operation": "delete", "section_id": "temp:C:def456" }  // Paragraph
    ]
  }),
  muteHttpExceptions: true
};
UrlFetchApp.fetch('https://slack.com/api/canvases.edit', editOptions);
```

Two deletes in one go—seems logical for efficiency. But then I hit this:

```
ERROR removing sections from canvas F1234567890 in #channel: invalid_arguments - {"ok":false,"error":"invalid_arguments","response_metadata":{"messages":["[ERROR] no more than 1 items allowed [json-pointer:\/changes]"]}}
```

## The Hidden Rule

That error—`no more than 1 items allowed`—was a curveball. The Slack API docs for `canvases.edit` ([canvases.edit | Slack](https://api.slack.com/methods/canvases.edit)) describe the `changes` array as a list of operations (`insert_at_start`, `delete`, etc.), but there’s no mention of a size limit. I assumed I could batch multiple edits—like deleting two sections—into one request. Nope. Slack enforces a strict rule: **only one change per `canvases.edit` call**.

This isn’t just a quirk; it’s a design choice. It forces you to treat each edit as an atomic operation, which might help with consistency or server-side processing, but it’s a pain when you’re trying to clean up multiple sections at once. The error points to `[json-pointer:\/changes]`, confirming the `changes` array itself is capped at one item.

## The Stumble

I’d already wrestled with finding those `section_id`s (a story for another post—hint: `canvases.sections.lookup` is your friend, but `section_types` is a guessing game). Finally getting them—say, `temp:C:abc123` for the H2 and `temp:C:def456` for the paragraph—I thought I was home free. My script looped through 53 channels, found the sections, and tried to delete both in one shot. That’s when the API threw the one-change limit in my face. Efficiency? Out the window. Frustration? Sky-high.

## The Fix: One at a Time

The workaround was straightforward once I saw the pattern: split the edits into separate `canvases.edit` calls. Instead of one request with two changes, I made two requests, each with a single `"delete"`. Here’s how it looks:

```javascript
// Delete H2 section
if (h2SectionId) {
  const h2EditOptions = {
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
    payload: JSON.stringify({
      canvas_id: 'F1234567890',
      changes: [{"operation": "delete", "section_id": h2SectionId}]
    }),
    muteHttpExceptions: true
  };
  const h2Response = UrlFetchApp.fetch('https://slack.com/api/canvases.edit', h2EditOptions);
  const h2Result = JSON.parse(h2Response.getContentText());
  if (h2Result.ok) {
    Logger.log(`Removed H2 section ${h2SectionId}`);
  } else {
    Logger.log(`Error removing H2: ${h2Result.error}`);
  }
  Utilities.sleep(1000); // Avoid rate limits
}

// Delete paragraph section
if (pSectionId) {
  const pEditOptions = {
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
    payload: JSON.stringify({
      canvas_id: 'F1234567890',
      changes: [{"operation": "delete", "section_id": pSectionId}]
    }),
    muteHttpExceptions: true
  };
  const pResponse = UrlFetchApp.fetch('https://slack.com/api/canvases.edit', pEditOptions);
  const pResult = JSON.parse(pResponse.getContentText());
  if (pResult.ok) {
    Logger.log(`Removed paragraph section ${pSectionId}`);
  } else {
    Logger.log(`Error removing paragraph: ${pResult.error}`);
  }
}
```

- **Key Change**: Each `changes` array has exactly one item. First, I delete the H2 section (if found), then the paragraph section (if found).
- **Rate Limiting**: I added a `Utilities.sleep(1000)` between calls to stay under Slack’s rate limit (Tier 3: ~50 requests/minute for user tokens). With 53 canvases and two edits each, that’s 106 requests—manageable with a 1-second delay.

## Did It Work?

Yes! Once I split the calls, both sections vanished from the canvases where they existed. The H2 "Reported Issues" went first, followed by the paragraph, leaving the canvases cleaner without a hitch. The logs confirmed it: "Removed H2 section temp:C:abc123" and "Removed paragraph section temp:C:def456" for each channel that had them.

## Why This Matters

This one-change limit isn’t just a gotcha—it’s a lesson in Slack API design:

- **Atomic Edits**: Slack wants each change to stand alone, likely for consistency or error handling. Batch edits? Not an option.
- **Rate Limit Dance**: More requests mean more rate limit awareness. My 53 channels pushed me close to the edge, but the sleep kept me safe.
- **Docs Gap**: The lack of mention in the official docs ([canvases.edit](https://api.slack.com/methods/canvases.edit)) makes this a trial-and-error discovery—until now.

## Takeaways for Your Next Canvas Project
- **One Change at a Time**: Plan your `canvases.edit` calls with a single operation each. Want to delete three sections? That’s three requests.
- **Mind the Rate**: Slack’s generous with rate limits (50+/minute for user tokens), but bulk edits need pacing—`Utilities.sleep(1000)` is your friend.
- **Test Small**: I learned this the hard way—start with one canvas before scaling to 53. Logs are your lifeline.

This quirk turned a simple task into a mini-adventure, but splitting the calls cracked it wide open. Next time you’re wrestling with canvas edits, you’ll know the secret: one change, one request, every time. Got a canvas conundrum of your own? Drop a comment—I’d love to hear how you tackle it!