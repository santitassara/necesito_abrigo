import { Spinner } from 'react-bootstrap';
import classes from "../SpinnerComp/SpinnerComp.module.scss";

function SpinnerComp() {
  return (
    <div className={classes["SpinnerComp"]}>
      <Spinner animation="grow" variant="primary" />
    </div>
  );
}

export default SpinnerComp;