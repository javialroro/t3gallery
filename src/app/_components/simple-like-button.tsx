"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";
import { useState } from "react";

function LikeSVG({ className = "size-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

export function SimpleLikeButton({
  imageId,
  initialLiked,
}: {
  imageId: number;
  initialLiked: boolean;
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [error, setError] = useState<string | null>(null); // State for error message
  const router = useRouter(); // Use useRouter to reload the page

  async function handleLike(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // Prevent default button behavior

    const newLikedState = !isLiked;
    setIsLiked(newLikedState); // Update the local state immediately

    try {
      const response = await fetch("/api/toggle-like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId, liked: newLikedState }),
      });

      if (response.ok) {
        router.refresh(); // Reload the page to reflect changes
      } else {
        // If the request fails, revert the local state
        setIsLiked(!newLikedState);
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // If there's an error, revert the local state and set error message
      setIsLiked(!newLikedState);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="button"
        className="flex items-center justify-center p-2 transition-opacity hover:opacity-80"
        onClick={handleLike}
      >
        <LikeSVG
          className={`size-6 ${isLiked ? "fill-white stroke-white" : "stroke-current"}`}
        />
        <span className="sr-only">Like</span>
      </button>
    </div>
  );
}
