import { Button, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { MouseEventHandler } from "react";
import materialUITheme from "../../lib/theme";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: string;
}

const useStyle = makeStyles({
  root: {
    padding: "0.5rem 2rem",
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    backgroundColor: materialUITheme.palette.secondary.main,
    "&:hover": {
      backgroundColor: blue[300],
    },
    width: (props: { width: string }) => props.width,
    fontFamily: materialUITheme.typography.fontFamily,
  },
});

function SimpleBtn({ text, onClick, width = null }: Props) {
  const classes = useStyle({ width });

  return (
    <Button onClick={onClick} className={classes.root}>
      {text}
    </Button>
  );
}

export default SimpleBtn;
