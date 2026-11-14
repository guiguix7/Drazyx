# Professional Music Video Post-Production

Use this reference for music-led short-form edits, release videos, motion design, visualizers, and HyperFrames compositions.

## Editorial objective

The purpose of a music promo is to make the viewer **feel a reason to keep listening**. The viewer should remember the music or artist—not the editor's effect stack.

Every edit should answer:
1. What musical or emotional moment is the hero?
2. What does the first second make the viewer curious about?
3. What changes visually as the music develops?
4. What payoff does the viewer receive?
5. What single action should they take next, if any?

## Before editing

1. Confirm the exact source media, soundtrack/master, project files, requested output count, and destination platform.
2. Inspect the entire relevant source, not just an arbitrary short excerpt. Record resolution, frame rate, duration, audio sample rate, channel layout, and codec where tools allow.
3. Listen to the track. Mark candidate hooks and transitions with exact timestamps. Use waveform and beat/onset analysis as support.
4. Inspect footage for the useful material: real screen activity, performance, studio details, gestures, cursor movement, arrangement changes, and other moments that can carry the edit.
5. Read the existing composition before replacing it. Preserve useful work and edit in place when safe.

## Musical editing

- Cut to musical intent: phrasing, motif changes, melodic resolution, bass movement, kick/snare accents, fills, pauses, and transitions.
- Do not quantize every visual event to every beat. Slowed, ambient, melancholic, and spacious music often needs longer holds and subtle motion.
- Use BPM as a timing aid, not as a complete map of emotional structure.
- Protect the important opening and ending of a selected clip. Avoid starting mid-transient unless it is an intentional hook.
- Avoid abrupt musical cuts. Use a natural phrase ending, reverb tail, delay tail, or deliberate fade where the source allows.
- Do not change pitch, speed, stereo width, or mastering of the music unless asked.

## Visual direction

Use a clear hierarchy: **music/source footage → focal detail → atmosphere → typography/CTA**.

Possible tools, chosen with restraint:
- crop, reframing, slow push/pull, parallax, and controlled angle variation;
- subtle light sweeps, glints, grain, vignette, depth, blur, and contrast;
- small rhythmic pulses or transitions tied to meaningful musical events;
- typography as a title, lyric, thought, or metadata—not permanent decoration;
- a brief end card when the task calls for a release conversion.

The effect must have a stated purpose: direct attention, reveal a detail, create depth, reinforce a transient, establish a transition, or support the emotion. If it has no purpose, remove it.

### For FL Studio / DAW footage

- Keep the actual DAW session recognizable and central when it is the main source.
- Show the relevant musical action: arrangement, piano roll, mixer, automation, plugin, or timeline—do not crop randomly.
- Use reframing and selective focus to guide attention while keeping enough context for the viewer to understand what they are seeing.
- Avoid turning every shot into a generic purple grid, fake hologram, or unrelated cinematic scene.
- Do not cover the musical detail with oversized text, decorative waveforms, or excessive overlays.
- Keep cursor movement and screen activity purposeful. If the source footage is static, create restrained motion through framing, not invented events.

## Three-part content series

When a user requests multiple videos from one release, assign each a distinct job. A useful structure is:
- **Emotional entry:** a relatable feeling, atmosphere, or lyric/melodic moment.
- **Musical proof:** the strongest production detail, beat switch, melody, bass, or arrangement moment.
- **Artist/release discovery:** connect the music to Drazyx and the release, ending with correct metadata and one CTA.

These are roles, not mandatory templates. Choose them only when they fit the song and footage. Do not force all three to use the same transitions, typography, pacing, or visual structure.

## Timing and text

- The opening frame should communicate a focal idea quickly. Do not use a long logo intro.
- Vary shot duration intentionally. Let emotionally important musical moments breathe.
- Keep on-screen text short and readable on a phone.
- Place text inside platform-safe areas; verify current placement guidance for the destination platform when exact safe zones matter.
- Use a single CTA. Examples include "LISTEN", "FULL TRACK", or a direct platform action, but only when the linked destination is real and available.
- An end card must contain only verified artwork, track title, artist, release/album name, and CTA. Never invent release metadata.

## HyperFrames workflow

HyperFrames is a rendering and composition tool, not a substitute for editorial judgment.

1. Check the installed CLI and available commands with its help output and environment diagnostics.
2. Read the installed HyperFrames/GSAP skills and relevant documentation before writing unfamiliar composition syntax.
3. Inspect project compositions, asset paths, duration, and configuration before editing.
4. Prefer the existing composition and assets when the user requests improvements to an existing edit.
5. Preview and lint compositions before rendering when the installed version supports those commands.
6. Render the complete requested deliverables. Capture snapshots or inspect representative frames at the opening, major transitions, peak, and ending.
7. Inspect the exported media itself for duration, dimensions, frame rate, codec, audio, and synchronization.
8. Keep generated compositions and media assets inside the project structure. Avoid scattering temporary test files.

Do not invent HyperFrames commands, component names, data attributes, or undocumented APIs. Check the installed version's documentation and `--help`. HyperFrames CLI documentation currently describes commands including `doctor`, `preview`, `lint`, `snapshot`, `render`, `compositions`, `catalog`, and `skills`; availability and flags can change between versions.

## Batch execution rule

For a request containing multiple edits:
1. map the source and intended musical segment for each output;
2. create a short direction for each one;
3. produce a complete first pass for all outputs;
4. render all requested outputs;
5. perform one focused QC pass across the batch;
6. fix only meaningful defects and render final versions.

Do not spend most of the budget polishing one tiny proof clip while the requested videos remain untouched. Do not present a proof clip as completion.

## Export and quality control

Default only when the user has not specified otherwise and the destination supports it:
- vertical social: 9:16, 1080 × 1920;
- frame rate: 30 fps, unless the source or platform brief calls for a different rate;
- video: H.264 MP4 for broad compatibility;
- audio: AAC, 48 kHz where supported.

Check the actual destination's latest specifications before final export when requirements are important. Avoid unnecessary upscaling or frame-rate conversion that degrades the source.

### Visual QC
- no black frames, frozen frames, accidental blank layers, or missing assets;
- no clipped text, illegible typography, or platform UI collisions;
- consistent crop and safe margins;
- no unintended jitter, flicker, banding, aliasing, or broken alpha edges;
- transitions and motion feel smooth and deliberate;
- the final frame and end card remain long enough to read.

### Audio QC
- no clipping, crackle, codec artifacts, muted sections, or unintended level jumps;
- no missing stereo channel or accidental mono conversion;
- no abrupt cuts, clicks, or missing reverb/delay tails;
- music and visual events stay synchronized;
- exported audio is checked, not assumed to be correct because the source sounded correct.

### Delivery
Deliver every requested final render, plus editable composition/project files and a brief QC note. State exact filenames, resolution, frame rate, codec, duration, and any limitation that was not verified.
