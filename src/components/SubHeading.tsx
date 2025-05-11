import { ReactNode } from "react";

export default function SubHeading({ children }: { children: ReactNode }) {
    return <p className="text-xl text-gray-500 mb-8">{children}</p>
}