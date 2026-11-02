# HyperC Usability Testing — Version 4

[Open the prototype](https://letaaa-00.github.io/HyberC-Usability-Testing/) · [Project source](https://github.com/Letaaa-00/HyberC-Usability-Testing)

Based on [Letaaa-00’s version 2.0](https://github.com/Letaaa-00/HyberC-Usability-Testing/tree/v2.0), with subsequent UI/UX revisions in this repository.

English-language desktop prototype for knowledge capture, exploration, and team sharing.

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173 and select **Enter Demo**. No build or dependencies are required.

Check that port 4173 is unused before starting the server. If another project is listening there, use a different unused port. This server is temporary, with no background service or automatic restart.

## Version 4

- Refine setup with balanced feature tiles and return to the desktop after setup.
- Restore compact ticket progress and contextual follow-up questions below the agent.
- Save text or simulated voice answers locally; show an unread review-list reminder without opening the workspace automatically.
- Remove redundant recording buttons from the agent and Dashboard.
- Rename the knowledge market to Knowledge Library and improve map guidance and the agent composer.
- Link Review sources and map details to the three-column source/code/knowledge view.
- Add contextual Back to My Map / Back to Dashboard navigation.

## Earlier UI/UX revision (historical)

- The desktop **Knowledge Capture** icon opens **Dashboard**, the first destination in the shared sidebar. The former `#review` URL remains compatible; new navigation uses `#dashboard`.
- Setup completes with **Your workspace is ready → Go to dashboard**. Settings can also close back to the current workspace page.
- Dashboard shows today's dated notes, confirmations, and uploads. The review table is collapsed by default, with **Today** and **All pending notes** filters. Undated sample records are not counted as today's captures.
- **Start Recording** opens the desktop demo and an approved app. The agent keeps **Start Recording / End Recording** visible below its collapsible navigation. Ending a session saves a timestamped draft; another recording can start immediately. The five-step progress widget has been removed.
- **Knowledge** is now **My Map**. Task nodes expose **View details →**; **Edit** and **Upload to Market** sit at the top right. Edit offers add-subfolder, rename, and delete on hover or keyboard focus. Structure changes persist locally. Deleting a node preserves its children and offers Undo.
- **Upload to Market** opens the pending-record selection in Dashboard, followed by a team and content preview. **View Knowledge Market** opens the market directly. All visible Pool names now read **Knowledge Market**.
- Non-refund map tasks show their own fictional task requirements. The refund task retains the source/code/context demonstration. Map structure edits do not alter a task's knowledge content.
- **Add Note** combines text and simulated voice input. Saved notes appear as cards with a green check and remain editable. Chat retains its separate conversation interface.
- Nonessential introductory copy is removed. Opaque tooltips support pointer hover and keyboard focus; setup and node dialogs trap focus.

All workspace sections share one window size, surface color, title bar, and rounded frame. Expanded-window state is shared across navigation, including Chat.

## Local test flow

1. Open Knowledge Capture, then Settings. Confirm selected demo apps and choose **Go to dashboard**.
2. Expand/collapse the notes table and switch its date filter. Start Recording, hide the agent navigation, and verify End Recording remains visible. End the session and repeat.
3. Open Dashboard from the agent's first navigation icon and review today's new records.
4. Open My Map, expand Debugging & incidents, and enter a task using its details arrow. Return and use Edit to add a child, rename it, refresh, delete it, and Undo.
5. Use Upload to Market, select a record, inspect the upload preview, and upload into the local demo market. Open View Knowledge Market to verify the result.
6. Check Chat, Downloads, Settings, Add Note, and keyboard tooltips. `dist` and `docs` must remain identical.

Validation: JavaScript syntax checks and browser walkthroughs cover setup completion, both Dashboard routes, date filtering, repeated recording, collapsed agent controls, task details, persisted structural edits and Undo, local market upload, and shared navigation.

## Prototype boundaries

Screen capture, file permissions, voice input, AI replies, payments, subscriptions, and usage are simulated. No real screen, microphone, or project-file access occurs. Sample experts, teams, and tickets are fictional. Notes, map structure, and demo market uploads stay in this browser. A fresh browser profile starts with sample data. The desktop exercise uses an addition-function demo, separate from the fictional map tasks.

## Publishing and versions

`dist` contains the runnable prototype. `docs` mirrors it for GitHub Pages. Pages publishes automatically from the `main` branch’s `/docs` folder. When editing, keep both directories synchronized and commit/push the changes to update the live site.

The original **v2.0** snapshot is the upstream baseline; see [CHANGELOG.md](CHANGELOG.md). The original author’s deployments are separate from this repository.
