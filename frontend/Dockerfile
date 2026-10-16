# syntax=docker/dockerfile:1
# Build from the frontend/ root.
#   Local (compose) — compile from source:
#     docker build -t configuration-panel-frontend frontend/
#   CI/release — reuse the build-once output (build/ already produced):
#     docker build --build-arg BUILD_MODE=ci -t configuration-panel-frontend frontend/
# BuildKit (default since Docker 23.0) skips the unused build stage entirely.
ARG BUILD_MODE=local

# --- local: compile from source ---
FROM --platform=$BUILDPLATFORM node:24-alpine AS build-local
WORKDIR /workspace
COPY . .
ENV CI=true
RUN npm i -g pnpm@11 && pnpm i --frozen-lockfile && pnpm build

# --- ci: reuse the pre-built output from the context (build-once); no compile ---
FROM alpine AS build-ci
WORKDIR /workspace
COPY build ./build

# --- select the build source via BUILD_MODE; BuildKit prunes the other stage ---
FROM build-${BUILD_MODE} AS build

FROM nginxinc/nginx-unprivileged:stable-alpine AS image

# Remove the default config; conf/nginx.conf listens on 8080 itself
RUN rm /etc/nginx/conf.d/default.conf

# Static files (built app), owned by nginx user 101 so the entrypoint can rewrite config.js
COPY --chown=101:101 --from=build /workspace/build /usr/share/nginx/html

# nginx config template + entrypoint (static source, mode-independent — copied from context)
COPY --chown=101:101 conf/nginx.conf /etc/nginx/templates/nginx.conf.template
COPY --chown=101:101 --chmod=+x 40-envsubst-config.sh /docker-entrypoint.d/40-envsubst-config.sh

# nginx-unprivileged already defaults to this user; pinned explicitly so the
# non-root requirement is self-documenting and can't silently regress.
USER 101

EXPOSE 8080

LABEL org.opencontainers.image.description="NL Portal Configuration Panel Frontend."

CMD ["nginx", "-g", "daemon off;"]
