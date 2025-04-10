import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        className="flex items-center gap-2 p-2 border-1 rounded-xl hover:opacity-50 duration-100"
        href="/games"
      >
        Browse Games
      </Link>
    </div>
  );
}