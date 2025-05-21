export interface Grado {
  id: number;
  nivel_educativo: 'INI' | 'PRI' | 'SEC'; // Inicial, Primaria, Secundaria
  unidad_educativa: number; // ID de la Unidad Educativa
}

export interface Paralelo {
  id: number;
  grado: number; // ID del grado
  letra: string; // Ej: "A", "B"
  capacidad_maxima: number;
}

export interface Curso {
  paralelo: number; // ID de paralelo (clave primaria en el modelo Curso)
  nombre: string;   // Ej: "3°B"
}

export interface Materia {
  id: number;
  nombre: string;
}

export interface MateriaCurso {
  id?: number;
  curso: number;    // ID del curso
  materia: number;  // ID de la materia
}
