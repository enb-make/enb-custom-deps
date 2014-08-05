enb-custom-deps [![Build Status](https://travis-ci.org/enb-make/enb-custom-deps.png?branch=master)](https://travis-ci.org/enb-make/enb-custom-deps)
==========

Предоставляет технологию `custom-deps`.

Собирает пользовательские зависимости по нужному ключу.

Например, файл зависимостей может выглядеть так:

```yaml
- custom: dep-name
```

А технология настроена так:

```javascript
nodeConfig.addTech(require('enb-custom-deps'), {key: 'custom', target: '?.custom.js'});
```

Тога файл `?.custom.js` будет собран со следующим содержимым:

```javascript
module.exports = ['custom'];
```
