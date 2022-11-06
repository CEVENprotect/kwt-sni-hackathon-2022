# CEVEN Biodiversity Map for KWT

## An SNI x KWT Hackathon Project

## Project Overview

| Project name        | CEVEN.life Biodiversity Map
| :------------------ | ------------------------------------------------------------ |
| Blog post          | [TBA]                  |
| Dissemination level | Public                                                       |
| Version             | 0.1                                                          |
| Software license    | MIT License                                                  |
| Status              | Work in progress                                              |

## Team 

- Yves
- Yannick

## Shoutouts and Credits

Thanks and shoutouts to:

- Sovereign Nature Initiative (https://sovereignnature.com/)

Credits: 

- https://ceven.tech/


------


# Setup for MacOS after cloning repo

Ensure you are using Python Python 3.8 (We recommend using pyenv to handle different Python versions.)

```shell
# installing
brew update
brew install pyenv

# setup shell environment (for zsh)
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

exec "$SHELL"

# install 3.8.x (I chose 3.8.14 - latest 3.8 (by october 2022))
pyenv install 3.8.14

# activate 3.8.14 specifically for this root folder (Electricitymaps-contrib)
pyenv local 3.8.14
exec "$SHELL"

# now 3.8.14 is displayed and used for pip install etc.
python -V #3.8.14
```

Ensure you have the dependency management tool Poetry installed by this guide. The easiest is to do pip install poetry


```shell
pip install poetry
```

Ensure you have the dependency tool tesseract installed, following the instructions in this guide.

```shell
tesseract --version
# tesseract 5.2.0
```

You should be able to run linter and tests
```shell
poetry run lint # check
poetry run test # check
poetry run check # run both linting and tests
```

Frontend:
```shell
npm install --global yarn #updated yarn

# go inside web folder
cd web

yarn install #worked

# go inside mockserver
cd ../mockserver
yarn install 
```

## Start the Map

go back to root

```shell
cd ..
```

go to web

```shell
cd web
```


```shell
yarn run develop
# new seperate terminal
yarn run mockserver # fails if no yarn install inside mockserver folder
```


