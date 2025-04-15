import { useRouter } from "next/navigation";
import { useState } from "react";

import { GrCircleQuestion, GrUploadOption } from "react-icons/gr";
export default function GameNavBar() {
  const router = useRouter();
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <>
      <button
        className={`fixed top-5 left-5 bg-indigo-500 opacity-50 p-2 rounded-xl z-[1001] 
                    duration-300 ease-in-out
                    ${isNavVisible ? "translate-y-45" : ""}`}
        onClick={() => setIsNavVisible(!isNavVisible)}
      >
        {isNavVisible ? <GrUploadOption /> : <GrCircleQuestion />}
      </button>
      <button
        className={`fixed top-5 left-20 bg-indigo-500 opacity-50 p-2 rounded-xl z-[1001] 
                    duration-300 ease-in-out`}
        onClick={() => {
          window.scrollBy({ top: 100, behavior: "smooth" });
        }}
      >
        screen
      </button>
      <nav
        className={`flex flex-col items-center opacity-50 p-2 justify-center border
                  border-indigo-500 fixed top-0 left-0 w-full p-4 rounded-xl z-[1000] 
                  transform transition-transform duration-300 ease-in-out
                  ${isNavVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <button
          className="text-white text-center border bg-indigo-500 p-3 m-1 rounded-xl"
          onClick={() => window.location.reload()}
        >
          If the game sounds are overlapping, please press here
        </button>
        <button
          className="text-white text-center border bg-indigo-500 p-3 m-1 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            router.push("/games");
          }}
        >
          View More Games
        </button>
      </nav>
    </>
  );
}
