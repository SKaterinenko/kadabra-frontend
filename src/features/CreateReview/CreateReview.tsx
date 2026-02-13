"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {type ReviewFormData, reviewSchema,} from "@/src/features/CreateReview/schema";
import {useCreateReview} from "@/src/shared/api/client/reviews";
import type {IUser} from "@/src/shared/api/types";
import {Avatar} from "@/src/shared/ui/Avatar";
import {Button} from "@/src/shared/ui/Button";
import {H3} from "@/src/shared/ui/H3";
import {Input} from "@/src/shared/ui/Input";
import {StarRating} from "@/src/shared/ui/StarRating";
import {Textarea} from "@/src/shared/ui/Textarea";

interface Props {
	user?: IUser;
	productId: number;
	setIsCreateReview: Dispatch<SetStateAction<boolean>>;
}

export const CreateReview: FC<Props> = ({
	user,
	productId,
	setIsCreateReview,
}) => {
	const t = useTranslations();
	const [files, setFiles] = useState<File[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ReviewFormData>({
		resolver: zodResolver(reviewSchema),
	});
	const { mutate: createReview, isPending, isError, error } = useCreateReview();

	const onSubmit = async (data: ReviewFormData) => {
		createReview(
			{
				product_id: productId,
				images: files,
				...data,
			},
			{
				onSuccess: () => {
					setIsCreateReview(false);
					setFiles([]);
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-10">
			<div className="flex gap-5">
				<div>
					<Avatar src={user?.avatar} size={115} />
				</div>
				<div className="flex w-full flex-col gap-2">
					<H3>{t("yourReview")}</H3>
					<div className="flex gap-5">
						<p>{t("yourMark")}</p>
						<Controller
							name="rating"
							control={control}
							render={({ field }) => (
								<StarRating editable size={24} onChange={field.onChange} />
							)}
						/>
					</div>
					<p className="!text-red-500 text-sm">{errors?.rating?.message}</p>

					<Textarea
						{...register("description")}
						className="w-full"
						aria-invalid={!!errors.description}
					/>
					{errors.description && (
						<p className="!text-red-500 text-sm">
							{errors.description.message}
						</p>
					)}
					<Input
						fileUpload
						maxFiles={3}
						onFilesChange={(files) => setFiles(files)}
					/>
				</div>
			</div>
			<div className="flex justify-center">
				<Button
					type="submit"
					disabled={isPending}
					className="mt-3 max-w-[180px]"
				>
					{isPending ? t("sending") : t("publish")}
				</Button>
			</div>

			{isError && (
				<p className="!text-red-500 text-lg">
					{error?.message || t("errorSend")}
				</p>
			)}
		</form>
	);
};
