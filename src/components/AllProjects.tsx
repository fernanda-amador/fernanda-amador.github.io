import { useContext, useEffect, useState } from "react"
import { SanitySchema } from "../../sanity.config"
import { sanityClient } from "../sanityClient"
import builder from "@sanity/image-url"
import { Context } from "../Context"

export default function AllProjects(params: { load: boolean, reference: React.RefObject<HTMLDialogElement>, openModalWithProject: (projectId: string) => void }) {

  const [projects, setProjects] = useState<SanitySchema["project"][]>([])
  const imageBuilder = builder(sanityClient)
  const title =  useContext(Context)?.all_projects_title || 'All projects'

  useEffect(() => {
    if (!params.load) return
    sanityClient.fetch("*[_type == 'project']{..., pictures[0]}")
    .then((data) => {
      setProjects(data)
    })
    .catch((e) => {
      console.error(e)
      setProjects([])
    })
  }, [params.load])


  const content = projects.length === 0
    ? ( <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div> )
    : (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(projects).map((pr) => {
            const src = pr.pictures ? imageBuilder.image(pr.pictures).auto("format").width(400).height(100).fit('clip').url() : ''
            return (
              <div key={pr._id} className="card bg-accent">
                <div
                  className="card cursor-pointer h-full shadow-xl bg-cover bg-black bg-opacity-40 bg-blend-overlay hover:bg-transparent text-neutral-content hover:text-base-content transition-colors"
                  style={{ backgroundImage: `url(${src})` }}
                  onClick={()=>{params.openModalWithProject(pr._id)}}
                >
                  <div className="card-body justify-end -space-y-2 md:-space-y-0 px-4">
                    <h2 className="text-md md:text-4xl">{pr.title}</h2>
                  </div>
                </div>
              </div>
            )
          })}
        </div>


        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </>
    )

  return (
      <dialog ref={params.reference} className="modal">
          <div className="modal-box w-full md:w-11/12 max-w-screen-xl">
            <h3 className="text-5xl text-center pb-4" style={{ fontFamily: "AuthenticSignature" }}>{title}</h3>
            {content}
          </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  )
}