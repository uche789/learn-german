export default function ErrorText({ text = "" }) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-700">Error loading{text ? " " + text : text}</p>
      </div>
    );
  }
  