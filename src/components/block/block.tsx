export default function Block({ text }: { text: string }) {
  return (
    <div
      className="bg-white shadow-md inline-flex p-3 rounded-xl border-grey-100 border-solid border-2"
      data-testid="block-fill-in"
    >
      {text}
    </div>
  );
}
