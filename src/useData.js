import React from "react";
import { data as jsonData } from "./data/horarios";

export const initialData = {
  ...jsonData,
  carreras: jsonData.carreras.map((c) => ({ ...c, show: false })),
};

const useData = () => {
  const [data, setData] = React.useState(initialData);
  const [events, setEvents] = React.useState([]);

  const toggleCarrera = (nombre) => {
    setData({
      ...data,
      carreras: data.carreras.map((c) => {
        if (c.nombre === nombre) {
          return { ...c, show: !c.show };
        }
        return c;
      }),
    });

    const carrera = data.carreras.find((c) => c.nombre === nombre);
    const v = !!carrera.show;
    carrera.show = !v;

    const materiasAMostrar = new Set(
      data.carreras
        .filter((c) => c?.show)
        .reduce((arr, c) => arr.concat(...c.materias), [])
    );
    const materiasShown = data.materias.filter((_, index) =>
      materiasAMostrar.has(index)
    );

    const materiasNotShown = data.materias.filter(
      (_, index) => !materiasAMostrar.has(index)
    );
    materiasShown.forEach((m) => (m.show = true));
    materiasNotShown.forEach((m) => (m.show = false));
    data.materias = [...materiasShown, ...materiasNotShown];
    setData(data);
  };

  const agregarMateria = (codigo) => {
    setData({
      ...data,
      materias: data.materias.map((m) => {
        if (m.codigo === codigo) {
          return { ...m, visible: true };
        }
        return m;
      }),
    });
  };

  const removerMateria = (codigo) => {
    setData({
      ...data,
      materias: data.materias.map((m) => {
        if (m.codigo === codigo) {
          return { ...m, visible: false };
        }
        return m;
      }),
    });
  };

  return { data, events, toggleCarrera, agregarMateria, removerMateria };
};

export default useData;
