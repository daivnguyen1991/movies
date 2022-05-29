import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import useStore, { getImgUrl } from "../store";

function CardMovies({ id, poster_path, title, vote_average, vote_count }) {
  const setActiveId = useStore((s) => s.setActiveId);
  return (
    <Card
      className="movies-container"
      onClick={() => typeof setActiveId === "function" && setActiveId(id)}
    >
      <CardMedia
        className="lazy"
        component="img"
        height="194"
        image={getImgUrl(poster_path)}
        alt={title}
      />
      <CardContent>
        <Typography variant="body1" noWrap title={title}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vote Average: {`${vote_average}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vote Count: {`${vote_count}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardMovies;
