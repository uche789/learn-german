import { IconType } from "@/lib/types";

const links: Array<{name: string, to: string, icon: IconType}> = [
    {
        name: 'Grammar',
        to: '/grammar',
        icon: IconType.Grammar
    },
    {
        name: 'Vocabulary',
        to: '/vocabulary',
        icon: IconType.Vocabulary
    },
    {
        name: 'Idioms',
        to: '/idioms',
        icon: IconType.Idioms
    },
    {
        name: 'Practice',
        to: '/practice',
        icon: IconType.Practice
    }
]
export default links;