import Link from "next/link";
import Image from "next/image";

export default function NotFound({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src="/images/gaembite-404-web.webp"
        alt="404"
        // fill
        width={500}
        height={500}
        className="object-contain rounded"
      />
      {/* <h1 className="text-3xl font-bold mb-4 text-[#FC6317]">Page Not Found</h1> */}

      <p className="text-md text-gray-200 mb-3">
        The {message ? message : "page"} you are looking for does not
        exist.
      </p>
      <p className="text-md text-gray-200 mb-8">
        It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="bg-zinc-700 text-gray-200 p-3 border-1 rounded-xl uppercase font-bold hover:opacity-50 duration-100"
      >
        go to home
      </Link>
    </div>
  );
}
