# --- BUILD STAGE ---
# Menggunakan Node 20-alpine untuk kompatibilitas yang lebih baik dan stabilitas jaringan
FROM node:20-alpine AS build 

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

# Membangun aplikasi React
RUN npm run build

# --- PRODUCTION STAGE ---
FROM nginx:alpine AS stage-1

# Menyalin konfigurasi Nginx kustom (jika ada)
# COPY nginx/nginx.conf /etc/nginx/nginx.conf 

# Menyalin output build dari stage 'build' ke direktori default Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mengungkap port 80 (default Nginx)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
