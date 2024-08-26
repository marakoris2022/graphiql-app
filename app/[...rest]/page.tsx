import { MainForm } from "../components/REST/MainForm";
import styles from "./page.module.css";

export default function RestClient(props) {
  const data = JSON.parse(JSON.stringify(props.params.rest));
  if (data) {
    console.log("data", data);
  }

  return (
    <div>
      <MainForm />

      <div>
        <textarea value={JSON.stringify(props)} placeholder="" disabled />
      </div>
    </div>
  );
}
