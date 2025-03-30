
type Rating = {
    rate: number;
    count: number;
    
}
export type Product = {
    id: number;
    title: string;
    price: number;
    desciption: string;
    category: string;
    image: string;
    fileUrl?: string;
    rating: Rating;
}
