/**
 * カテゴリデータへのアクセスヘルパー。
 * Astroページから利用する一覧向けに、カテゴリのID/名前を取得する。
 */
import { asc } from 'drizzle-orm';
import { categories } from '../../db/schema';
import type { Database } from './db';
import type { Category } from '../types/game';

const categorySelection = {
    id: categories.id,
    name: categories.name,
};

type CategorySelectionRow = {
    id: number;
    name: string;
};

function mapCategory(row: CategorySelectionRow): Category {
    return {
        id: row.id,
        name: row.name,
    };
}

/**
 * カテゴリ一覧を名前順で取得する。
 * @param db Drizzleのデータベースインスタンス
 * @returns カテゴリのIDと名前の配列
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db.select(categorySelection).from(categories).orderBy(asc(categories.name));
    return rows.map(mapCategory);
}
