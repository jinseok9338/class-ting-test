import { FallbackProps, useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: FallbackProps }) {
    const handleReset = () => {
        window.location.reload();
    }


    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.error}</pre>
            <button onClick={handleReset}>Try again</button>
        </div>
    );
}

export default ErrorFallback