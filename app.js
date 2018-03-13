//Подчключаем необходимые компоненты: фреймворк express
var express = require('express'),
    //Компонент парсера HTML и JSON для него, 
    // подробнее: в туториале на сайте expressjs.com
    bodyParser = require('body-parser'),
    //Получаем объкт модуля mysql
    mysql = require('mysql'),
    //Шаблонизатор Twig
    swig = require('twig'),
    //Cобственно класс приложения
    app = express();

//Из папки public будем отдавать статику: стили и скрипты для фронтенда
app.use(express.static(__dirname + '/public'));

//Создаем соединение с нашей базой данных
var connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mubd'
});

//Главная программа
connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')

    //Указываем каталог с представлениями
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/view');

    //Используем body-parser для обработки запросов
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //Теперь создаем маршруты
    //Вывод разные карточки на главной странице
    app.get('/', function (req, res) {
        connection.query('SELECT * FROM rastenie', function (err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                    if (err) throw err
                    res.render('index.twig', {
                        // устанавливаем в представлении необходимые переменные
                        rastenie: rastenie,
                        typerastenie: typerastenie,
                        sortrastenie: sortrastenie
                    });
                })
            })
        })
    });

    //Вывод списка растений
    app.get('/rasteniespisok/', function (req, res) {
        connection.query('SELECT * FROM rastenie', function (err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                    if (err) throw err
                    res.render('rasteniespisok.twig', {
                        // устанавливаем в представлении необходимые переменные
                        rastenie: rastenie,
                        typerastenie: typerastenie,
                        sortrastenie: sortrastenie
                    });
                })
            })
        })
    });

    //Страница просмотра конкретного растения
    app.get('/rasteniespisok/:id_Rastenie', function (req, res) {
        connection.query('SELECT * FROM rastenie where id_Rastenie = ?', [req.params.id_Rastenie], function (err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                    if (err) throw err
                    res.render('rastenie.twig', {
                        // устанавливаем в представлении необходимые переменные
                        rastenie: rastenie[0],
                        typerastenie: typerastenie,
                        sortrastenie: sortrastenie
                    });

                })
            });
        })
    });
