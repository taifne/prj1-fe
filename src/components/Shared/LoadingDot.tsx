const LoadingDot = () => {
    return (
        <main className="glassmorphism w-full  flex justify-center items-center">
            <div className="flex space-x-2 justify-center items-center ">
                <span className="sr-only">Loading...</span>
                <div className="h-6 w-6 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-6 w-6 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-6 w-6 bg-white rounded-full animate-bounce"></div>
            </div>
        </main>
    );
};

export default LoadingDot;
