"use client";

import {useRouter} from "next/navigation";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {WATCHLIST_TABLE_HEADER} from "@/lib/constants";
import {cn, getChangeColorClass} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import WatchListButton from "@/components/WatchListButton";

const WatchlistTable = ({watchlist}: WatchlistTableProps) => {

    const router = useRouter();

    return (
        <Table className="scrollbar-hide-default watchlist-table">
            <TableHeader>
                <TableRow className="table-header-row">
                    {WATCHLIST_TABLE_HEADER.map((label) => (
                        <TableHead className="table-header" key={label}>{label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {watchlist.map((item, index) => (
                    <TableRow
                        key={item.symbol + index}
                        className="table-row"
                        onClick={() => router.push(`/stocks/${encodeURIComponent(item.symbol)}`)}
                    >
                        <TableCell className="pl-4 table-cell">
                            {item.company}
                        </TableCell>
                        <TableCell className="table-cell">
                            {item.symbol}
                        </TableCell>
                        <TableCell className="table-cell">
                            {item.priceFormatted || "-"}
                        </TableCell>
                        <TableCell className={cn("table-cell", getChangeColorClass(item.changePercent))}>
                            {item.symbol}
                        </TableCell>
                        <TableCell className="table-cell">
                            {item.marketCap || "-"}
                        </TableCell>
                        <TableCell className="table-cell">
                            {item.peRatio || "-"}
                        </TableCell>
                        <TableCell className="table-cell">
                            <Button className="add-alert">Add Alert</Button>
                        </TableCell>
                        <TableCell className="table-cell">
                            <WatchListButton symbol={item.symbol} company={item.company} isInWatchlist={true}
                                             showTrashIcon={true}
                                             type="icon"/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default WatchlistTable
