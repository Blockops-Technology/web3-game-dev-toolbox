import { Inter } from "next/font/google";
import { Container } from "@chakra-ui/react";

import Navigation from "@/components/common/navigation/navigation";

const inter = Inter({ subsets: ['latin'] })
const Layout = ({children}) => (
  <main
    className={`pb-10 ${inter.className}`}
  >
    <Container maxW={1400}>
      <Navigation />
      {children}
    </Container>
  </main>
);

export default Layout;