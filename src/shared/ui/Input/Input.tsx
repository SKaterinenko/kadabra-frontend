import Image from "next/image";
import { FC } from "react";

interface Props {
    placeholder?: string;
    width?: number;
    search?: boolean;
}

export const Input: FC<Props> = ({ placeholder, width, search }) => {
    return (
        <div className="relative inline-block">
            <input
                placeholder={placeholder}
                style={{ width }}
                className={`
          shadow py-3 px-6 rounded-[5px]
          ${search ? "pr-12" : ""}
        `}
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
};
