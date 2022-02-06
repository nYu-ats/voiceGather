FROM ubuntu:20.04
ARG USER_NAME
ARG APP_PATH
USER ${USER_NAME}
WORKDIR ${APP_PATH}
RUN chown ${USER_NAME}:${USER_NAME} ${APP_PATH}

SHELL ["/bin/bash", "-l", "-c"]

# python環境構築用
RUN apt -y update && apt install -y wget vim git less \
curl make sudo locales build-essential checkinstall \
libffi-dev libssl-dev zlib1g-dev libbz2-dev libreadline-dev python3-pip \
&& localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

# 環境設定
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

# pipenv、pyenvで環境構築
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install pipenv
RUN git clone https://github.com/pyenv/pyenv.git ~/.pyenv
# pyenvセットアップ
RUN touch ~/.bash_profile
RUN echo -e "# pyenv paths" >> ~/.bash_profile
RUN echo "#!/bin/bash" >> ~/.bash_profile
RUN echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
RUN echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
RUN echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
RUN bash ~/.bash_profile
RUN pyenv -v
RUN pyenv install 3.8.2
RUN pyenv global 3.8.2
RUN mkdir -p /var/log/app/sharetech/

ENTRYPOINT ["/usr/src/voiceGather/backend/entrypoint.sh"]