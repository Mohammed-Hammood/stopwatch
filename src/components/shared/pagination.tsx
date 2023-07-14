import React, {   useState } from 'react';
import { Modal, ICONS } from 'components';
import styled from 'styled-components';

type WrapperProps = {
    $totalPagesLength: number;
}
const Wrapper = styled.div<WrapperProps>`
    .pagination, & {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 100%;
        font-size: 12px;
        padding:5px;
        &__button:hover, &__currentPage:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background:var(--specialColorHover);
            color:white;
            svg path {
                fill:white;
            }
        }
        &__button, &__disabled, &__currentPage {
            background: white;
            border: 0.1px solid var(--borderColor);
            border-radius:5px;
            cursor: pointer;
            height: 35px;
            padding: 10px 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
                width: 13px;
                height: 13px;
            }
        }
        &__currentPage {
            padding:0;
            &:hover {
                background: white;
                color:black;
                cursor:default;
            }
            &__input {
                height:100%;
                border:none;
                outline: 1px solid var(--borderColor);
                width: ${({ $totalPagesLength }) => ($totalPagesLength * 5) + 40 + "px"};
                text-align:center;
                &:focus {
                    outline:none;
                }
                &:hover {
                    outline: 1px solid var(--specialColor);
                }
            }
            &__text {
                padding:5px;
            }
        }

    &__disabled {
        cursor: default;
        opacity: 0.5;
    }
}
`
interface Props {
    queryset: any[];
    page: number;
    limit: number;
    totalCount: number;
    setPage: (pageNumber: number) => void;
}

export default function Pagination(props: Props) {
    const [paginationModal, setPaginationModal] = useState<boolean>(false);
    const { queryset, totalCount, page, limit, setPage } = props;

    const shiftPage = (direction: string): void => {
        if (direction === "next" && isNextPage) {
            setPage(page + 1);
        } else if (direction === "previous" && isPrevPage) {
            setPage(page - 1);
        } else if (direction === "last" && !isLastPage) {
            setPage(totalPages)
        } else if (direction === 'first' && !isFirstPage) {
            setPage(1);
        }
    }
    const pageValues = () => {
        const totalPages = Math.ceil(totalCount / limit) || 1;
        const startQuery = (page === 1) ? 1 : limit * (page - 1) + 1;
        const endQuery = (page === 1) ? queryset.length : ((limit * (page - 1) + totalCount));
        const isLastPage = totalCount === 0 ? true : (page === Math.ceil(totalCount / limit));
        const isFirstPage = (page === 1);
        const isPrevPage = (page > 1);
        const isNextPage = (totalPages > page);
        return {
            startQuery,
            endQuery,
            totalCount,
            isLastPage,
            isPrevPage,
            isNextPage,
            isFirstPage,
            totalPages
        }
    }
    const { isNextPage, isFirstPage, isPrevPage, totalPages, isLastPage } = pageValues();
    return (
        <>
            <Wrapper className='pagination' $totalPagesLength={totalPages.toString().length}>
                <button className={isFirstPage ? 'pagination__disabled' : 'pagination__button'} title={("First page")} onClick={() => shiftPage("first")}>
                    <ICONS name={`angles-left`} color='black' />
                </button>
                <button className={isFirstPage ? 'pagination__disabled' : 'pagination__button'} onClick={() => shiftPage("previous")} title={("Previous page")}>
                    <ICONS name={`angle-left`} color='black' />
                </button>
                <div className="pagination__currentPage">
                    <input type='text' value={page} readOnly onFocus={() => setPaginationModal(true)} className='pagination__currentPage__input' />
                    <div title={("Move to a specific page by entering a page number")} className={'pagination__currentPage__text'}>
                        {("of")} {totalPages}
                    </div>
                </div>

                <button className={isNextPage ? 'pagination__button' : 'pagination__disabled'} onClick={() => shiftPage("next")} title={("Next page")}>
                    <ICONS name={`angle-right`} color='black' />
                </button>

                <button className={isLastPage ? 'pagination__disabled' : 'pagination__button'} title={("Last page")} onClick={() => shiftPage("last")}>
                    <ICONS name={`angles-right`} color='black' />
                </button>
            </Wrapper>
            <Modal
                form="pagination"
                title="Move to page"
                setIsVisible={setPaginationModal}
                isVisible={paginationModal}
                {...{ page, setPage, totalPages: totalPages }}
            />
        </>
    )
}