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
Here's the human baseline (or my attempt) from the game [_Abyss_](https://ljvmiranda921.itch.io/abyss):

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

I evaluated each LLM's output using two criteria, each scored from 1 to 3:

- **Correctness**: Did the LLM follow the instructions accurately?
- **Creativity**: How original or artistic was the LLM's approach?

## The LLM agent testbed

This project is also a way to wrap my head around the development workflow for MCPs and LLM agents.
I like framing this set-up similar to reinforcement learning: we instruct an **Agent** (in this case an LLM) to interact with the **Environment** (standardized via MCP) in order to accomplish a task, as shown in the diagram below:

![](/assets/png/draw-me-a-swordsman/testbed.svg){:width="800px"}  
_In the tool-calling paradigm, we instruct an Agent to interact with the Environment in order to accomplish a task. The Agent can be implemented via the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) or natively in [Claude Desktop](https://modelcontextprotocol.io/quickstart/user), while the Environment is an MCP server that calls Aseprite commands._
{: style="text-align: center;"}

### MCP Server Environment


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

When an `Agent` is instantiated, it now contains information on what model it's using (`model`), its `system_prompt`, and the `mcp_servers` it is connected to. 
To initiate an interaction between the `Agent` and the MCP server, we simply pass the agent to a `Runner` class with our actual request as `input` (i.e., "Draw me a swordsman...").

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


#### Llama-3.1-Instruct 70B

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

#### Qwen 2.5 Instruct 72B

| Task 1: Draw me a swordsman | Task 2: Draw a 4-frame spritesheet of a sword slash attack |
| --------------------------- | ---------------------------------------------------------- |
| ![Task 1 Image](#)          | ![Task 2 Image](#)                                         |

## Discussion

## Final thoughts

**Other cool LLM with pixel art tools**

- **Stuff 1**: hi