/*
    //Вывод списка конкретного растения
    app.get('/resursspisok/:id_Rastenie', function (req, res) {
        connection.query('SELECT * FROM typerastenie where id_TypeRastenie = ?', [req.params.id_TypeRastenie], function (err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM rastenie', function (err, rastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                    if (err) throw err
                    res.render('rasteniespisok.twig', {
                        // устанавливаем в представлении необходимые переменные
                        typerastenie: typerastenie[0],
                        rastenie: rastenie,
                        sortrastenie: sortrastenie
                    });
                })
            })
        })
    });
*/
    //Страница редактирования конкретного растения (передача данных для редактирования)
    app.get('/rasteniespisok/:id_Rastenie/edit', function (req, res) {
        connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                if (err) throw err
                connection.query('SELECT * FROM rastenie WHERE id_Rastenie = ?', [req.params.id_Rastenie], function (err, rastenie) {
                    if (err) throw err

                    res.render('edit_rastenie.twig', {
                        // устанавливаем в представлении необходимые переменные
                        typerastenie: typerastenie,
                        sortrastenie: sortrastenie,
                        rastenie: rastenie[0]
                    });
                })
            })
        })
    });

    //Собственно редактирование конкретного растения
    app.post('/rasteniespisokk/:id_Rastenie', function (req, res) {
        var post = ({
            id_SortRastenie: req.body.id_SortRastenie,
            PhotoRastenie: req.body.PhotoRastenie,
            DateVisadkaRastenie: req.body.DateVisadkaRastenie,
            ColorRastenie: req.body.ColorRastenie,
            KolvoRastenie: req.body.KolvoRastenie,
            EffectiveProcentRastenie: req.body.EffectiveProcentRastenie,
            CommentRastenie: req.body.CommentRastenie,
            CenaRastenie: req.body.CenaRastenie
        });

        //Обновили значения
        connection.query('UPDATE rastenie SET ? WHERE id_Rastenie = ?', [post, req.params.id_Rastenie], function (err, result) {

            //Открываем главную страницу после добавления
            res.redirect('/rasteniespisok/');
        });
    });

    //Удаление конкретного растения
    app.post('/rasteniespisok/:id_Rastenie', function (req, res) {
        connection.query('DELETE FROM rastenie WHERE id_Rastenie = ?', req.params.id_Rastenie, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('/rasteniespisok/');
        });
    });

    //Добавление нового растения - подготовка страницы добавления
    app.get('/rasteniespisokk/', function (req, res) {
        connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                if (err) throw err
                res.render('add_rastenie.twig', {
                    // устанавливаем в представлении необходимые переменные
                    typerastenie: typerastenie,
                    sortrastenie: sortrastenie
                });
            })
        })
    });

    //Добавление нового растения
    app.post('/rasteniespisok/', function (req, res) {
        //Cчитали значения, записали в пост
        var post = ({
            id_SortRastenie: req.body.id_SortRastenie,
            PhotoRastenie: req.body.PhotoRastenie,
            DateVisadkaRastenie: req.body.DateVisadkaRastenie,
            ColorRastenie: req.body.ColorRastenie,
            KolvoRastenie: req.body.KolvoRastenie,
            EffectiveProcentRastenie: req.body.EffectiveProcentRastenie,
            CommentRastenie: req.body.CommentRastenie,
            CenaRastenie: req.body.CenaRastenie
        });

        //Вставка поста
        connection.query('INSERT INTO rastenie SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/rasteniespisok/');
        });
    });

    //РЕСУРЫ
    //Вывод списка всех ресурсов
    app.get('/resursspisok/', function (req, res) {
        connection.query('SELECT * FROM resurs', function (err, resurs) {

            if (err) throw err
            connection.query('SELECT * FROM prihodresurs', function (err, prihodresurs) {

                if (err) throw err
                connection.query('SELECT * FROM rashodresurs', function (err, rashodresurs) {

                    if (err) throw err
                    res.render('resursspisok.twig', {
                        // устанавливаем в представлении необходимые переменные
                        resurs: resurs,
                        prihodresurs: prihodresurs,
                        rashodresurs: rashodresurs
                    });
                })
            })
        })
    });

    //Вывод списка конкретного ресурса
    app.get('/resursspisok/:id_Resurs', function (req, res) {
        connection.query('SELECT * FROM resurs where id_Resurs = ?', [req.params.id_Resurs], function (err, resurs) {

            if (err) throw err
            connection.query('SELECT * FROM prihodresurs', function (err, prihodresurs) {

                if (err) throw err
                connection.query('SELECT * FROM rashodresurs', function (err, rashodresurs) {

                    if (err) throw err
                    res.render('resurs.twig', {
                        // устанавливаем в представлении необходимые переменные
                        resurs: resurs[0],
                        prihodresurs: prihodresurs,
                        rashodresurs: rashodresurs
                    });
                })
            })
        })
    });

    //Удаление конкретного ресурса (расход)
    app.post('/resursspisok/:id_RashodResurs', function (req, res) {
        connection.query('DELETE FROM rashodresurs WHERE id_RashodResurs = ?', req.params.id_RashodResurs, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Удаление конкретного ресурса (приход)
    app.post('/resursspisokk/:id_PrihodResurs', function (req, res) {
        connection.query('DELETE FROM prihodresurs WHERE id_PrihodResurs = ?', req.params.id_PrihodResurs, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Добавление нового ресурса (расход)
    app.post('/resursspisok/', function (req, res) {
        //Cчитали значения, записали в пост
        var post = ({
            id_RashodResurs: req.body.id_RashodResurs,
            id_Resurs: req.body.id_Resurs,
            KolvoResurs: req.body.KolvoResurs,
            DateIzyatResurs: req.body.DateIzyatResurs
        });

        //Вставка поста
        connection.query('INSERT INTO rashodresurs SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });

    //Добавление нового ресурса (приход)
    app.post('/resursspisokk/', function (req, res) {
        //Cчитали значения, записали в пост


        var post = ({
            id_PrihodResurs: req.body.id_PrihodResurs,
            id_Resurs: req.body.id_Resurs,
            CenaResurs: req.body.CenaResurs,
            KolvoResurs: req.body.KolvoResurs,
            DatePopolnResurs: req.body.DatePopolnResurs
        });

        //Вставка поста
        connection.query('INSERT INTO prihodresurs SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });

    //Страница редактирования конкретного ресурса (расход) (передача данных для редактирования)
    app.get('/resursspisok/:id_RashodResurs/edit', function (req, res) {
        if (err) throw err
        connection.query('SELECT * FROM rashodresurs WHERE id_RashodResurs = ?', [req.params.id_RashodResurs], function (err, rashodresurs) {

            if (err) throw err
            connection.query('SELECT * FROM resurs', function (err, resurs) {

                res.render('edit_rashod.twig', {
                    // устанавливаем в представлении необходимые переменные
                    rashodresurs: rashodresurs[0],
                    resurs: resurs
                });
            })

        })
    });

    //Редактирование ресурса (расход)
    app.post('/resursspisook/:id_RashodResurs', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_Resurs: req.body.id_Resurs,
            KolvoResurs: req.body.KolvoResurs,
            DateIzyatResurs: req.body.DateIzyatResurs
        });

        //Вставка поста
        connection.query('UPDATE rashodresurs SET ? WHERE id_RashodResurs = ?', [post, req.params.id_RashodResurs], function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/resursspisok/');
        });
    });

    //Страница редактирования конкретного ресурса (приход) (передача данных для редактирования)
    app.get('/resursspisokk/:id_PrihodResurs/edit', function (req, res) {
        if (err) throw err
        connection.query('SELECT * FROM prihodresurs WHERE id_PrihodResurs = ?', [req.params.id_PrihodResurs], function (err, prihodresurs) {

            if (err) throw err
            connection.query('SELECT * FROM resurs', function (err, resurs) {

                res.render('edit_prihod.twig', {
                    // устанавливаем в представлении необходимые переменные
                    prihodresurs: prihodresurs[0],
                    resurs: resurs
                });
            })

        })
    });

    //Редактирование ресурса (приход)
    app.post('/resursspisookk/:id_PrihodResurs', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_Resurs: req.body.id_Resurs,
            CenaResurs: req.body.CenaResurs,
            KolvoResurs: req.body.KolvoResurs,
            DatePopolnResurs: req.body.DatePopolnResurs
        });

        //Вставка поста
        connection.query('UPDATE prihodresurs SET ? WHERE id_PrihodResurs = ?', [post, req.params.id_PrihodResurs], function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/resursspisok/');
        });
    });

    //Вешаем сервер на порт
    app.listen(8075);
    console.log('Express server listening on port 8075');
})