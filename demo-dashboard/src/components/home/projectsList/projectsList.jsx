import ProjectCard from "@/components/common/projectCard/projectCard";

const ProjectsList = ({projects}) => (
  <div className="mt-40">
    <p>Projects:</p>
    <div className="mt-10 grid  xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {
        projects.map((project, i) => (
          <ProjectCard key={i} id={project.id} name={project.name} chain={project.chain} />
        ))
      }
    </div>
  </div>
);

export default ProjectsList;