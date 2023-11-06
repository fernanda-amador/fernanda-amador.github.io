import MainGrid from "./MainGrid";
import { SanitySchema } from "../../sanity.config";
import { sanityClient } from "../sanityClient";
import { useEffect, useState } from "react";
import { Context } from "../Context";
export default function Landing() {

  const [siteInfo, setSiteInfo] = useState<SanitySchema["main-info"] | undefined>(undefined)
  const lang = 'es'
  useEffect(() => {
    sanityClient.fetch<SanitySchema["main-info"]>(`*[_type == 'main-info' && lang == '${lang}'][0]{..., highlighted_projects[]->{..., pictures[0]}}`)
    .then((data) => {
      setSiteInfo(data)
    })
  }, [])

  return (
    <Context.Provider value={siteInfo}>
      <div className="py-4">
        <h1 className="text-6xl text-center py-4" style={{ fontFamily: "AuthenticSignature" }}>{siteInfo?.name}</h1>
        <div className="w-screen h-73vh md:h-5/6-screen px-4 md:px-24 flex justify-center">
          <MainGrid />
        </div>
      </div>
    </Context.Provider>
  );
}
