# Install the Drazyx skill

This folder follows the Agent Skills format. The skill is designed for agents that support `SKILL.md`, including OpenCode and Codex-compatible workflows.

## Install with the Skills CLI

Install globally for OpenCode:

```powershell
npx skills add guiguix7/Drazyx --skill drazyx --agent opencode --global --yes
```

Install globally for Codex:

```powershell
npx skills add guiguix7/Drazyx --skill drazyx --agent codex --global --yes
```

To list the skills found in the repository before installing:

```powershell
npx skills add guiguix7/Drazyx --list
```

To confirm installation:

```powershell
npx skills list --global
```

## Use the skill

In OpenCode, invoke it explicitly with:

```text
@drazyx
```

Or describe a Drazyx task clearly; the skill's description is designed to let the agent discover it when relevant.

## Freebuff and other compatible agents

If Freebuff supports OpenCode's skill discovery or the Agent Skills convention, the CLI installation may work directly. If it does not appear, use the shared compatibility path:

```text
.agents/skills/drazyx/SKILL.md
```

Copy the entire `drazyx` folder—including `references/`—into the project's `.agents/skills/` directory, or into the global skills directory documented by that agent. Do not copy only `SKILL.md`, because the detailed workflows live in the reference files.

Restart the agent if it does not refresh skill discovery automatically.

## Keep it current

After changes are pushed to GitHub:

```powershell
npx skills update drazyx --global --yes
```

The skill gives creative and operational guidance. It does not install HyperFrames, FFmpeg, plugins, fonts, models, or API credentials. Install those tools separately only when the current project needs them.
