import { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error }: { error: FallbackProps }) {
    const handleReset = () => {
        window.location.reload();
    }


    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.error}</pre>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleReset}>Try again</button>
        </div>
    );
}

export default ErrorFallback