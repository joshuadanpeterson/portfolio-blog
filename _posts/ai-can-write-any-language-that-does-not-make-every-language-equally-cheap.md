---
title: ai-can-write-any-language-that-does-not-make-every-language-equally-cheap
date_created: 2026-06-03 21:55:00
date_modified: 2026-06-03 21:55:00
tags: [ai, programming, automation, software, workflow-economics]
lane: automation-lab
author:
  name: Josh Peterson
  picture: /assets/blog/authors/2017_profile_pic.jpg
coverImage: /assets/blog/images/ai-language-economics-cover.png
date: 2026-06-03T21:55:00-06:00
excerpt: "AI can write almost any language, but generated code still lives inside package ecosystems, deployment workflows, debugging loops, and future maintenance."
ogImage:
  url: /assets/blog/images/ai-language-economics-cover.png
---
# AI Can Write Any Language. That Does Not Make Every Language Equally Cheap.

AI has made it tempting to think language choice matters less.

If the model can write Python, TypeScript, Go, and Rust, why not always pick the fastest or safest tool? Why not skip the compromise and have the machine generate whatever the ideal language would be if human time were no longer the constraint?

That is the seductive version of the argument. It is also incomplete.

The more I use AI for real local automation, the more I think language choice still matters. Not because the AI cannot write the code. It usually can. The problem is that the code still has to live somewhere. It has to live inside package ecosystems, deployment workflows, debugging loops, maintenance habits, documentation quality, and the next weird little change you need to make six months from now.

AI can write almost any language. That does not make every language equally cheap.

For a lot of local automation, the cheapest language is still Python or JavaScript/TypeScript. Not because they are elegant in some universal sense. Not because they are always the fastest. Not because they are the most correct. They are cheap because they are surrounded by the stuff most automation actually needs.

If you are gluing together Gmail, Google Sheets, Slack, browser automation, AI APIs, CSVs, local files, databases, and a pile of half-structured data, raw language power is rarely the bottleneck. The bottleneck is getting the right library installed, understanding the API shape, authenticating cleanly, iterating quickly, inspecting failures, and letting tomorrow's version of the script be obvious enough that you or an agent can fix it without turning the whole thing into a research project.

That is where Python and JS/TS keep winning.

Python is the default language of data glue. It is the language I reach for when the job involves files, spreadsheets, APIs, AI SDKs, notebooks, analysis, scraping, weird formats, or transforming a messy workflow into something repeatable. It has the right libraries, the right debugging texture, and the right tolerance for scripts that begin as experiments and slowly become infrastructure.

JavaScript and TypeScript are the default when the browser is nearby. Web automation, web apps, Node tooling, frontend code, extension-adjacent work, full-stack workflows: the ecosystem is already there. TypeScript also gives AI-generated code a useful layer of structure. The types are not magic, but they create handles for maintenance. They make it easier for the next agent, or the future version of you, to understand what the code thought it was doing.

This is not a romantic defense of dynamic languages. It is closer to accounting.

When I ask an AI system to build a local script, the actual cost is not just "can it produce syntactically valid code?" The cost is the total loop:

- How quickly can we get to the first working version?
- How much of the problem is already solved by mature libraries?
- How easy is it to inspect an API response or intermediate file?
- How likely is the next agent to recognize the pattern?
- How annoying will authentication, packaging, and deployment be?
- How much future ceremony does this choice create?

On those questions, Python and JS/TS remain hard to beat.

That does not mean they should be the final home for everything.

Some scripts stabilize. They stop being experiments and become tools. They get used often enough that startup time, packaging, reliability, and distribution begin to matter. A little Python script that once lived in a project folder starts wanting to become a real command. A TypeScript helper starts wanting to run as a worker, daemon, or local service. The workflow becomes clear, the inputs and outputs stop changing every day, and the value shifts from iteration speed to operational confidence.

That is when Go starts to make sense.

Go is not usually my first choice for a messy integration experiment. But it is an excellent promotion path. It is good for durable CLIs, small servers, concurrent network tools, daemons, workers, and utilities you want to ship as a single binary. It has a boringness that becomes a virtue once the job is known.

The appeal of Go is not that it makes every script more sophisticated. It is that it can make a stable tool simpler to operate. No fragile virtual environment. No wondering which Python is on the machine. No dependency thicket just to run a command. Build it once, ship the binary, and put the tool where it belongs.

The AI era makes this promotion path more useful, not less.

