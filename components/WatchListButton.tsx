"use client";
import React, {useMemo, useState} from "react";
import {addToWatchlist, removeFromWatchlist} from "@/lib/actions/watchList.actions";
import {toast} from "sonner";
import {useDebounce} from "@/hooks/useDebounce";
import {Star, Trash2} from "lucide-react";

const WatchlistButton = ({
                             symbol,
                             company,
                             isInWatchlist,
                             showTrashIcon = false,
                             type = "button",
                             onWatchlistChange,
                         }: WatchlistButtonProps) => {
    const [added, setAdded] = useState<boolean>(!!isInWatchlist);

    const label = useMemo(() => {
        if (type === "icon") return added ? "" : "";
        return added ? "Remove from Watchlist" : "Add to Watchlist";
    }, [added, type]);

    const toggleWatchList = async () => {
        const result = added ? await removeFromWatchlist(symbol) : await addToWatchlist(symbol, company);

        if (result.success) {
            toast.success(result.message, {description: `${company} ${added ? "removed from" : "added to"} your watchlist`});
        }

        onWatchlistChange?.(symbol, !added);
    };

    const debouncedToggle = useDebounce(toggleWatchList, 300);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        setAdded(!added);
        debouncedToggle();
    };

    if (type === "icon") {
        return (
            <button
                title={added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
                aria-label={added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
                className={`watchlist-icon-btn ${added ? "watchlist-icon-added" : ""}`}
                onClick={handleClick}
            >
                <Star fill={added ? "currentColor" : "none"}/>
            </button>
        );
    }

    return (
        <button className={`watchlist-btn ${added ? "watchlist-remove" : ""}`} onClick={handleClick}>
            {showTrashIcon && added ? (
                <Trash2/>) : null}
            <span>{label}</span>
        </button>
    );
};

export default WatchlistButton;