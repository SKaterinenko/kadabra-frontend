import { H2 } from "@/src/shared/ui/H2";
import { Slider } from "@/src/entities/Slider";
import {IProduct} from "@/src/shared/api/types";
import {FC} from "react";

type Props = {
    products?: IProduct[];
};

export const PromotionView:FC<Props> = ({ products }) => {
    return (
        <section>
            <div className="grid grid-cols-[25%_75%] gap-5">
                <div className="flex flex-col gap-[35px] bg-primary rounded-[3px] py-[70px] px-10">
                    <H2 className="text-white! text-[48px]">
                        Товары по акции
                    </H2>

                    <div>
                        <p className="text-white! font-bold text-xl">-30%</p>
                        <p className="text-white! font-bold text-xl">
                            только до 05.05.2026
                        </p>
                    </div>
                </div>

                <Slider data={products} slides={5} />
            </div>
        </section>
    );
};
