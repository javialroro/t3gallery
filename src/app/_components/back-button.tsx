"use client";

import { usePathname, useRouter } from "next/navigation";

function BackSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  );
}


export function GoBackButton() {
  const router = useRouter();

  const pathname = usePathname(); // Obtiene la ruta actual

  // Verifica si la ruta actual es diferente a "/"
  if (pathname === "/") {
    return null; // No renderiza el botón si está en la ruta "/"
  }

  const handleGoBack = () => {
    router.back(); // This goes back to the previous page in the browser history
  };

  return (
    <div>
      <button onClick={handleGoBack} className="cursor-pointer">
        <BackSVG />
      </button>
    </div>
  );
}
