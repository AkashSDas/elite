import { Button, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { MouseEventHandler } from "react";
import materialUITheme from "../../lib/theme";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  disabled?: boolean;
  key: number;
}

const useStyle = makeStyles({
  root: {
    padding: "0.5rem 2rem",
    color: "white",
    fontWeight: 500,
    letterSpacing: "0.075em",
    textTransform: "capitalize",
    backgroundColor: materialUITheme.palette.secondary.main,
    "&:hover, &:disabled": {
      color: "white",
      backgroundColor: blue[300],
    },
    width: (props: { width: string }) => props.width,
    fontFamily: materialUITheme.typography.fontFamily,
  },
});

function SimpleBtn({ text, onClick, width = null, disabled, key }: Props) {
  const classes = useStyle({ width });

  return (
    <Button
      key={key}
      onClick={onClick}
      className={classes.root}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

export default SimpleBtn;
