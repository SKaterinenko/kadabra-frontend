/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";
import clsx from "clsx";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {forwardRef, useState} from "react";
import type {FieldError} from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
	width?: number;
	search?: boolean;
	className?: string;
	classNameInput?: string;
	error?: FieldError;
	// Новые пропсы для файлов
	fileUpload?: boolean;
	maxFiles?: number;
	onFilesChange?: (files: File[]) => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	(
		{
			placeholder,
			width,
			search,
			className,
			classNameInput,
			error,
			fileUpload,
			maxFiles = 3,
			onFilesChange,
			...props
		},
		ref,
	) => {
		const t = useTranslations();
		const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(e.target.files || []);

			// Фильтруем только PNG и JPEG
			const validFiles = files.filter(
				(file) => file.type === "image/png" || file.type === "image/jpeg",
			);

			// Ограничиваем максимум 3 файла
			const limitedFiles = validFiles.slice(0, maxFiles);

			setSelectedFiles(limitedFiles);
			onFilesChange?.(limitedFiles);
		};

		const removeFile = (index: number) => {
			const newFiles = selectedFiles.filter((_, i) => i !== index);
			setSelectedFiles(newFiles);
			onFilesChange?.(newFiles);
		};

		if (fileUpload) {
			return (
				<div className={clsx("relative inline-block", className)}>
					<label className="cursor-pointer">
						<div
							className={clsx(
								"rounded-[5px] border-2 border-gray-300 border-dashed px-6 py-[7px] text-center shadow transition-colors hover:border-primary",
								error && "border-red-500",
								classNameInput,
							)}
						>
							<span className="text-gray-600">
								{selectedFiles.length > 0
									? `${t("selectedFiles")}  ${selectedFiles.length}`
									: t("selectFiles")}
							</span>
						</div>
						<input
							ref={ref}
							type="file"
							accept="image/png,image/jpeg"
							multiple
							onChange={handleFileChange}
							className="hidden"
							{...props}
						/>
					</label>

					{/* Превью файлов */}
					{selectedFiles.length > 0 && (
						<div className="mt-2 space-y-2">
							{selectedFiles.map((file, index) => (
								<div
									key={index}
									className="flex items-center justify-between rounded bg-gray-100 p-2"
								>
									<span className="flex-1 truncate text-sm">{file.name}</span>
									<button
										type="button"
										onClick={() => removeFile(index)}
										className="ml-2 text-red-500 hover:text-red-700"
									>
										✕
									</button>
								</div>
							))}
						</div>
					)}

					{error && (
						<p className="text-red-500 text-sm mt-1">{error.message}</p>
					)}
				</div>
			);
		}

		return (
			<div className={clsx("relative inline-block", className)}>
				<input
					ref={ref}
					placeholder={placeholder}
					style={{ width }}
					className={clsx(
						"rounded-[5px] px-6 py-[7px] shadow focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-light-gray disabled:opacity-50",
						search && "pr-12",
						error && "border-red-500",
						classNameInput,
					)}
					{...props}
				/>

				{search && (
					<Image
						src="/images/search.svg"
						alt="search"
						width={23}
						height={23}
						className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
					/>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
