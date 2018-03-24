# Сборщик верстки iBrush

В сборщике используются:

- [Gulp4](https://gulpjs.com/)
- [Twig](https://twig.symfony.com/)
- [SASS](http://sass-lang.com/)
- [ES6](https://tproger.ru/translations/wtf-is-ecmascript/)
- PNG спрайты

## Установка

Клонируем репозиторий, переходим в папку и вводим команду:

```sh
$ npm/yarn install
```

Менеджер пакетов Yarn можно скачать [отсюда](https://yarnpkg.com/en/docs/install). Чем отличаются yarn и npm можно узнать [здесь](http://prgssr.ru/development/yarn-ili-npm-vse-chto-vam-nuzhno-znat.html).
Затем запускаем сборку командой:

```sh
$ npm/yarn start (или просто gulp)
```

Запускается таск gulp'а по умолчанию dev.
Если все верно, откроется вкладка в браузере http://localhost:3000/index.html

Конфиг [BrowserSync](https://browsersync.io/docs/gulp) в сборке:

```
browserSync: {
    port: PORT || 3000,
    open: !!OPEN,
    notify: false,
    reloadOnRestart: true,
    server: {
        baseDir: build.dest,
        directory: true
    }
}
```

Для запуска на другом порте введите в консоли:

```sh
PORT=8080 yarn start
```

Для открытия вкладки в браузере:

```sh
OPEN=true yarn start
```

Запуск команды gulp с флагом --production или --prod выполняет таски для продакшена - минифицирует CSS и JS, оптимизирует изображения. Для отмены минификации следует запустить --production --nominify.
Команда gulp build единожды собирает исходники в конечную папку. gulp clean удаляет папку build.

Все таски находятся в директории gulp/tasks, конфиг - gulp/config.js. Список используемых gulp-плагинов можно увидеть в package.json.

Конфиг для autoprefixer'а указывается в package.json:

```
"browserslist": [
    "last 4 versions"
]
```

Ссылки для подробного ознакомления: https://www.npmjs.com/package/browserslist, http://browserl.ist/

## HTML

В качестве шаблонизатора используется Twig, страницы создаются в директории src. В templates лежат шаблоны twig, подключаемые на страницы.

## CSS

Структура scss файлов в сборке:

- _base.scss - дефолтные стили для страницы
- _fonts.scss - font-face'ы для шрифтов
- _mixins.scss - миксины
- _variables.scss - переменные
- _reset.scss - сброс стилей (подключен normalize.css)
- main.scss - файл, в который мы импортируем все остальное

Папки modules и blocks служат для написания ваших собственных стилей.

## JavaScript

Структура js файлов:

- vendor.js - подключение сторонних скриптов
- main.js - пользовательские скрипты

Для подключения js скриптов используется [gulp-include](https://www.npmjs.com/package/gulp-include) (т.к. в сборщике нет Webpack'а, скрипты не собираются в один бандл, для этого как раз и нужен gulp-include).
Крайне рекомендуется использовать npm/yarn для добавления сторонних скриптов в проект. Подключение в vendor.js осуществляется таким образом:

```
//=require jquery/dist/jquery.min.js (пример подключения из node_modules)
```

Примеры подключения есть в стартовой сборке, файлы main.js и vendor.js удалять не следует.
В скриптах допускается использовать ES6 синтаксис, Babel все обработает, на выходе получите ES5 версию.

## Спрайты

PNG-спрайт также собирается автоматически, для этого нужно положить картинку в src/assets/png_icons и прописать стили:

```sass
.icon-email {
    @include sprite($icon-email);
}
```

SVG иконки собираются в один файл и подключаются инлайново в базовом шаблоне twig. Иконки нужно ложить в src/assets/svg_icons.
Для кроссбраузерности установлена библиотека svg4everybody.