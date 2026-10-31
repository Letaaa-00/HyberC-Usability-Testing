# HyperC Usability Testing — 2.0

[Open the prototype](https://letaaa-00.github.io/HyberC-Usability-Testing/?v=2.0) · [Version 2.0 source](https://github.com/Letaaa-00/HyberC-Usability-Testing/tree/v2.0)

English-language desktop prototype for knowledge capture, exploration, and team sharing.

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173 and select **Enter demo desktop**. No build or dependencies are required.

## Version 2.0 test flow

1. Select applications and simulated screen/file permissions, including all or selected project folders.
2. Open VS Code and complete the addition exercise. The companion tracks ticket progress and shows stage-summary notifications.
3. Close and reopen the app: ticket progress remains on this browser. Open the list icon to view saved summaries; Cancel dismisses a notification while preserving the unread dot.
4. Review the daily knowledge list and batch-share selected notes. Accuracy status is separate from sharing; unconfirmed content remains labeled as a draft.
5. Explore knowledge categories, expand cases, and open the three-column source/code/context view with ticket context.
6. Try full-window Chat and the Pool scopes: My team, Collaborating teams, and Company. Explore subscriptions, version history, comments, and downloads.

## Prototype boundaries

Screen capture, file permissions, voice input, AI replies, payments, subscriptions, and usage are simulated. No real screen, microphone, or project-file access occurs. Sample experts, teams, and tickets are fictional. Data stays in this browser; teammates start with sample data, not your local history. Clear site data or use a fresh browser profile for a fresh test.

The daily reminder is checked while the page is open, after 17:00 in the browser’s local time. Stage completion also shows a list notification. It is not an operating-system background notification service.

All five graph cases currently share the refund code-detail demonstration; ticket context varies. The desktop exercise uses a separate addition-function demo ticket.

## Publishing and versions

`dist` contains the runnable prototype. `docs` mirrors it for GitHub Pages. Version **v2.0** marks this snapshot; see [CHANGELOG.md](CHANGELOG.md). The separate original Sites deployment is not updated by this repository.
