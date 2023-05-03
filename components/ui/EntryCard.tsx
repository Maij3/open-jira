import { DragEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { UIContext } from "../../context/ui/UIContext";
import { Entry } from "../../interfaces";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id);

    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            flexDirection: "column",
            paddingRight: 2,
          }}
        >
          <Typography variant="body2">
            <Box component={"span"} sx={{ fontWeight: "bold" }}>
              Creado
            </Box>
            : {dateFunctions.getFormat(entry.createdAt)}
          </Typography>
          {entry.modifyTo && (
            <Typography variant="body2">
              <Box component={"span"} sx={{ fontWeight: "bold" }}>
                Fecha de modificación
              </Box>
              : {dateFunctions.getFormat(entry.modifyTo)}
            </Typography>
          )}
          {entry.modifyTo && (
            <Typography variant="body2">
              <Box component={"span"} sx={{ fontWeight: "bold" }}>
                Tiempo desde la modificación
              </Box>
              : {dateFunctions.getFormatDistanceToNow(entry.modifyTo)}
            </Typography>
          )}
          {entry.duration && (
            <Typography variant="body2">
              <Box component={"span"} sx={{ fontWeight: "bold" }}>
                Duración
              </Box>
              : {entry.duration}
            </Typography>
          )}
          {entry.user && (
            <Typography variant="body2" sx={{textTransform:"capitalize"}}>
              <Box component={"span"} sx={{ fontWeight: "bold" }}>
                Usuario
              </Box>
              : {entry.user}
            </Typography>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
