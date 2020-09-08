import React from "react";
import {
  List,
  Box,
  ListIcon,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  PseudoBox,
} from "@chakra-ui/core";
import { useCombobox } from "downshift";
import { DataContext } from "../Context";
import SelectCurso from "./SelectCurso";

const SelectMateria = (props) => {
  const { materias } = props;
  // const [data, setDate] = React.useState([]);
  // const [inputItems, setInputItems] = React.useState([]);

  // React.useEffect(() => {
  //   const materiasVisibles = data.materias.filter((m) => m.show);
  //   const materias = materiasVisibles.length ? materiasVisibles : data.materias;
  //   setInputItems(materias);
  // }, [data]);

  console.log(materias.length);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: materias,
    // onInputValueChange: ({ inputValue }) => {
    //   setInputItems(
    //     inputItems.filter(
    //       (item) =>
    //         item.nombre.toLowerCase().startsWith(inputValue.toLowerCase()) ||
    //         item.codigo.startsWith(inputValue)
    //     )
    //   );
    // },
  });

  return (
    <>
      <InputGroup w="60%" fontFamily="general" mt={4}>
        <Input
          {...getToggleButtonProps()}
          backgroundColor="background"
          variantColor="primary"
          variant="outline"
          borderColor="primary"
          color="primary.500"
          {...getInputProps()}
          {...getComboboxProps()}
          placeholder="Buscar Materia..."
          pr={10}
        />
        <InputRightElement
          children={<Icon ml={20} name="search" color="primary.500" />}
        />
      </InputGroup>
      {isOpen &&
        (materias.length ? (
          <List
            textAlign={["left"]}
            fontFamily="general"
            {...getMenuProps()}
            p={1}
            mb={0}
            border="1px"
            borderRadius="md"
            borderColor="primary.500"
            style={{
              maxHeight: "10em",
              overflowY: "scroll",
            }}
          >
            {materias.map((item, index) => (
              <PseudoBox
                borderRadius="md"
                _hover={{ bg: "gray.500" }}
                color="primary.500"
                fontSize="smaller"
                onClick={() => {
                  // agregarMateria(item.codigo);
                }}
              >
                <li>
                  <ListIcon icon="chevron-right" />({item.codigo}) {item.nombre}
                </li>
              </PseudoBox>
            ))}
          </List>
        ) : (
          <Box p={1} mt={3} mb={0} color="primary.500">
            No hay materias con ese código.
          </Box>
        ))}
    </>
  );
};

export default SelectMateria;
