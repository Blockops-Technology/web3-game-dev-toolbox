import Head from "next/head";
import { useEffect, useState } from "react";
import EmptyState from "@/components/home/emptyState/emptyState";
import ProjectsList from "@/components/home/projectsList/projectsList";
import Layout from "@/components/common/layout/layout";

export default function Home() {
  const metadata = {
    title: "Web3 Game Dev Toolbox",
  };

  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
    const data = await response.json();

    setProjects(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      {
        projects.length > 0 ?
          <ProjectsList projects={projects} /> :
          <EmptyState />
      }
    </Layout>
  )
}
