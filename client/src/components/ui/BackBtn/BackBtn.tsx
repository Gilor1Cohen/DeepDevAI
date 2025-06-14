import { Link } from "react-router-dom";
import Btn from "../btn/Btn";
import "./BackBtn.css";

export default function BackBtn() {
  return (
    <div id="BackBtnWrapper">
      <Link to={"/"}>
        <Btn text={"Back"} type={"button"} isDisabled={false} />
      </Link>
    </div>
  );
}
