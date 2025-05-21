// src/app/dashboard/components/AcademicoTable.tsx
import { Curso } from "@/app/modelos/Academico";
import { Pencil, Trash } from "lucide-react";

interface Props {
  cursos: Curso[];
  onEdit: (curso: Curso) => void;
  onDelete: (id: number) => void;
}

export default function AcademicoTable({ cursos, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto border rounded shadow bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Paralelo</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, i) => (
            <tr key={curso.paralelo} className="border-t">
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">{curso.nombre}</td>
              <td className="px-4 py-2">{curso.paralelo}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => onEdit(curso)} className="text-blue-600 hover:underline">
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(curso.paralelo)} className="text-red-600 hover:underline">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
          {cursos.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No hay cursos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
