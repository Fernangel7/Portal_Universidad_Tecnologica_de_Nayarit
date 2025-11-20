const {
    PORT = '5000',
    loading_delay = '500',
    InscriptionProcess = 'false',
    website_name = 'Universidad Tecnologica de Nayarit',
    MONGODB_URI = '',
    MONGODB_DATABASE_NAME = '',
    BCRYPT_SALT_ROUNDS = '10',
    COOKIE_PARSER_SECRET_KEY = 'insecure_dev_cookie_secret',
    JWT_SECRET_KEY = 'insecure_dev_jwt_secret',
    HOME_FEATURED_CAREERS_MAX = '6'
} = process.env

module.exports = {
    PORT: Number(PORT) || 5000,
    loading_delay: Number(loading_delay) || 500,
    InscriptionProcess: InscriptionProcess === 'true' || InscriptionProcess === true,
    website_name,
    MONGODB_URI,
    MONGODB_DATABASE_NAME,
    BCRYPT_SALT_ROUNDS,
    COOKIE_PARSER_SECRET_KEY,
    JWT_SECRET_KEY,
    HOME_FEATURED_CAREERS_MAX: Number(HOME_FEATURED_CAREERS_MAX) || 6
}