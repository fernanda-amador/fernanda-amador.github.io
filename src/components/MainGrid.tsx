import { useEffect, useRef, useState } from "react";
import { sanityClient } from "../sanityClient"
import builder from "@sanity/image-url";
import { SanitySchema } from "../../sanity.config";
import { ImageUrlBuilder } from "sanity";
import ProjectDetails from "./ProjectDetails";

const imgSrc = (pic: SanitySchema["project"]["pictures"], imageBuilder: ImageUrlBuilder, clientWidth: number, clientHeight: number) => {
  if (!pic || clientHeight === 0 || clientWidth === 0) return ""
  return imageBuilder.image(pic).auto("format").width(clientWidth).height(clientHeight).fit('clip').url()
}



function GridTile(params: { importance: number, project: SanitySchema["project"], imageBuilder: ImageUrlBuilder}) {
  const ref = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)

  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined)

  
  const gridPos = params.importance >= 3
  ? "row-span-3 md:row-span-4 col-span-6 md:col-span-4 bg-primary"
  : params.importance === 2
  ? "row-span-2 md:row-span-2 col-span-3 md:col-span-2 bg-secondary"
  : "row-span-1 md:row-span-1 col-span-3 md:col-span-3 bg-accent"
  
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
      <ProjectDetails projectId={selectedProject} reference={modalRef}/>
      <div
        className="card h-full shadow-xl bg-cover bg-black bg-opacity-40 bg-blend-overlay hover:bg-transparent text-neutral-content hover:text-base-content transition-colors"
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={()=>{modalRef.current?.showModal(); setSelectedProject(params.project._id)}}
      >
        <div className="card-body justify-end">
          <h2 className="text-4xl">{params.project.title}</h2>
          <p className="text-lg grow-0"> {params.project.headline} </p>
        </div>
      </div>
    </div>
  )
}


export default function  MainGrid() {
  const [projects, setProjects] = useState<SanitySchema["project"][]>([]);
  const bl = builder(sanityClient);
  useEffect(() => {
    sanityClient.fetch(`*[_type == "main-info"][0].highlighted_projects[]->{_id, title, headline, pictures[0]}`)
    .then((data) => {
      setProjects(data)
    })
  }, [])

  return (
    <div className="grid grid-rows-7 grid-cols-6 gap-2 min-h-full max-w-screen-2xl flex-grow">
      <GridTile importance={3} project={projects[0]} imageBuilder={bl} />
      <GridTile importance={2} project={projects[1]} imageBuilder={bl} />
      <GridTile importance={2} project={projects[2]} imageBuilder={bl} />
      <GridTile importance={1} project={projects[3]} imageBuilder={bl} />
      <GridTile importance={1} project={projects[4]} imageBuilder={bl} />
    </div>
  );
}


