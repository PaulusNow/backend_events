# Menggunakan image Node.js versi LTS
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Buat folder kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi aplikasi
RUN npm ci --only=production

# Salin semua file kode aplikasi ke dalam folder kerja
COPY . .

# Ekspos port aplikasi
EXPOSE 5000

# Jalankan aplikasi
CMD ["node", "app.js"]
