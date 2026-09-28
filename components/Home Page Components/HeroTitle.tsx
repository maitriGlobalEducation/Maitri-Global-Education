import Button from "./Button";
function HeroTitle() {
  return (
    <>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl flex flex-col items-center justify-center z-10 px-2 mt-10">
        <div className="flex flex-col items-center gap-3">
          <h1
            style={{ fontFamily: "Epika" }}
            className="bg-linear-to-r from-[#d4af37] via-[#f5deb3] to-[#b8860b] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold tracking-wide text-center uppercase drop-shadow-lg"
          >
            Turn Your Study Abroad Dreams into REALITY
          </h1>

          <h2
            style={{ fontFamily: "Epika" }}
            className="w-full max-w-xl sm:text-lg md:text-2xl leading-tight font-semibold text-center bg-linear-to-r from-[#ffefbb] via-[#fddc99] to-[#e0c97d] bg-clip-text text-transparent drop-shadow-md"
          >
            Guiding You to a Global Future since 2009
          </h2>

          <div className="flex flex-row gap-5 mt-2">
            {/* <button className="relative transition-all duration-300 ease-in-out shadow-[0_10px_20px_rgba(0,0,0,0.2)] py-2 px-5 bg-[#3A2E2A] rounded-full flex items-center justify-center cursor-pointer text-white gap-2 font-bold border-[3px] border-white/30 outline-none overflow-hidden text-[15px] hover:scale-105 hover:border-white/60 group">
      View Scholarships
      
       
      <span className="shine"></span>
    </button>
                    <button className="relative transition-all duration-300 ease-in-out shadow-[0_10px_20px_rgba(0,0,0,0.2)] py-2 px-5 bg-[#3A2E2A] rounded-full flex items-center justify-center cursor-pointer text-white gap-2 font-bold border-[3px] border-white/30 outline-none overflow-hidden text-[15px] hover:scale-105 hover:border-white/60 group">
      Check Eligibility
      <span className="shine"></span>
    </button> */}

            <Button text={"View Scholarships"} to="/scholarship" />
            <Button text={"Explore"} to="/explore" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroTitle;
