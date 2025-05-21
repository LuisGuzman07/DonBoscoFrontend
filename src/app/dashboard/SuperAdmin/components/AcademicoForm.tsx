// src/app/dashboard/components/AcademicoForm.tsx
import { useState } from "react";
import { Curso, Paralelo } from "@/app/modelos/Academico";

interface Props {
  initial?: Curso;
  paralelos: Paralelo[];
  onSave: (curso: Curso) => void;
  onCancel: () => void;
}

export default function AcademicoForm({ initial, paralelos, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Curso>(
    initial ?? { paralelo: 0, nombre: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "paralelo" ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4 bg-white shadow">
      <div>
        <label className="block text-sm font-medium">Paralelo</label>
        <select
          name="paralelo"
          value={form.paralelo}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione un paralelo</option>
          {paralelos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.letra} - Grado {p.grado}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Nombre del curso</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Guardar
        </button>
      </div>
    </form>
  );
}
