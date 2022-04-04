# Logbook 📘

## 4 april

### Goals

 - [x] Setup Firebase
 - [x] Auth
 - [x] Profile
 - [ ] Center
 - [ ] Match
 - [ ] Chat
 - [ ] Notification
 - [ ] Offer
 - [ ] Setup Google cloud

### commit

commit 6420babaa08b8d2a3509137c8eccf1d1cf5ad876
Merge: a399801 dc42ae3
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 11:04:57 2022

    Merge pull request #18 from EnzoBomark/feature/auth

    Implement auth feature

commit dc42ae38572118ca9306f98d6ce8befeada8d731
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 11:02:35 2022

    fix(throw-error): update replaceAll with replace

commit 57f96c9e46294812b43e1d7c56bb37d0f6b345e3
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 10:54:18 2022

    fix(*): check if firebase params are parsable

    firebase auth should be ignored if the params cant be parsed

commit a399801f23fb11ce8e6e239aea6636127f083089
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 09:34:37 2022

    fix(*): add new env: NODE_ENV: TEST to testing workflow

commit 33619ba73364eb0f97694fe93fa55ae69b6fe2e5
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 08:59:56 2022

    feat(*): add profile controller to create, read and update user

commit d4e056f4f86e4e9ac4b7e6bd5ee4fa409881e239
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 08:57:42 2022

    feat(*): add firebase auth connection

    This commit adds a decode token middleware to decode incoming request tokens, It is used for applying
    the right user id to the express request object with the uid key.

    BREAKING CHANGE: Requests now require a valid token

commit 2ac305cb8c998106de9c7a1a81c8ae2a649fc94e
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Mon Apr 4 07:59:01 2022

    feat(src/models/users - knex): init user model and user migration

## 31 mars

### Goals

  - [x] Init repo
  - [x] Setup docker
  - [x] Setup Prettier / Lint
  - [x] Setup Express app
  - [x] Setup Sentry
  - [x] Setup Workflows
  - [x] Setup Knex
  - [x] Setup Jest
  - [x] Setup Sequelize
  - [ ] Setup Firebase
  - [ ] Setup Google cloud

### commit

commit b0b65ffc38aa1739227f04a2cfa621ad0b199e7f
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:34:52 2022

    test: add global setup for knex in test folder

commit a9748531e9ee8a94c29dcd96f56e88bb4f7d2824
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:15:26 2022

    feat(src/router): create router and routing to countries and cities endpoints

commit 7014d9e2481fe6a752489dc32ddd47836f4769d2
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:14:31 2022

    feat: create crud controllers for countries and cities

commit 2388c88a503f3a7a3b2b61ae2041d595a63ecb3d
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:13:11 2022

    feat(src/middleware): add error handling

commit eef5c5920f7c06a8f23f61dafed357f977328f2d
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:11:50 2022

    feat(src/models): creates models for countries and cities

commit 974135df78fb74cea5576bb4515c00fbd4cc85bd
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:10:28 2022

    feat(src/utils): adds utility functions for commonly used snippets

commit f333c96af0956ad99709b693b0bf6ccbb681e8f5
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:07:06 2022

    feat(src/knex): create migrations for countries and cities tables

commit 9ef98128a76d066a4295dcd47795a4b58d431db4
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:05:17 2022

    build(src/types): improve express and sequelize types

    add better requeset and response for express and better associations for sequelize

commit 9ed72469e480cb5c98fe1d7bf928c2eb845185ac
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 22:02:30 2022

    test(tests): add locations crud tests

    The tests creates, reads, updates and destroys countries and cities

commit 71ad940726fdba7b3b24ba974442df7144830070
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 21:14:16 2022

    docs(log): update log

commit 7cd2bcd39bb9ba7e8212f236f7128a432cdf7fbe
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 21:13:34 2022

    test: run knex and sequelize before tests

commit 5c5f661a682a34d6a521d1374dccf4d31fbfe9e8
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 21:11:59 2022

    feat(knexfile): init knex for migrations

commit 37a3fbfe847c282e6e4c0a5b2e4c6b0d74eda537
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:53:13 2022

    fix(src/app): run sentry if dsn is provided

commit 1c70277cbd5f70dbf70babc6d70fe876fe3347d1
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:50:36 2022

    style(*): prettier write all files

commit 9c4ce45c6357fff975d373489c4da235534b6059
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:36:49 2022

    fix(.github): fix yarn run faulty script names

commit 9cb052e7bfff24431503e0633fe9054aa40a763c
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:31:36 2022

    test(tests): init basic api health test

commit b1c962d35574c0b6d6376cf3ea4e148a36992abd
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:30:45 2022

    build(*): add github workflows for linting / formatting and testing

commit 6523f789da8d942e12a3de60729a80c52e3f6603
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:28:30 2022

    feat(src): init basic express app and server with sequelize orm

    complete #4

commit 05e9ab1d07f2ee6d155d2ab84e2fc45f7fa4fb17
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 20:14:15 2022

    chore(*): init husky with conventional commits messages

    Provides cleaner commit messages for future me

commit 4822dd1a7e1a93b77e2c51baa862f7a2faa4fd40
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 19:50:02 2022

    feat: init repo

commit b6edc95b92fedbc55bfc3eb09e6e4100ad8b6064
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 19:38:12 2022

    doc: init readme

commit 788a5c814318358fba68ffaed9050bdf291e57b3
Author: Enzo Bomark <71819938+EnzoBomark@users.noreply.github.com>
Date: Thu Mar 31 18:20:37 2022

    Initial commit.
