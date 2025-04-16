import Link from "next/link";
import Image from "next/image";
import { GrDown, GrUp } from "react-icons/gr";

export default function NavBar() {
  return (
    <nav
      className={`fixed flex gap-2 top-0 left-0 opacity-70 p-1 z-[1001] 
        duration-300 ease-in-out`}
    >
      <Link href={`/`}>
        <Image
          src="/images/gaembitebg-web.webp"
          alt="gaembite-icon"
          width={50}
          height={50}
          className="object-contain rounded"
        />
      </Link>
    </nav>
  );
}
