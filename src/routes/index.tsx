import { createFileRoute } from "@tanstack/react-router";
import NodePilotLanding from "@/components/nodepilot/NodePilotLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NodePilot — Edge AI Infrastructure Platform" },
      { name: "description", content: "Deploy, orchestrate, monitor, and optimize AI workloads across distributed edge environments." },
    ],
  }),
  component: () => <NodePilotLanding />,
});
