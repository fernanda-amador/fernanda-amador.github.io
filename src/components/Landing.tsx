import MainGrid from "./MainGrid";
export default function Landing() {
  return (
    <div className="py-4">
      <h1 className="text-6xl text-center py-4" style={{ fontFamily: "Authentic Signature" }}>Fernanda Amador</h1>

      <div className="w-screen h-10/12-screen px-4 md:px-24 flex justify-center">
        <MainGrid />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        hello
      </div>
    </div>
  );
}
