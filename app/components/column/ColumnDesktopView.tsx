import { Column } from "@/types/Column"

type ColumnDesktopViewProps = {
    columns: Column[];
}

export default function ColumnDesktopView({columns}: ColumnDesktopViewProps) {
    return (<div className="hidden lg:flex gap-4 overflow-x-auto">
        {columns.map((column, index) => (
            <div key={column.id} className="bg-gray-700 p-4 rounded min-w-88">
                <h3 className="text-xl font-bold">{column.name}</h3>
            </div>
        ))}
    </div>)
}