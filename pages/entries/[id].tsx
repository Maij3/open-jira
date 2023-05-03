import {
  ChangeEvent,
  FC,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import { GetServerSideProps } from "next";

import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { EntriesContext } from "../../context/entries";
import { dbEntries } from "../../database";
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from "../../utils";
import Image from "next/image";
import Link from "next/link";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  console.log({ entry });
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [inputHours, setInputHours] = useState(entry.duration);
  const [urlImage, setUrlImage] = useState(entry.image);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const [user , setUser] = useState(entry.user);
  const router = useRouter();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onInputHoursChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputHours(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onUserChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value as EntryStatus);
  };

  const onInputUrlImage = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlImage(event.target.value);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
      duration: inputHours,
      image: urlImage,
      user: user
    };

    console.log(updatedEntry);
    updateEntry(updatedEntry, true);
    router.push("/");
  };

  const onDelete = () => {
    deleteEntry(entry, true);
    router.push("/");
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
              />
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                label="Duración"
                placeholder="Duración"
                value={inputHours}
                onBlur={() => setTouched(true)}
                onChange={onInputHoursChanged}
                fullWidth
                autoFocus
                helperText={isNotValid && "Ingrese las horas"}
                error={isNotValid}
              />
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                label="Url de la imagen"
                placeholder="Url de la imagen"
                value={urlImage}
                onBlur={() => setTouched(true)}
                onChange={onInputUrlImage}
                fullWidth
                autoFocus
                helperText={isNotValid && "Ingrese la url de la imagen"}
                error={isNotValid}
              />
              <a
                target="_blank"
                style={{ display: "block" , margin:"10px 0px" }}
                href={urlImage}
                 rel="noreferrer" 
              >
                {urlImage}
              </a>
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                label="Usuario"
                placeholder="Usuario"
                value={user}
                onBlur={() => setTouched(true)}
                onChange={onUserChanged}
                fullWidth
                autoFocus
                helperText={isNotValid && "Ingrese el usuario"}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlinedIcon onClick={onDelete} />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
