'use server';

import {connectDB} from "@/database/mongoose";
import {Watchlist} from "@/database/models/watchList.model";
import {headers} from "next/headers";
import {auth} from "@/lib/better-auth/auth";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {getStocksDetails} from "@/lib/actions/finnhub.actions";

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    if (!email) return [];

    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');

        // Better Auth stores users in the "user" collection
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({email});

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];

        const items = await Watchlist.find({userId}, {symbol: 1}).lean();
        return items.map((i) => String(i.symbol));
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}

export async function addToWatchlist(symbol: string, company: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) redirect("/sign-in");

    try {
        await connectDB();
        const existingItem = await Watchlist.findOne({
            userId: session.user.id,
            symbol: symbol?.toUpperCase(),
        });

        if (existingItem) return {success: false, message: "Stock already in Watchlist"};

        const newItem = await Watchlist.create({
            userId: session.user.id,
            symbol: symbol?.toUpperCase(),
            company: company.trim(),
        });

        revalidatePath("/watchlist");

        return {success: true, message: "Stock added to Watchlist"};

    } catch (e) {
        console.error(e instanceof Error ? e.message : "Something went wrong");
        throw new Error("Failed to add stock to watchlist");
    }
}

export async function removeFromWatchlist(symbol: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) redirect("/sign-in");

    try {
        await connectDB();
        await Watchlist.deleteOne({
            userId: session.user.id,
            symbol: symbol?.toUpperCase(),
        });

        revalidatePath("/watchlist");

        return {success: true, message: "Stock removed from Watchlist"};

    } catch (e) {
        console.error(e instanceof Error ? e.message : "Something went wrong");
        throw new Error("Failed to remove stock from watchlist");
    }
}

export async function getUserWatchlist() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) redirect('/sign-in');

    try {
        await connectDB();
        const watchList = await Watchlist.find({userId: session.user.id}).sort({addedAt: 1}).lean();

        return JSON.parse(JSON.stringify(watchList));
    } catch (e) {
        console.error('Error fetching watchlist:', e);
        throw new Error('Failed to fetch watchlist');
    }
}

export async function getWatchlistWithData() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) redirect('/sign-in');

    try {
        await connectDB();
        const watchList = await Watchlist.find({userId: session.user.id}).sort({addedAt: 1}).lean();

        if (watchList.length === 0) return [];

        const stocksWithData = await Promise.all(
            watchList.map(async (item) => {
                const stockData = await getStocksDetails(item.symbol);
                if (!stockData) {
                    console.warn(`Failed to fetch data for ${item.symbol}`);
                    return item;
                }

                return {
                    company: stockData.company,
                    symbol: stockData.symbol,
                    currentPrice: stockData.currentPrice,
                    priceFormatted: stockData.priceFormatted,
                    changeFormatted: stockData.changeFormatted,
                    changePercent: stockData.changePercent,
                    marketCap: stockData.marketCapFormatted,
                    peRatio: stockData.peRatio,
                }
            })
        );

        return JSON.parse(JSON.stringify(stocksWithData));

    } catch (e) {
        console.error('Error loading watchlist:', e);
        throw new Error('Failed to fetch watchlist');
    }
}