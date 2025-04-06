---
title: mastering-slack-canvas-automation-a-journey-through-api-quirks
date_created: 2025-04-05 11:23:05
date_modified: 2025-04-06 12:19:52
tags: [informative, analysis, documentation, slack-api-automation, api-quirks, google-apps-script]
favorite: 
id: 01JBTX108VXRC8Z8Y3Q1EABXWD
author:
  name: Josh Peterson
  picture: /assets/blog/authors/2017_profile_pic.jpg
coverImage: https://cdn.midjourney.com/4ae17717-e54f-436d-b1b6-cb3b3bd19ce7/0_0.png
date: 2025-04-06T05:35:07.322Z
excerpt: From chasing ghost endpoints to battling undocumented limits, this journey taught me more about the Slack API than I bargained for.
ogImage:
  url: https://cdn.midjourney.com/4ae17717-e54f-436d-b1b6-cb3b3bd19ce7/0_0.png
---
# Mastering Slack Canvas Automation: A Journey Through API Quirks

Automating Slack canvases sounds straightforward—grab an ID, edit some content, done. But when I set out to clean up 53 canvases by removing a pesky "Reported Issues" section and its accompanying paragraph, I fell into a rabbit hole of API quirks that turned a simple task into a full-blown odyssey. From chasing ghost endpoints to battling undocumented limits, this journey taught me more about the Slack API than I bargained for. Here's my tale of dead ends and triumph, complete with code, quirks, and hard-won lessons.

## The Mission: A Canvas Cleanup

Picture this: 53 Slack channels, each with a canvas containing vehicle inspection notes. My targets? Two sections at the end of each:

- An H2 heading: "Reported Issues."
- A paragraph: "Please detail any issues found during the inspection below:."

The plan was simple—use Google Apps Script and the Slack API to surgically remove these sections. I'd loop through channels, find canvases, identify the sections, and delete them. What could possibly go wrong?

## Dead End: The Mythical `canvases.read`

First, I needed those `section_id`s to delete anything. The `canvases.edit` docs said `"delete"` needs a `section_id`, but how to get it? I assumed there'd be a `canvases.read` endpoint—most APIs pair "get" with "edit," right? Slack's pattern with `conversations.history` or `files.info` suggested a read method to dump the canvas content: markdown, sections, IDs, everything. Plus, I'd spotted `canvas:read` as a scope in the permissions list. So I tried:

