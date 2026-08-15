/**
 * 出版社データへのアクセスヘルパー。
 * Astroページから利用する一覧向けに、出版社のID/名前を取得する。
 */
import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Database } from './db';
import type { Publisher } from '../types/game';

const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

type PublisherSelectionRow = {
    id: number;
    name: string;
};

function mapPublisher(row: PublisherSelectionRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/**
 * 出版社一覧を名前順で取得する。
 * @param db Drizzleのデータベースインスタンス
 * @returns 出版社のIDと名前の配列
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db.select(publisherSelection).from(publishers).orderBy(asc(publishers.name));
    return rows.map(mapPublisher);
}