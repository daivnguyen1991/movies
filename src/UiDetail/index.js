import { useTheme } from "@emotion/react";
import useSWR from "swr";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";

import CardMedia from "@mui/material/CardMedia";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import useStore, { fetcher, getImgUrl, linkUrlGetDetail } from "../store";
import useWindowSize from "./useWindowSize";
import UiLoading from "../comps/UiLoading";
import UiError from "../comps/UiError";

const orders = [
  "id",

  "imdb_id",
  "title",
  "poster_path",
  "backdrop_path",
  "status",
  "original_title",
  "tagline",
  "vote_average",
  "vote_count",

  "overview",

  "original_language",
  "popularity",
  "release_date",
  "homepage",
  "adult",
  "revenue",
  "runtime",
  "budget",
  "video",
  "belongs_to_collection",
  "genres", //name
  "spoken_languages", //name
  "production_countries", //name
  "production_companies", //name, logo_path, origin_country
];

const getData = (data) => {
  if (!Boolean(data)) {
    return `${data}`;
  }
  if (Array.isArray(data)) {
    return data.map((i) => i.name).join(", ");
  }
  if (typeof data === "object" && typeof data.name === "string") {
    return `${data.name}`;
  }

  return `${data}`;
};

function UiDetail() {
  const activeId = useStore((s) => s.activeId);
  const setActiveId = useStore((s) => s.setActiveId);
  const theme = useTheme();
  const { width } = useWindowSize();

  const { data = {}, error } = useSWR(linkUrlGetDetail(activeId), fetcher);
  return (
    <Dialog
      open={Boolean(activeId)}
      fullScreen={width <= theme.breakpoints.values.md}
      fullWidth
      scroll="paper"
      maxWidth="md"
      PaperProps={{
        sx: {
          overflow: "hidden",
          position: "relative",
          height: "100%",
        },
      }}
      onClose={() => typeof setActiveId === "function" && setActiveId(null)}
    >
      <DialogTitle id="scroll-dialog-title" sx={{ display: "flex" }}>
        <IconButton
          sx={{ ml: "auto" }}
          onClick={() => typeof setActiveId === "function" && setActiveId(null)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <UiError />}
        {!data && <UiLoading />}
        <Table>
          <TableBody>
            {orders.map((k) => (
              <TableRow key={k}>
                <TableCell>
                  <Box>
                    <Typography
                      color="primary"
                      noWrap
                      title={`${k}`.split("_").join(" ")}
                      variant="caption"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {`${k}`.split("_").join(" ")}
                    </Typography>
                    <Typography title={getData(data[k])}>
                      {getData(data[k])}
                    </Typography>
                    {["poster_path", "backdrop_path"].includes(k) && (
                      <CardMedia
                        className="lazy"
                        component="img"
                        image={getImgUrl(data[k])}
                        alt={`${data[k]}`}
                        sx={({ typography: { pxToRem } }) => ({
                          height: "100%",
                          maxHeight: pxToRem(200),
                          width: "auto",
                        })}
                      />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default UiDetail;