```javascript
UrlFetchApp.fetch('https://slack.com/api/canvases.read?canvas_id=F1234567890', {
  headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` }
});
```

The response? `{"ok":false,"error":"unknown_method"}`. My heart sank. Turns out, `canvases.read` isn't real—at least not in the public API as of April 2025. No mention in the docs, and my logs confirmed it's a ghost. That `canvas:read` scope? It exists, but for `canvases.sections.lookup`, not a full-read method. My assumption—born from API conventions and a misleading scope name—led me straight to strike one.

## Pivot: `canvases.sections.lookup` to the Rescue

Without a full canvas reader, I turned to `canvases.sections.lookup`. It promised to find sections by type (e.g., `"h2"`) and text. For the H2, this worked beautifully:

```javascript
const h2LookupOptions = {
  method: 'post',
  headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
  payload: JSON.stringify({
    canvas_id: 'F1234567890',
    criteria: { section_types: ['h2'], contains_text: 'Reported Issues' }
  })
};
const h2Response = UrlFetchApp.fetch('https://slack.com/api/canvases.sections.lookup', h2LookupOptions);
Logger.log(h2Response.getContentText()); // {"ok":true,"sections":[{"id":"temp:C:abc123"}]}
```

Success! The H2 section appeared with a `section_id` like `temp:C:abc123`. But the paragraph? That's where things went sideways.

## Dead End: The `section_types` Puzzle

The docs list "paragraph" as a supported markdown element for canvases, so I figured `section_types: ['paragraph']` would snag "Please detail...":

```javascript
const pLookupOptions = {
  method: 'post',
  headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
  payload: JSON.stringify({
    canvas_id: 'F1234567890',
    criteria: { section_types: ['paragraph'], contains_text: 'Please detail any issues found during the inspection below:' }
  })
};
```

No dice. `{"ok":false,"error":"invalid_arguments","response_metadata":{"messages":["[ERROR] must be a valid enum value"]}}`. I tried `"text"`, `"p"`, even wild guesses—same error. The docs don't list valid `section_types` beyond headers (`"h1"`, `"h2"`, `"any_header"`), leaving me stranded. Was "paragraph" just a mirage?

## Pivot: Dropping `section_types`

Frustrated, I scrapped `section_types` entirely, relying on `contains_text` alone:

```javascript
const pLookupOptions = {
  method: 'post',
  headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
  payload: JSON.stringify({
    canvas_id: 'F1234567890',
    criteria: { contains_text: 'Please detail any issues found during the inspection below:' }
  })
};
const pResponse = UrlFetchApp.fetch('https://slack.com/api/canvases.sections.lookup', pLookupOptions);
Logger.log(pResponse.getContentText()); // {"ok":true,"sections":[{"id":"temp:C:def456"}]}
```

Jackpot! It worked—`temp:C:def456` appeared. Dropping `section_types` let Slack match any section containing the text, bypassing the enum mystery. Lesson learned: sometimes less is more.

## Dead End: The One-Change Limit

With both IDs in hand, I fired off a `canvases.edit` call to delete them together:

```javascript
const editOptions = {
  method: 'post',
  headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
  payload: JSON.stringify({
    canvas_id: 'F1234567890',
    changes: [
      { "operation": "delete", "section_id": "temp:C:abc123" },
      { "operation": "delete", "section_id": "temp:C:def456" }
    ]
  })
};
const editResponse = UrlFetchApp.fetch('https://slack.com/api/canvases.edit', editOptions);
Logger.log(editResponse.getContentText()); // {"ok":false,"error":"invalid_arguments","messages":["[ERROR] no more than 1 items allowed"]}
```

Another brick wall. The API rejected my batch edit with `"no more than 1 items allowed"`. The `changes` array, despite its plural name, has an undocumented limit: one operation per request. My efficiency dreams crumbled again.

## Pivot: One Call, One Change

The fix was splitting the deletes into separate calls:

```javascript
if (h2SectionId) {
  const h2EditOptions = {
    method: 'post',
    headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
    payload: JSON.stringify({
      canvas_id: 'F1234567890',
      changes: [{"operation": "delete", "section_id": h2SectionId}]
    })
  };
  UrlFetchApp.fetch('https://slack.com/api/canvases.edit', h2EditOptions);
  Utilities.sleep(1000); // Rate limit buffer
}

if (pSectionId) {
  const pEditOptions = {
    method: 'post',
    headers: { 'Authorization': `Bearer YOUR_SLACK_TOKEN` },
    payload: JSON.stringify({
      canvas_id: 'F1234567890',
      changes: [{"operation": "delete", "section_id": pSectionId}]
    })
  };
  UrlFetchApp.fetch('https://slack.com/api/canvases.edit', pEditOptions);
}
```

Two requests, two victories. The H2 vanished, then the paragraph, all 53 times. The `Utilities.sleep(1000)` kept me under Slack's rate limit (50+/minute for user tokens), crucial for my scale.

## Victory Lap

After chasing the ghost of `canvases.read`, wrestling with enums, and splitting edits, I had pristine canvases across all channels. Logs glowed with "Successfully removed H2 section" and "Successfully removed paragraph section." It wasn't pretty, but it worked.

## Quirks and Takeaways

- **No `canvases.read`**: Don't assume it exists just because other APIs have "read" methods or scopes hint at it. Use `canvases.sections.lookup` instead.
- **`section_types` Trap**: Stick to headers (`"h1"`, `"h2"`) or skip it entirely. For paragraphs? Just use `contains_text`.
- **One-Change Rule**: Batch edits are a pipe dream. One `changes` item per call, period.
- **Rate Limits**: 53 channels, two edits each—106 requests. Pace yourself with sleeps.

This journey was a crash course in Slack API quirks, sparked by a hopeful misstep with `canvases.read`. Turns out, victory comes from adapting to the API's rules, not the ones you expect. Next time you're scripting Slack, watch for these traps—they're sneaky but beatable. Got your own API adventure? Share it below—I'm all ears.