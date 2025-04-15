import Link from "next/link";

export default function NotFound({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        {message ? message : "sorry"}
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
