import { useSpinDelay } from "spin-delay";

export default function Spinner({ loading }: { loading: boolean }) {
  const showSpinner = useSpinDelay(loading, { delay: 500, minDuration: 200 });

  if (showSpinner) {
    return (
      <div role="status">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}
