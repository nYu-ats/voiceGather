FROM node:16
ARG USER_NAME
ARG APP_PATH
USER ${USER_NAME}
WORKDIR ${APP_PATH}
RUN chown ${USER_NAME}:${USER_NAME} ${APP_PATH}

SHELL ["/bin/bash", "-l", "-c"]

ENTRYPOINT ["/usr/src/voiceGather/frontend/entrypoint.sh"]