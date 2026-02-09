"use client";

import type {EmblaOptionsType} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import type {IProduct} from "@/src/shared/api/types";
import {ProductCard} from "@/src/shared/ui/ProductCard";
import {ProductCardSkeleton} from "@/src/shared/ui/ProductCard/ProductCardSkeleton";

type Props = {
	data?: IProduct[];
	slides?: number;
};

export const Slider = ({ data, slides = 6 }: Props) => {
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
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
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
		<div className="relative w-full mx-auto px-4">
			{/* Контейнер карусели */}
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
						Array.from({ length: 10 }).map(() => (
							<ProductCardSkeleton key={Math.random()} />
						))}
				</div>
			</div>

			<button
				className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 
          w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-lg flex items-center 
          justify-center hover:bg-white transition-all z-10
          ${prevBtnDisabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
				onClick={scrollPrev}
				disabled={prevBtnDisabled}
				aria-label="Previous slide"
			>
				<ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
			</button>

			<button
				className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 
          w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-lg flex items-center 
          justify-center hover:bg-white transition-all z-10
          ${nextBtnDisabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
				onClick={scrollNext}
				disabled={nextBtnDisabled}
				aria-label="Next slide"
			>
				<ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
			</button>
		</div>
	);
};
