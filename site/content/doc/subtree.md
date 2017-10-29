---
title: "Subtree Setup to Theme"
linktitle: "Subtree"
description: ""
type: "doc"
author: "ADARTA Inc."
authorimage: "/assets/images/logo.png"
date: 2017-10-27T22:01:46-07:00
publishdate: 2017-10-27T22:01:46-07:00
lastmod: 2017-10-27T22:01:46-07:00
categories: [Setup] # [Setup, Configuration, Build, Enhance]
keywords: [Git] # [Hugo, Javascript, Netlify, Git]
doctypes: [] # [Information, Video, Mixed]
weight: 00
slug: ""
aliases: []
toc: false
draft: true
---
[Stackoverflow reference](https://stackoverflow.com/questions/24709704/apply-gradle-file-from-different-repository/24709789#24709789)

```bash
git remote add themerepo git@github.com:ADARTA/hugo-mdc-theme.git
git fetch themerepo
git checkout -b adarta-theme themerepo/adarta

git checkout master
git read-tree --prefix=site/themes/default/ -u adarta-theme
git commit -m "Add the theme subtree to our docs"
```

## To update the project repo with subtree changes:

```bash
git checkout adarta-theme
git pull
git checkout master
git merge --squash -s subtree --no-commit adarta-theme --allow-unrelated-histories
git commit -m "updating subtree hugo-mdc-theme (site/themes/default)"
```

## To update the subtree repo with change from the subtree folder of the project repo:

```bash
git checkout adarta-theme
git merge --squash -s subtree --no-commit master --allow-unrelated-histories
git commit -m "Explain the merge reason"

git push themerepo adarta
```

## The project should be ready to rock and roll just fine
`yarn`
`yarn start`
