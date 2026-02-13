"use client";
import clsx from "clsx";
import Image from "next/image";
import {type FC, useMemo, useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import {Footer} from "@/src/entities/Footer";
import {Header} from "@/src/entities/Header";
import {Slider} from "@/src/entities/Slider";
import {CreateReview} from "@/src/features/CreateReview/CreateReview";
import {RatingCard} from "@/src/page/Product/ui/RatingCard";
import {Review} from "@/src/page/Product/ui/Review";
import {ReviewSkeleton} from "@/src/page/Product/ui/ReviewSkeleton";
import {useGetMe} from "@/src/shared/api/client/authClient";
import {useGetProducts} from "@/src/shared/api/client/productsClient";
import {useGetReviewsById} from "@/src/shared/api/client/reviews";
import type {IProductWithParents} from "@/src/shared/api/types";
import {Banner} from "@/src/shared/ui/Banner";
import {Breadcrumbs} from "@/src/shared/ui/Breadcrumb";
import {Button} from "@/src/shared/ui/Button";
import {H1} from "@/src/shared/ui/H1";
import {H2} from "@/src/shared/ui/H2";
import {H3} from "@/src/shared/ui/H3";
import "yet-another-react-lightbox/styles.css";
import {useTranslations} from "next-intl";

interface Props {
	product: IProductWithParents;
}

export const Product: FC<Props> = ({ product }) => {
	const t = useTranslations();
	const [isCreateReview, setIsCreateReview] = useState(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const { data: user } = useGetMe();
	const href = `/category/${product?.product_type?.sub_category?.category?.slug}`;
	const [selected, setSelected] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const price = product?.variations?.[selected]?.price;
	const { data: products } = useGetProducts({});
	const { data: reviews, isLoading: isLoadingReviews } = useGetReviewsById(
		product?.id,
		{},
	);

	// Подготавливаем слайды для Lightbox
	const slides = useMemo(() => {
		if (!product?.variations) return [];
		return product.variations.map((variation) => ({
			src: variation.image,
		}));
	}, [product?.variations]);

	const handleMainImageClick = () => {
		setLightboxIndex(selected);
		setLightboxOpen(true);
	};

	return (
		<main>
			<Header />
			<div className="container flex flex-col gap-5">
				<Breadcrumbs
					className="mt-5"
					items={[
						{ label: t("mainPage"), href: "/" },
						{
							label: product?.product_type?.sub_category?.category?.name,
							href: href,
						},
						{ label: product?.product_type?.sub_category?.name, href: href },
						{ label: product?.product_type?.name },
					]}
				/>
				<div className="mt-3 flex gap-[155px]">
					<Image
						src={product?.variations?.[selected]?.image}
						className="h-[600px] w-[520px] cursor-pointer transition-opacity hover:opacity-90"
						width={520}
						height={600}
						alt="Product"
						onClick={handleMainImageClick}
					/>

					<div className="flex flex-col gap-4">
						<H1 className="!text-5xl mt-[37px]">{product?.name}</H1>
						<div className="flex gap-3">
							{product?.variations.map((item, index) => (
								<div key={item.id}>
									<Image
										className={clsx(
											"h-[100px] w-[80px] cursor-pointer rounded-[3px] border p-1 transition-opacity hover:opacity-80",
											selected === index ? "border-primary" : "border-gray",
										)}
										onClick={() => setSelected(index)}
										src={item?.image}
										width={80}
										height={100}
										alt="Product"
									/>
								</div>
							))}
						</div>
						<p className="text-xl">
							{t("manufacturer")}: {product?.manufacturer?.name}
						</p>
						<H2>${price}</H2>
						<p className="text-xl">{product?.short_description}</p>
						<div className="flex items-center justify-between gap-10 text-xl">
							<div className="flex items-center gap-2">
								<p>{t("quantity")}:</p>

								<div className="flex w-[75px] items-center justify-between rounded-[3px] border px-[8px]">
									<button
										type="button"
										className="cursor-pointer text-base text-primary disabled:opacity-50"
										onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
										aria-label="Decrease quantity"
									>
										-
									</button>
									<p className="text-base">{quantity}</p>
									<button
										type="button"
										className="cursor-pointer text-base text-primary"
										onClick={() => setQuantity((q) => q + 1)}
										aria-label="Increase quantity"
									>
										+
									</button>
								</div>
							</div>

							<div className="flex gap-5">
								<p>{t("cost")}: </p>
								<span className="font-bold text-2xl text-primary">
									${(quantity * price).toFixed(2)}
								</span>
							</div>
						</div>
						<div className="flex justify-between gap-5">
							<Button className="!bg-yellow-500 border-yellow-500">
								{t("buy")}
							</Button>
							<Button variant="outlined">{t("addCart")}</Button>
						</div>
					</div>
				</div>
				<div>
					<H3>{t("likeProducts")}</H3>
					<Slider data={products?.data} />
				</div>
				<Banner path="/images/banner6.png" />
				<div className="mt-[50px] flex justify-between">
					<div className="flex flex-col gap-5">
						<H2>{t("characteristics")}</H2>
						<p>{product?.description}</p>
					</div>
					<RatingCard
						user={user}
						ratings={reviews?.ratings}
						setIsCreateReview={setIsCreateReview}
						isCreateReview={isCreateReview}
					/>
				</div>
				<div>
					<H2>{t("testimonials")}</H2>
					<div className="mt-6 flex flex-col gap-3">
						{isLoadingReviews && <ReviewSkeleton />}
						{reviews?.reviews?.map((el) => (
							<Review key={el?.id} review={el} />
						))}
						{isCreateReview && (
							<CreateReview
								user={user}
								productId={product?.id}
								setIsCreateReview={setIsCreateReview}
							/>
						)}
					</div>
				</div>
			</div>
			<Footer />
			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				slides={slides}
				index={lightboxIndex}
				controller={{
					closeOnBackdropClick: true,
				}}
				on={{
					view: ({ index }) => setSelected(index),
				}}
			/>
		</main>
	);
};
