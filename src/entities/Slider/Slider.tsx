"use client";

import type {EmblaOptionsType} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {type FC, memo, useCallback, useEffect, useState} from "react";
import type {IProduct} from "@/src/shared/api/types";
import {ProductCard} from "@/src/shared/ui/ProductCard";
import {ProductCardSkeleton} from "@/src/shared/ui/ProductCard/ProductCardSkeleton";

type Props = {
	data?: IProduct[];
	slides?: number;
};

export const Slider: FC<Props> = memo(({ data, slides = 6 }) => {
	const options: EmblaOptionsType = {
		loop: true,
		dragFree: true,
		slidesToScroll: 1,
		containScroll: "keepSnaps",
		align: "start",
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const scrollPrev = useCallback(() => {
		emblaApi?.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		emblaApi?.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		emblaApi.on("select", onSelect);

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi, onSelect]);

	return (
		<div className="relative mx-auto w-full px-4">
			<div className="overflow-hidden p-[15px]" ref={emblaRef}>
				<div
					className="grid gap-4"
					style={{
						gridAutoFlow: "column",
						gridAutoColumns: `calc((100% - ${(slides - 1) * 16}px) / ${slides})`,
					}}
				>
					{!!data?.length &&
						data.map((slide) => (
							<div key={slide.id}>
								<ProductCard data={slide} />
							</div>
						))}

					{!data?.length &&
						Array.from({ length: 10 }).map((_) => (
							<ProductCardSkeleton key={Math.random()} />
						))}
				</div>
			</div>

			<button
				type="button"
				className={`absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white md:h-10 md:w-10 md:-translate-x-4 ${prevBtnDisabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
				onClick={scrollPrev}
				disabled={prevBtnDisabled}
				aria-label="Previous slide"
			>
				<ChevronLeft className="h-4 w-4 text-gray-800 md:h-5 md:w-5" />
			</button>

			<button
				type="button"
				className={`absolute top-1/2 right-0 z-10 flex h-8 w-8 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white md:h-10 md:w-10 md:translate-x-4 ${nextBtnDisabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
				onClick={scrollNext}
				disabled={nextBtnDisabled}
				aria-label="Next slide"
			>
				<ChevronRight className="h-4 w-4 text-gray-800 md:h-5 md:w-5" />
			</button>
		</div>
	);
});
