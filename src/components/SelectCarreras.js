import React from "react";
import { Button, List, PseudoBox, ListIcon, Box } from "@chakra-ui/core";
import { useSelect } from "downshift";
import { DataContext } from "../Context";

const SelectCarreras = (props) => {
  // const toggleCarrera = (nombre) => {
  //   setData({
  //     ...data,
  //     carreras: data.carreras.map((c) => {
  //       if (c.nombre === nombre) {
  //         return { ...c, show: !c.show };
  //       }
  //       return c;
  //     }),
  //   });

  //   const carrera = data.carreras.find((c) => c.nombre === nombre);
  //   const v = !!carrera.show;
  //   carrera.show = !v;

  // const materiasAMostrar = new Set(
  //   data.carreras
  //     .filter((c) => c?.show)
  //     .reduce((arr, c) => arr.concat(...c.materias), [])
  // );
  // const materiasShown = data.materias.filter((_, index) =>
  //   materiasAMostrar.has(index)
  // );

  // const materiasNotShown = data.materias.filter(
  //   (_, index) => !materiasAMostrar.has(index)
  // );
  // materiasShown.forEach((m) => (m.show = true));
  // materiasNotShown.forEach((m) => (m.show = false));
  // data.materias = [...materiasShown, ...materiasNotShown];
  // setData(data);
  // };

  // const { toggleCarrera } = React.useContext(DataContext);

  const { carreras, toggleCarrera } = props;
  // const [carreras, setCarreras] = React.useState(props.carreras);

  const {
    isOpen,
    getItemProps,
    getToggleButtonProps,
    getMenuProps,
  } = useSelect({
    items: carreras,
    stateReducer,
  });

  return (
    <Box mb={4}>
      <Button
        {...getToggleButtonProps()}
        rightIcon={isOpen ? "chevron-up" : "chevron-down"}
        mt={8}
        w="100%"
        variantColor="primary"
        variant="outline"
        fontFamily="general"
      >
        Carreras
      </Button>
      {isOpen && (
        <List
          {...getMenuProps()}
          p={1}
          mb={0}
          border="1px"
          borderRadius="md"
          borderColor="primary.500"
          fontFamily="general"
          textAlign={["left"]}
        >
          {carreras
            // .sort((a, b) => {
            //   return a.nombre > b.nombre;
            // })
            .map((c, index) => (
              <ShowCarrera carrera={c} toggleCarrera={toggleCarrera} />
            ))}
        </List>
      )}
    </Box>
  );
};

const ShowCarrera = (props) => {
  const { carrera, toggleCarrera } = props;

  return (
    <PseudoBox
      borderRadius="md"
      _hover={{ bg: "gray.500" }}
      color="primary.500"
      onClick={() => toggleCarrera(carrera)}
    >
      <li key={carrera}>
        {carrera.nombre}
        <ListIcon ml={2} icon={carrera.show && "check"} />
      </li>
    </PseudoBox>
  );
};

function stateReducer(state, actionAndChanges) {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
}
export default SelectCarreras;
