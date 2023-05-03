import type { NextPage } from "next";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  // console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);
  // console.log(process.env.SECRET_KEY);

  return (
    <Layout title="Home - Iris">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader
              sx={{ backgroundColor: "#eee", marginBottom: "10px" }}
              title="Pendientes"
            />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader
              sx={{ backgroundColor: "#eee", marginBottom: "10px" }}
              title="En Progreso"
            />
            <EntryList status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader
              sx={{ backgroundColor: "#eee", marginBottom: "10px" }}
              title="Completadas"
            />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
