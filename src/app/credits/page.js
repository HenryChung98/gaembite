"use client";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const SectionComponent = ({ title, des }) => {
  return (
    <>
      <div className="flex">
        <span className="w-40 font-bold text-sm text-gray-200">{title}:</span>
        <span className="text-gray-200 text-sm font-bold">{des}</span>
      </div>
    </>
  );
};

export default function Credits() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-zinc-700 rounded-2xl shadow-md text-base text-gray-800">
      <div className="flex justify-between">
        <h2 className="text-2xl font-extrabold text-indigo-400 mb-4">
          Game Credits
        </h2>
        <button
        className="bg-indigo-400 text-gray-200 rounded-xl p-1 relative "
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          <IoArrowBackCircleOutline size={35} />
        </button>
      </div>
      <div className="flex">
        <span className="w-40 font-bold text-sm text-gray-200">Developer:</span>
        <span>
          <a
            href="https://henry-chung-portfolio.netlify.app/"
            className="text-blue-300 text-sm hover:underline font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Henry Chung
          </a>
        </span>
      </div>
      <SectionComponent title="Engine Used" des="Unity Engine" />
      <SectionComponent title="Icons" des="Icons8" />
      <SectionComponent title="Sprites" des="Figma" />
      <SectionComponent title="Sound Resources" des="Pixabay" />
    </div>
  );
}