AI makes it easier to produce the first version of almost anything. But once the first version exists, the code enters a different economy. Now the question is not whether the model can generate Go. The question is whether Go reduces the long-term friction around this particular workflow. Sometimes it does. Especially when the workflow is already well understood and the desired output is a reliable utility rather than an evolving pile of glue.

Rust sits in a different category.

Rust is not just "the faster one." It is the language I would reach for when the boundary itself is sharp: parsers, file formats, native extensions, WASM, performance-sensitive paths, memory safety, correctness-sensitive logic, or places where a subtle bug would be costly enough to justify the extra ceremony.

The key word there is "justify."

AI lowers some of Rust's learning and typing costs, but it does not erase the cognitive cost of maintaining Rust. It does not erase build complexity. It does not erase the need to understand ownership when the code stops compiling, or the need to reason clearly about lifetime and safety boundaries. That cost can be absolutely worth paying. But it is still a cost.

The mistake is treating Rust as the obvious answer because it is fast and safe in the abstract. Most local automation does not fail because Python was too slow. It fails because the script cannot find the right browser profile, the API changed, the OAuth token expired, the CSV had a surprising column, the dependency was installed in the wrong environment, or the person maintaining it forgot why the script existed.

For those problems, Rust is often not the cure. Better workflow design is.

Bash is the opposite edge case. It should stay thin.

Bash is wonderful as a compression layer for commands you already understand. It is good for orchestration: run this, then that, move this file, call this CLI, check this exit code. But once business logic starts creeping in, Bash becomes expensive quickly. Conditionals multiply. Quoting gets weird. Error handling turns fragile. The script becomes readable only to the person who remembers the exact day they wrote it.

So the rule I keep coming back to is simple:

Use Bash to connect commands. Use Python or JS/TS to think. Promote to Go when the script becomes a real tool. Reach for Rust when the boundary is important enough that safety, performance, parsing, or correctness dominate the economics.

This is less about language identity than lifecycle.

A workflow often starts as uncertainty. You do not know the exact shape of the data. You do not know which API endpoint will behave. You do not know whether this is a one-off cleanup or the beginning of a recurring operation. In that phase, iteration speed matters. Library coverage matters. The ability to print the weird object, patch the script, rerun it, and keep going matters.

That is the Python and JS/TS phase.

Then the workflow becomes legible. The same action repeats. The inputs settle. The expected output is known. The script starts to become a dependency of your own work. At that point, the important question changes. You are no longer asking, "What language gets me unstuck fastest?" You are asking, "What language makes this tool easiest to trust, move, run, and maintain?"

That may be Go.

And sometimes the workflow reveals that the true problem is not ordinary automation at all. It is a performance boundary, a parser, a native module, a security-sensitive edge, a correctness problem, or a format where sloppiness will hurt. Then the economics change again.

That may be Rust.

The interesting thing about AI is that it makes this promotion ladder more usable. Before, rewriting a script from Python into Go might have felt like a chore with unclear payoff. Now the rewrite itself is cheaper. The decision can be more strategic. You can prototype where the ecosystem is richest, then promote only after the workflow earns it.

That is the part I think people miss when they say AI makes language choice obsolete.

AI does not eliminate language choice. It changes what language choice is for.

The old argument often sounded like a contest among languages: which one is fastest, safest, most expressive, most popular, most elegant. The newer argument is more operational. Which language minimizes total friction at this stage of the workflow? Which one has the libraries this task actually needs? Which one will be easiest for the next AI pass to inspect? Which one will be least annoying to run on a different machine? Which one fails in ways I can understand at 11 p.m.?

That is not as clean as a benchmark. But it is closer to the real world.

Generated code still lives in ecosystems. It still inherits package managers, documentation, APIs, build tools, deployment surfaces, and maintenance culture. A model can write you a Rust program, but it cannot make the Rust ecosystem have the same Google Sheets glue as Python. It can write Go, but it cannot make every exploratory data problem want to be a compiled binary. It can write TypeScript, but it cannot make Node dependency management disappear. It can write Python, but it cannot make Python packaging emotionally normal.

Every language carries a surrounding world.

The practical question is not "What can AI write?" The practical question is "What should this code become?"

If it is still exploration, pick the language with the best integration loop.

If it is becoming infrastructure, ask whether it wants a more durable form.

If it sits on a sharp boundary, pay for the language that makes that boundary safer.

That is a quieter view of programming languages than the old flame wars, but I think it is more useful. AI has made code generation feel abundant. The scarce thing is not code. The scarce thing is reliable workflow.

And reliable workflow is where language choice still earns its keep.
