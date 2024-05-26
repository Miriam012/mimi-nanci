import { getGroqCompletion } from "@/ai/groq";
import { useEffect, useState } from "react";
import KeyValueTable from "./KeyValueTable";

//function that runs multiple agents in parallel that compete over given resources
export default function Agents({
  world,
  initAgents,
  maxTokens = 1024,
  onUpdate,
}: {
  world: any;
  initAgents: any[];
  maxTokens?: number;
  onUpdate: (agents: string[]) => void;
}) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [agents, setAgents] = useState<any[]>(initAgents);

  const generateAgents = async (context: any) => {
    setGenerating(true);
    try {
      const newAgents = await getGroqCompletion(
        //run all agents in parallel
        JSON.stringify({
          context,
          goal: "Build an offshore aquaculture farm to supply the worlds protein demands by 2050",
        }),
        512,
        `You simulate autonomous agent behaviour within a given world state. 
        A knowledge graph representing the world state together with a high level goal for the agents will be provided by the user. 
        Generate an array of three Agent objects that represent the agents in the world working towards the high level goal.
        Return a JSON object in the format {agents: {name: string, goal:string, currentTask:string, inhibitors:string, resourcesRequired:string}[]}.`,
        true
      );
      console.log(newAgents);
      const agentJSON = JSON.parse(newAgents);
      setAgents(agentJSON.agents);
      onUpdate(agentJSON.agents);
    } catch (e) {
      console.error(e);
      alert("Error generating agents");
    }
    setGenerating(false);
  };

  const runAgents = async () => {
    //don't generate if already running
    if (generating) return;
    if (agents.length === 0) {
      await generateAgents(world);
      return;
    }
    setGenerating(true);
    try {
      const newAgents = await getGroqCompletion(
        //run all agents in parallel
        JSON.stringify({ world, agents }),
        1024,
        `You simulate autonomous agent behaviour within a world state represented by a knowledge graph. 
        The goal and other properties of the agent will be provided by the user. 
        Update the agent to reflect how they act ON the knowledge graph to work towards their goal.
        Return a new JSON object with the updated agents in the format {agents: Agent[]}.`,
        true
      );
      console.log(newAgents);
      const agentJSON = JSON.parse(newAgents);
      setAgents(agentJSON.agents);
      onUpdate(agentJSON.agents);
    } catch (e) {
      console.error(e);
      alert("Error running agents");
    }

    setGenerating(false);
  };

  return (
    <div className="flex flex-col w-full rounded-lg border border-black/25 p-4 ">
      <button
        className="p-2 bg-white rounded-lg my-4 border border-black/25 w-full hover:shadow"
        onClick={() => runAgents()}
      >
        {generating ? "Generating..." : "Run Agents"}
      </button>
      <div className="flex justify-between w-full flex-wrap">
        {agents.map((a, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg bg-white p-2 shadow m-2 w-full"
          >
            <span>
              {generating ? "Generating..." : <KeyValueTable data={a} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
