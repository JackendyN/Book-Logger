export interface Book {
    "book-name": string;
    "author-name": string;
    reading: boolean;
    cover?: string;
}

export interface BoughtBook extends Book {
    obtained: "bought";
    "date-bought": Date;
    "bought-from"?: string;
}

export interface BorrowedBook extends Book {
    obtained: "borrowed";
    "date-borrowed": Date;
    returned: boolean;
    "date-due"?: Date;
    "date-returned"?: Date;
    "borrowed-from"?: string;
}

export interface FutureBook {
    "book-name": string;
    "author-name": string;
    cover?: string;
    obtaining: "borrowing" | "owning";
    location?: string;
}

export type AnyBook = BoughtBook | BorrowedBook;