import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  Link,
  useToast,
  Box,
  Icon,
} from "@chakra-ui/core";
import SelectCarreras from "./SelectCarreras";
import SelectMateria from "./SelectMateria";
import SelectCurso from "./SelectCurso";
import { randomColor } from "../utils/colorHelper";
import { DataContext } from "../Context";

const MateriasDrawer = (props) => {
  const { data } = props;
  const [carreras, setCarreras] = React.useState(data.carreras);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const toggleCarrera = (carrera) => {
    setCarreras(
      carreras.map((c) => {
        if (c === carrera) {
          return { ...c, show: !c.show };
        }
        return c;
      })
    );
  };

  // const materiasNotShown = data.materias.filter(
  //   (_, index) => !materiasAMostrar.has(index)
  // );
  // materiasShown.forEach((m) => (m.show = true));
  // materiasNotShown.forEach((m) => (m.show = false));
  // data.materias = [...materiasShown, ...materiasNotShown];
  // setData(data);
  const materiasAMostrar = new Set(
    carreras
      .filter((c) => c.show)
      .reduce((arr, c) => arr.concat(...c.materias), [])
  );
  const materiasShown = data.materias.filter((_, index) =>
    materiasAMostrar.has(index)
  );
  console.log(materiasShown.length);

  const AddButton = () => (
    <IconButton
      m={10}
      onClick={onOpen}
      variantColor="primary"
      aria-label="Agregar Materia"
      icon="add"
      color="background"
      borderColor="background"
      fontFamily="general"
    />
  );

  // appState = {
  //   selectedCourses: [],
  //   availableCourses: [
  //     // ...
  //   ],
  // };

  React.useEffect(() => {
    toast({
      position: "bottom-right",
      render: () => <AddButton />,
      duration: null,
    });
  }, [toast]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="background">
        <DrawerBody>
          <Box textAlign={["right"]}>
            <SelectCarreras carreras={carreras} toggleCarrera={toggleCarrera} />
            {data.materias
              .filter((m) => m.visible)
              .map((m) => {
                return <SelectCurso materia={m} />;
              })}
            <SelectMateria materias={materiasShown} />
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Link
            isExternal
            color="primary.500"
            href="https://github.com/fdelmazo/FIUBA-Plan"
          >
            <Icon color="primary" name="github" />
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MateriasDrawer;
