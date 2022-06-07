# base image
FROM node:16-alpine

# RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make

# RUN wget http://download.redis.io/redis-stable.tar.gz && \
#     tar xvzf redis-stable.tar.gz && \
#     cd redis-stable && \
#     make && \
#     mv src/redis-server /usr/bin/ && \
#     cd .. && \
#     rm -r redis-stable && \
#     npm install -g concurrently   

# EXPOSE 6379


# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY . .

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN yarn

# Copy local code to the container image.

RUN yarn workspace nosearch-nextjs build
#RUN yarn storybook:export
# Run the web service on container startup.
CMD [ "yarn","workspace", "nosearch-nextjs", "start" ]

# EXPOSE 3000

# EXPOSE 6379

# CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; yarn start"