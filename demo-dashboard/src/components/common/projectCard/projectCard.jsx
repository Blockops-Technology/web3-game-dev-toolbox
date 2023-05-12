import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { chainIdToChain } from "@/helpers/chainIdToChain";

const ProjectCard = ({id, chain}) => (
  <div className="bg-zinc-900 p-6 rounded-lg max-w-[400px] border border-zinc-700">
    <p className="text-lg font-bold">{name}</p>
    <p>Project id: {id}</p>
    <p>Chain: {chainIdToChain(chain).name}</p>
    <div className="flex gap-4">
      <Link as={NextLink} href={`/project/${id}`}>
        <Button className="mt-5">View project</Button>
      </Link>
      <Button onClick={() => alert("Beyond hackathon scope ;)")} variant="outline" className="mt-5">Edit project</Button>
    </div>
  </div>
);

export default ProjectCard;