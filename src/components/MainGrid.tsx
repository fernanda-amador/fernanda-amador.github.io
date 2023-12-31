import { useContext, useEffect, useRef, useState } from "react";
import { sanityClient } from "../sanityClient"
import builder from "@sanity/image-url";
import { SanitySchema } from "../../sanity.config";
import { ImageUrlBuilder } from "sanity";
import ProjectDetails from "./ProjectDetails";
import { Context } from "../Context";
import AllProjects from "./AllProjects";

const imgSrc = (pic: SanitySchema["project"]["pictures"], imageBuilder: ImageUrlBuilder, clientWidth: number, clientHeight: number) => {
  if (!pic || clientHeight === 0 || clientWidth === 0) return ""
  return imageBuilder.image(pic).auto("format").width(clientWidth).height(clientHeight).fit('clip').url()
}

function GridTile(params: {
  importance: number,
  project: SanitySchema["project"],
  imageBuilder: ImageUrlBuilder,
  openModalWithProject: (projectId: string) => void,
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const gridPos = params.importance >= 3
  ? "row-span-3 md:row-span-4 col-span-12 md:col-span-8 bg-primary"
  : params.importance === 2
  ? "row-span-2 md:row-span-2 col-span-6 md:col-span-4 bg-secondary"
  : "row-span-1 md:row-span-1 col-span-6 md:col-span-5 bg-accent"
  
  const [imgUrl, setImgUrl] = useState<string>("")
  
  useEffect(() => {
    if (!ref.current) return
    const clientWidth = ref.current.clientWidth || 50
    const clientHeight = ref.current.clientHeight || 50
    const src = imgSrc(params.project?.pictures, params.imageBuilder, clientWidth, clientHeight)
    setImgUrl(src)
  }, [params.project, params.imageBuilder])
  
  if (!params.project) return <div></div>
  return (
    <div ref={ref} className={"card " + gridPos}>
      <div
        className="card cursor-pointer h-full shadow-xl bg-cover bg-black bg-opacity-40 bg-blend-overlay hover:bg-transparent text-neutral-content hover:text-base-content transition-colors"
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={()=>{params.openModalWithProject(params.project._id)}}
      >
        <div className="card-body justify-end -space-y-2 md:-space-y-0 p-4 md:p-8">
          <h2 className="text-xl md:text-4xl">{params.project.title}</h2>
          <p className="text-sm md:text-lg grow-0"> {params.project.headline} </p>
        </div>
      </div>
    </div>
  )
}


export default function  MainGrid() {
  const bl = builder(sanityClient);
  
  const projects = (useContext(Context)?.highlighted_projects || []) as unknown as SanitySchema["project"][]
  const projectModalRef = useRef<HTMLDialogElement>(null)
  const allProjectsModalRef = useRef<HTMLDialogElement>(null)
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined)
  const [loadAllProjects, setLoadAllProjects] = useState<boolean>(false)

  const openModalWithProject = (projectId: string) => {
    setSelectedProject(projectId);
    projectModalRef.current?.showModal();
  }

  return (
    <>
      <ProjectDetails projectId={selectedProject} reference={projectModalRef}/>
      <AllProjects load={loadAllProjects} reference={allProjectsModalRef} openModalWithProject={openModalWithProject} />
      <div className="grid grid-rows-6 md:grid-rows-none grid-cols-12 gap-2 min-h-full max-w-screen-2xl flex-grow">
        <GridTile importance={3} project={projects[0]} imageBuilder={bl} openModalWithProject={openModalWithProject} />
        <GridTile importance={2} project={projects[1]} imageBuilder={bl} openModalWithProject={openModalWithProject} />
        <GridTile importance={2} project={projects[2]} imageBuilder={bl} openModalWithProject={openModalWithProject} />
        <GridTile importance={1} project={projects[3]} imageBuilder={bl} openModalWithProject={openModalWithProject} />
        <GridTile importance={1} project={projects[4]} imageBuilder={bl} openModalWithProject={openModalWithProject} />
        <div className="card shadow-xl select-none cursor-pointer bg-cover text-neutral-content transition-colors row-span-1 col-span-12 md:col-span-2 bg-primary hover:bg-primary-focus" onClick={() => {setLoadAllProjects(true); allProjectsModalRef.current?.showModal()}}>
          <div className="card-body justify-center p-1">
            <span className="
              text-4xl
              md:text-7xl
              text-center
              font-mono
              inline-block
              align-middle
            ">+</span>
          </div>
        </div>
      </div>
    </>
  );
}


