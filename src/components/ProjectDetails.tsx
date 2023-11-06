import { useCallback, useContext, useEffect, useState } from "react"
import { SanitySchema } from "../../sanity.config"
import { sanityClient } from "../sanityClient"
import builder from "@sanity/image-url"
import { Context } from "../Context"

export default function ProjectDetails(params: { projectId: string | undefined, reference: React.RefObject<HTMLDialogElement> }) {

  const [project, setProject] = useState<SanitySchema["project"] | undefined>(undefined)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const imageBuilder = builder(sanityClient)

  useEffect(() => {
    if (!params.projectId || params.projectId === '') {
      setProject(undefined)
      return
    }
    sanityClient.fetch(`*[_id == "${params.projectId}"]`)
    .then((data) => {
      setProject(data[0])
    })
    .catch((e) => {
      console.error(e)
      setProject(undefined)
    })
  }, [params.projectId])

  const context = useContext(Context);


  const formatDate = useCallback((date: string | undefined) => {
    if (date === undefined) return context?.proyect_date_present || 'now'
    const d = new Date(date)
    const month = d.toLocaleString(context?.lang || 'default', { month: 'short' })
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${d.getFullYear()}`
  }, [context?.lang, context?.proyect_date_present])

  const content = project === undefined
    ? ( <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div> )
    : (
      <>
        <div className="flex flex-col items-baseline">
          <h3 className="font-bold text-5xl">{project.title}</h3>
          {project.dates && <p className="text-base">{formatDate(project.dates.start)} - {formatDate(project.dates.end)}</p>}
        </div>
        <p className="py-4 text-base whitespace-pre-wrap">{project.description}</p>

        <div className="grid grid-cols-6 md:grid-cols-10 grid-rows-4 gap-2">
          <img className="rounded-2xl col-span-6 row-span-full" src={imageBuilder.image(project?.pictures?.[selectedImage] || '').auto("format").width(750).height(500).fit('clip').quality(100).url()} />
          {(project.pictures || []).map((pic, i) => {
            const src = imageBuilder.image(pic).auto("format").width(150).height(150).fit('clip').url()
            return (
              <img key={pic._key} className={`hover:brightness-75 cursor-pointer col-span-1 row-span-1 rounded-2xl border-primary-focus ${i===selectedImage?'border-4 brightness-75':''}`} src={src} alt="" onClick={() => setSelectedImage(i)} />
            )
          })}
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setProject(undefined)}>✕</button>
          </form>
        </div>
      </>
    )

  return (
      <dialog ref={params.reference} className="modal">
          <div className="modal-box w-full md:w-11/12 max-w-screen-xl">
            {content}
          </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setProject(undefined)}>close</button>
        </form>
      </dialog>
  )
}