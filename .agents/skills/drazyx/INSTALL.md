# Install the Drazyx skill

The distributable source of truth is `skills/drazyx/`. The project also keeps a compatible local copy at `.agents/skills/drazyx/` so OpenCode can discover it when this repository is opened as a project.

## Install from GitHub

Run this in PowerShell:

```powershell
npx skills add guiguix7/Drazyx
```

The CLI will discover the skills in the repository and prompt you to select the `drazyx` skill, the target agent, and the installation scope. Select OpenCode and choose global if you want it available across projects, or project if you only want it in the current repository.

To inspect available skills before installing:

```powershell
npx skills add guiguix7/Drazyx --list
```

For current CLI options, use:

```powershell
npx skills add --help
```

## OpenCode

OpenCode automatically discovers project skills under `.agents/skills/` and global skills under `~/.config/opencode/skills/` (as well as its documented compatibility paths).

If you installed globally, restart OpenCode and invoke the skill explicitly with:

```text
@drazyx
```

The skill may also be discovered automatically for relevant tasks because its frontmatter includes a detailed description.

## Freebuff and other agents

If Freebuff supports the Agent Skills convention, point it to or copy the complete folder `.agents/skills/drazyx/` into the skill directory it scans. Keep the `references/` folder; the main file deliberately loads those documents only when relevant.

If Freebuff uses a separate skill format or directory, follow its own documented adapter rather than assuming OpenCode paths are universal.

## Update

To update skills installed through the Skills CLI:

```powershell
npx skills update
```

To refresh only this skill, if supported by the installed CLI version:

```powershell
npx skills update drazyx
```

## What's included

- Artist identity and visual direction.
- Professional music-video editing and HyperFrames workflow.
- Music production, mix review, and audio QC.
- Strategic marketing, short-form content, campaign measurement, and promotion.
- Release preparation, distribution, and rights checks.

The skill contains instructions and workflows. It does not install HyperFrames, FFmpeg, plugins, fonts, models, or credentials.
