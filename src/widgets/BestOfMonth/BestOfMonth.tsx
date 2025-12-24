import {Slider} from "@/src/entities/Slider";
import {getProductsServer} from "@/src/shared/api/products";
import {H2} from "@/src/shared/ui/H2";

export const BestOfMonth = async () =>{
const products  = await getProductsServer()

    return (
        <section>
            <div className="flex justify-between mb-5 items-center">
                <H2>Лучшее за месяц</H2>
                <p className="cursor-pointer">Смотреть все</p>
            </div>

            <Slider data={products} />
        </section>
    )
}