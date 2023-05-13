import { Button } from "@chakra-ui/react";
import { chainIdToChain } from "@/helpers/chainIdToChain";

const ProjectCard = ({id, chain}) => (
  <div className="bg-zinc-900 p-6 rounded-lg max-w-[400px] border border-zinc-700">
    <p className="text-lg font-bold">{name}</p>
    <p>Project id: {id}</p>
    <p>Chain: {chainIdToChain(chain).name}</p>
    <div className="flex flex-wrap gap-4 mt-5">
      <a href={`/project/${id}`}>
        <Button>View project</Button>
      </a>
      <Button onClick={() => alert("Beyond hackathon scope ;)")} variant="outline">Edit project</Button>
    </div>
  </div>
);

export default ProjectCard;