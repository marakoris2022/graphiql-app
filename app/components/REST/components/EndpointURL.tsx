import { FieldValues, UseFormRegister } from "react-hook-form";

type EndpointURLProps = {
  register: UseFormRegister<FieldValues>;
};

export const EndpointURL = ({ register }: EndpointURLProps) => {
  return (
    <div>
      <input {...register("EndpointURL")} placeholder="Endpoint URL"></input>
    </div>
  );
};
