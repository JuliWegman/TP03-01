 import "dotenv/config"

export const BDconfig={
    host:process.env.BD_HOST ?? '',
    port:process.env.BD_PORT ?? 5432,
    user:process.env.USER ?? '',
    password:process.env.PASSWORD ?? "",
    database:process.env.DATABASE ?? ''
}