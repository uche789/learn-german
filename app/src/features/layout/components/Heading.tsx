import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
    return <h1 className="text-2xl font-semibold mb-4">{children}</h1>
}