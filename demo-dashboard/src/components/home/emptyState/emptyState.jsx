import { Button } from "@chakra-ui/react";

const EmptyState = () => (
  <div className="bg-zinc-900 mt-40 p-12 rounded-2xl max-w-[530px] m-auto">
    <p className="pb-4">It looks empty here and like no one started a project yet. Be first!</p>
    <a href="/create-project">
      <Button>Create a new project</Button>
    </a>
  </div>
);

export default EmptyState;