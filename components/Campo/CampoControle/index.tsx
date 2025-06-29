import { CampoControleProps } from "@/types/components/Campo/CampoControle";
import { Controller, FieldValues } from "react-hook-form";
import Campo from "..";

export default function CampoControle<T extends FieldValues = FieldValues>({
    CampoProps,
    ...resto
}: CampoControleProps<T>) {

    return (
        <Controller
            render={({ field: { onChange, onBlur, value } }) => (
                <Campo
                    {...CampoProps}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    defaultValue={value}
                />
            )}
            {...resto}
        />
    )
}