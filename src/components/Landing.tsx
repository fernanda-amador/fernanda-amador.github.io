import MainGrid from "./MainGrid";
export default function Landing() {
  return (
    <div className="py-4">
      <h1 className="text-6xl text-center py-4" style={{ fontFamily: "AuthenticSignature" }}>Fernanda Amador</h1>

      <div className="w-screen h-73vh md:h-5/6-screen px-4 md:px-24 flex justify-center">
        <MainGrid />
      </div>
    </div>
  );
}
