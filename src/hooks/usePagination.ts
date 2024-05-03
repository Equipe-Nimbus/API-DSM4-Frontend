import { useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(items.length / itemsPerPage);

    const nextPage = () => {
        setPage((current) => Math.min(current + 1, maxPage));
    };

    const prevPage = () => {
        setPage((current) => Math.max(current - 1, 1));
    };

    const currentItems = items.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return { page, currentItems, nextPage, prevPage, setPage };
}