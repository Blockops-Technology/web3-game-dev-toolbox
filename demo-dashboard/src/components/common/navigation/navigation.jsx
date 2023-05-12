import Logo from "@/components/common/logo/logo";
import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Navigation = () => (
  <div className="flex items-center justify-between">
    <a href="/">
      <Logo />
    </a>
    <div className="flex items-center gap-10">
      <Link as={NextLink} href="/">Projects</Link>
      <Link as={NextLink} href="/playground">Playground</Link>
      <a href="/create-project">
        <Button size="lg">Create new project</Button>
      </a>
    </div>
  </div>
);

export default Navigation;