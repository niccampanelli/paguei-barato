import { Control, ControllerProps, FieldValues } from "react-hook-form";
import { CampoProps } from "..";

export interface CampoControleProps<T extends FieldValues = FieldValues> extends Omit<ControllerProps<T>, "render"> {
    control: Control<T>;
    /**
     * Propriedades do campo a serem passadas ao componente Campo.
     */
    CampoProps: CampoProps;
}