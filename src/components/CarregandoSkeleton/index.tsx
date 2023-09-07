import CarregandoSkeletonProps from "../../interfaces/components/CarregandoSkeletonProps";
import { useTemaContext } from "../../util/context/providers/temaProvider";
import { Skeleton } from "moti/skeleton";

export default function CarregandoSkeleton(props: CarregandoSkeletonProps) {

    const { propriedadesTema } = useTemaContext();

    return (
        <Skeleton
            radius={propriedadesTema.layout.raioBorda}
            colors={[propriedadesTema.cores.fundoSecundario, propriedadesTema.cores.fundoTerciario]}
            {...props}
        >
            {props.children}
        </Skeleton>
    );
}