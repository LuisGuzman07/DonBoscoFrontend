import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AxiosInstance from "@/components/AxiosInstance";
import { Curso, Paralelo } from "@/app/modelos/Academico";
import AcademicoForm from "./components/AcademicoForm";
import AcademicoTable from "./components/AcademicoTable";
import { AxiosResponse } from "axios";

export default function Academico() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [paralelos, setParalelos] = useState<Paralelo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editCurso, setEditCurso] = useState<Curso | null>(null);

  useEffect(() => {
    AxiosInstance.get<Curso[]>("/cursos/listar/")
      .then((res) => setCursos(res.data))
      .catch(() => alert("No se pudieron cargar los cursos."));
    AxiosInstance.get<Paralelo[]>("/academico/paralelos/listar/")
      .then((res) => setParalelos(res.data))
      .catch(() => alert("No se pudieron cargar los paralelos."));
  }, []);

  const handleSave = async (form: Curso) => {
    try {
      let res: AxiosResponse<Curso>;
      if (editCurso) {
        res = await AxiosInstance.put<Curso>(`/cursos/editar/${editCurso.paralelo}/`, form);
        setCursos((prev) =>
          prev.map((c) => (c.paralelo === editCurso.paralelo ? res.data : c))
        );
      } else {
        res = await AxiosInstance.post<Curso>("/cursos/crear/", form);
        setCursos((prev) => [...prev, res.data]);
      }
      setShowForm(false);
      setEditCurso(null);
    } catch (err) {
      console.error("Error al guardar curso:", err);
      alert("Ocurrió un error al guardar el curso.");
    }
  };

  const handleDelete = async (paraleloId: number) => {
    if (!confirm("¿Eliminar este curso?")) return;
    try {
      await AxiosInstance.delete(`/cursos/eliminar/${paraleloId}/`);
      setCursos((prev) => prev.filter((c) => c.paralelo !== paraleloId));
    } catch (err) {
      console.error("Error al eliminar curso:", err);
      alert("Error al eliminar el curso.");
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-600">Gestión Académica</h2>
        <button
          onClick={() => {
            setEditCurso(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" /> Nuevo curso
        </button>
      </header>

      <AcademicoTable
        cursos={cursos}
        onEdit={(c) => {
          setEditCurso(c);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <AcademicoForm
          initial={editCurso ?? undefined}
          paralelos={paralelos}
          onCancel={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
