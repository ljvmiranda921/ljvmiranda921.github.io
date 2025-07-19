---
layout: post
type: post
title: "'Draw me a swordsman': Can tool-calling LLMs draw pixel art?"
date: 2025-07-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [pixel art, aseprite, llm, nlp, tool-calling, mcp]
description: |
  Just a fun weekend experiment on model-context protocol (MCP): I asked several tool-calling LLMs to draw a 4-frame spritesheet of a swordsman performing a slash attack using an Aseprite MCP I built. The results were interesting!
excerpt: |
---

<span class="firstcharacter">R</span>ecently, we've witnessed how language models have become more adept in using real-world tools due to their function-calling cabilities.
Whenever I [develop games](https://ljvmiranda921.itch.io), I use this tool called [**Aseprite**](https://www.aseprite.org/) to create pixel art characters and environments.
Asprite is powerful: I can use it to prepare spritesheets, test color palettes, and sample animations&mdash;it cannot just be replaced by any AI image generator.
I wonder if I can incorporate LLMs into my workflow?

<!--Aseprite screenshot-->

In this blog post, I tested LLMs with tool-calling capabilities on the following tasks:

- **Task 1: Draw a swordsman**: an easy task that generates a static image.

> Draw me a pixel art of a swordsman.

- **Task 2: Draw a swordsman performing a slashing sequence**: a harder task.

> Draw a 4-frame spritesheet showing a swordsman performing a sword slash attack sequence, with each frame capturing a different stage of the slashing motion from windup to follow-through.

The characters in Task 1 and Task 2 don't have to be the same.
Task 2 is interesting because creating sprite sheets is a common use-case in game dev.
I also think it's challenging for LLMs because it requires understanding of sequence: each frame must logically follow the previous one to create a believable animation.
Unlike generating a single image, sprite sheets demand consistency in character design, progression, and timing.
So an LLM should not only call tools correctly, but also reason about animation.
Here's a human baseline from a [game](https://ljvmiranda921.itch.io/abyss) I made a few years ago:

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

I evaluated each LLM's output using two criteria, each scored from 1 to 3:

- **Correctness**: Did the LLM follow the instructions accurately?
- **Creativity**: How original or artistic was the LLM's approach?

**You can find the full code [on GitHub](https://github.com/ljvmiranda921/scratch/tree/master/2025-07-11-aseprite-mcp)**

## The LLM agent testbed

This project is also a way to wrap my head around the development workflow for MCPs and LLM agents.
I like framing this set-up similar to reinforcement learning: we instruct an **Agent** (in this case an LLM) to interact with the **Environment** (standardized via MCP) in order to accomplish a task, as shown in the diagram below:

![](/assets/png/draw-me-a-swordsman/testbed.svg){:width="800px"}  
_In the tool-calling paradigm, we instruct an Agent to interact with the Environment in order to accomplish a task. The Agent can be implemented via the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) or natively in [Claude Desktop](https://modelcontextprotocol.io/quickstart/user), while the Environment is an MCP server that calls Aseprite commands._
{: style="text-align: center;"}

### MCP Server Environment

The **Environment** receives commands from the Agent, executes them, and provides some feedback that the agent can use for its next action.
Recently, Anthropic has released the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) which provides a common interface to expose how any given environment can be interacted upon by the Agent.
I usually think of MCP as a standardized set of affordances for the Agent.

For this project, I used the Aseprite MCP implementation from [divii/aseprite-mcp](https://github.com/diivi/aseprite-mcp) with some slight modifications and bug fixes.
The Aseprite MCP server exposes the following tools:

| Tool Name          | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| **create_canvas**  | Create a new Aseprite canvas with specific dimensions                        |
| **add_layer**      | Add a new layer to an existing Aseprite file with a specified layer name     |
| **add_frame**      | Add a new frame to an existing Aseprite file for animation purposes          |
| **draw_pixels**    | Draw individual pixels on the canvas with coordinates and hex colors         |
| **draw_line**      | Draw a line between two points with customizable color and thickness         |
| **draw_rectangle** | Draw a rectangle with specified position, dimensions, color, and fill        |
| **fill_area**      | Fill an area with color using a paint bucket tool from a starting coordinate |
| **draw_circle**    | Draw a circle with specified center point, radius, color, and optional fill  |
| **export_sprite**  | Export the Aseprite file to other formats like PNG, GIF, JPG, etc.           |
| **preview_image**  | Read and display an image file as base64 data for preview purposes           |

Under the hood, these tools are Lua commands that are sent to the `aseprite` executable.
For example, the `draw_pixels` tool call is simply a series of `img:putPixel` commands for drawing pixels:

```python
@mcp.tool()
async def draw_pixels(filename: Path, pixels: list[dict[str, Any]]) -> str:
    ...
    for pixel in pixels:
      x, y = pixel.get("x", 0), pixel.get("y", 0)
      color = pixel.get("color", "#000000")
      # Convert hex to RGB
      color = color.lstrip("#")
      r, g, b = int(color[0:2], 16), int(color[2:4], 16), int(color[4:6], 16)

      script += f"""
      img:putPixel({x}, {y}, Color({r}, {g}, {b}, 255))
      """

    # Submit the script to Aseprite
    execute_lua_command(script)
    ...
```

Then, the function `execute_lua_command` calls the `aseprite` executable and passes the Lua script to the `--script` argument.
You can find the full implementation of the Aseprite MCP server in [this repository](https://github.com/ljvmiranda921/scratch/tree/master/2025-07-11-aseprite-mcp/aseprite_mcp).

### LLM Agent

The **Agent** has access to tools that interact with the execution environment in order to accomplish a task.
We use language models like GPT-4.1 or Clade Sonnet 4, some of which were trained for tool-use, as agents.
Models with tool-use capabilities can output function calls based on the tools present in their system prompt.
These function calls are then parsed by an intermediary layer such as an MCP server and then passed down to the execution environment.

I used the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) to build the Aseprite agent.
The implementation is quite straightforward: I just need to create an instance of an `Agent` class and let it interact with the execution environment (`mcp_servers=[server]`).
For open-weight models, I host them as an [OpenAI-compatible vLLM server](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html) and pass the server URL to a [LiteLLM proxy](https://docs.litellm.ai/docs/providers/openai_compatible) when instantiating the `Agent` class.

```python
async with mcp_server as server:
    with trace(workflow_name=workflow_name):
      if "model" in openai_models:
        model = model_name
      else:
        # Use Litellm
        model = LitellmModel(
            model="hosted_vllm/" + model_name,
            base_url=agent_url,
            api_key=api_key,
        )

      agent = Agent(
          name="Assistant",
          instructions=system_prompt,
          model=model,
          mcp_servers=[server],
      )

      result = await Runner.run(starting_agent=agent, input=request)
```

When an `Agent` is instantiated, it now contains information about the `model` it is using, its `system_prompt`, and the `mcp_servers` it is connected to.
I had to experiment a bit on what the system prompt looks like, in the end, using the prompt below gave me the most decent results:

```
You are a creative and artistic function-calling agent that can use pixel art
tools to perform a drawing task. You have a good knowledge of color, form, and
movement.  Your output must always be saved as an image file in the PNG format.
If you encounter an error, find a way to resolve it using other available tools.
```

To initiate an interaction between the `Agent` and the MCP server, we simply pass the agent to a `Runner` class with our actual request as `input`.

## Results

#### GPT-4o

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

#### GPT-4.1

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

#### Claude Opus

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

#### Claude Sonnet

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

#### Qwen 3 32B

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

#### Llama-3.1-Instruct 70B

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

## Discussion

## Final thoughts

**Other cool LLM with pixel art tools**

- **Stuff 1**: hi
