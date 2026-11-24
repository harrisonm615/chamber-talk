# Chamber talk, February 2027

Michael Harrison + Chris Carpio presenting our custom software framework at Business Connections (Morris County Chamber), then a deep dive at the Chamber the next week.

- **The video:** [`render/Chamber talk - framework explainer.mp4`](render/) (60 s, 1920×1080, music). Core → industry layer → four doors (website, client, team, owner) → custom add-ons → example add-on: Michael's networking calendar.
- **The plan:** [`plan/PLAN.md`](plan/PLAN.md): talk run-of-show, QR sign-up, what happens before the deep dive, the deep dive, follow-up, who does what, open decisions.
- **Notes to each other:** [`handoff/`](handoff/), one file per note.

## Working on the video

It's a [Remotion](https://www.remotion.dev) project. Everything is in `src/`:

- `scenes.tsx`: each scene and its length in bars (`SCENES` at the bottom)
- `stack.tsx`: the framework picture (core, industries, doors, add-ons). Change industry examples or core pieces here.
- `tokens.ts`: colors, fonts, music timing

```
npm install
curl -L -o public/music/mixkit-33.mp3 https://assets.mixkit.co/music/33/33.mp3
npm run studio     # preview and scrub
npm run render     # writes out/framework-raw.mp4
```

The music ("Motivating Mornings", Mixkit free license, see `public/music/LICENSE.md`) is timed so the close lands on the song's last hit. If you change scene lengths, keep the total at 26 bars before the close, or the ending drifts.

## Working together (for both our Claudes)

- Pull before you start, push small commits with plain messages.
- Leave a note in `handoff/` (`YYYY-MM-DD-from-name-topic.md`) when you change something the other person should know about.
- This repo is **public**. No client names without their OK, no prices, no emails, phone numbers, keys or anything from either of our private setups.
