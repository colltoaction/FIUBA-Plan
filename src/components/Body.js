import React from "react";
import Calendar from "./Calendar";
import { useToast, Box, Alert, AlertIcon } from "@chakra-ui/core";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MateriasDrawer from "./MateriasDrawer";
// import { DataContext } from "../Context";
import { initialData } from "../useData";

const Body = () => {
  const toast = useToast();
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    toast({
      position: "bottom-right",
      duration: 2000,
      render: () => (
        <Alert borderRadius={5} mx={10} status="success">
          <AlertIcon />
          Actualizado al {data.cuatrimestre}
        </Alert>
      ),
    });
  }, [toast]);

  return (
    <Box flexGrow={1}>
      <MateriasDrawer data={data} />
      <Calendar events={[]} />
    </Box>
  );
};

export default Body;
