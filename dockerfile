# FROM node
FROM node:20.9.0-alpine3.18

WORKDIR /backend

# Copy all local files to image.
COPY . .

# When build image:
RUN npm install

# When run container:
# CMD npm start
CMD ["npm", "start"]
# Optional:
EXPOSE 8000

# --------------------------------
# $ cd /backend
# $ docker build -t backend .
# $ docker run -p 8000:8000 --name backend backend
# $ docker run -d -p 8000:8000 --name backend backend # daemon
# Browser: http://localhost:8000