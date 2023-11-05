export default function NavBar () {
  const navButtonStyle = "hover:bg-base-300 p-4";
  return (
    <div className="flex flex-row fixed z-50 bg-base-200 w-full">
      <a href="#" className="p-4">
        <span className="text-lg font-bold text-accent-content">Logo</span>
      </a>
      <a href="#" className={navButtonStyle}>
        Link1
      </a>
      <a href="#" className={navButtonStyle}>
        Link2
      </a>
      <a href="#" className={navButtonStyle}>
        Link3
      </a>
    </div>
  )
}