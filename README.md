# HyperC Usability Testing

English-language desktop prototype for knowledge capture, exploration, and sharing.

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173 and choose **Enter demo desktop**. No build or dependencies are required.

## Test flow

1. Enter the simulated desktop and select apps for capture.
2. Open a selected app (VS Code includes a simple addition exercise).
3. Pause/resume recording, finish capture, and answer two follow-up questions.
4. Explore the knowledge graph, review/edit a case, and upload to the pool.
5. Browse paid knowledge, company subscriptions, versions, comments, and downloaded skills. Authors can download their own work for free.

## Prototype boundaries

Screen capture, voice input, AI replies, payments, subscriptions, and usage are simulated. No microphone or real application capture occurs. Records and downloads metadata are stored locally in the browser; clearing site data resets them. Sample people and company activity are demonstration data. Do not enter real passwords or sensitive information.

## Files

`dist/index.html` loads the current JavaScript, stylesheet, and artwork in `dist/assets`. This snapshot includes the blue spirit companion. Third-party app icons identify simulated desktop applications.

## Hosting

Deploy the `dist` folder to a static web host. Uploading this repository does not itself enable a public website. The original Sites deployment remains separate.

